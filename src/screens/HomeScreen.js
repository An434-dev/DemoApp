import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Hotel, Flight, Train, Ship, Bus, Star } from '../assests/icons';
import ErrorDisplay from '../components/ErrorDisplay';
import {
  fetchProducts,
  resetProducts,
  setRefreshing,
} from '../redux/productSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error, hasMore, refreshing, offset } = useSelector(
    state => state.products,
  );
  const { user } = useSelector(state => state.user);
  const { isConnected, isInternetReachable } = useSelector(
    state => state.network,
  );

  const [loadingMore, setLoadingMore] = useState(false);

  const isOffline = !isConnected || !isInternetReachable;

  useEffect(() => {
    // Fetch initial products only if online
    if (!isOffline) {
      dispatch(fetchProducts({ offset: 0, limit: 10 }));
    }
  }, [dispatch, isOffline]);

  const handleRefresh = () => {
    if (isOffline) {
      return; // Don't try to refresh when offline
    }
    dispatch(setRefreshing(true));
    dispatch(resetProducts());
    dispatch(fetchProducts({ offset: 0, limit: 10 }));
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !loading && !isOffline) {
      setLoadingMore(true);
      dispatch(fetchProducts({ offset, limit: 10 })).finally(() => {
        setLoadingMore(false);
      });
    }
  };

  const transportOptions = [
    { id: 1, name: 'Hotels', icon: Hotel },
    { id: 2, name: 'Flights', icon: Flight },
    { id: 3, name: 'Trains', icon: Train },
    { id: 4, name: 'Ferry', icon: Ship },
    { id: 5, name: 'Bus', icon: Bus },
  ];

  const exploreDestinations = [
    {
      id: 1,
      name: 'Sailing Komodo',
      location: 'Labuan Bajo',
      rating: 4.8,
      price: '200',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
      id: 2,
      name: 'Labengki Sombori',
      location: 'Islands in Sulawesi',
      rating: 4.8,
      price: '250',
      image:
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
    },
    {
      id: 3,
      name: 'Mount Bromo',
      location: 'Volcano in East Java',
      rating: 4.9,
      price: '150',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400',
    },
  ];

  const renderTransportOption = ({ item }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity style={styles.transportOption}>
        <View style={styles.transportIconContainer}>
          <IconComponent width={20} height={20} />
        </View>
        <Text style={styles.transportText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderExploreCard = ({ item }) => (
    <TouchableOpacity style={styles.exploreCard}>
      <Image source={{ uri: item.image }} style={styles.exploreImage} />
      <View style={styles.exploreInfo}>
        <Text style={styles.exploreName}>{item.name}</Text>
        <Text style={styles.exploreLocation}>{item.location}</Text>
        <View style={styles.exploreFooter}>
          <View style={styles.ratingContainer}>
            <Star
              width={16}
              height={16}
              fill="#FBBF24"
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>Start from</Text>
          <Text style={styles.priceAmount}>$ {item.price}/pax</Text>
        </View>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.priceButtonText}>3D2N</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRecommendation = ({ item }) => (
    <TouchableOpacity style={styles.recommendationCard}>
      <Image
        source={{
          uri:
            item.images?.[0] || item.image || 'https://via.placeholder.com/120',
        }}
        style={styles.recommendationImage}
      />
      <View style={styles.recommendationInfo}>
        <Text style={styles.recommendationName} numberOfLines={1}>
          {item.title || item.name}
        </Text>
        <Text style={styles.recommendationAddress} numberOfLines={2}>
          {item.description ||
            item.category?.name ||
            'No description available'}
        </Text>
        <View style={styles.recommendationFooter}>
          <View style={styles.starsContainer}>
            <Star
              width={14}
              height={14}
              fill="#FBBF24"
              style={styles.starIcon}
            />
            <Text style={styles.recommendationRating}>
              {item.category?.name || 'Product'}
            </Text>
          </View>
        </View>
        <Text style={styles.recommendationPrice}>$ {item.price}/item</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#003B95" />
        <Text style={styles.footerText}>Loading more products...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#003B95" />
          <Text style={styles.emptyText}>Loading products...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <ErrorDisplay error={error} onRetry={handleRefresh} />
        </View>
      );
    }

    if (isOffline) {
      return (
        <View style={styles.emptyContainer}>
          <ErrorDisplay
            error="You're offline. Please check your internet connection."
            showRetry={false}
          />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            {user && (
              <Text style={styles.userName}>
                {user.fullName || user.firstName}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Where to go?"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Transport Options */}
      <View style={styles.whiteSection}>
        <FlatList
          horizontal
          data={transportOptions}
          renderItem={renderTransportOption}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.transportContainer}
          style={styles.transportScroll}
        />

        {/* Explore Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <FlatList
            horizontal
            data={exploreDestinations}
            renderItem={renderExploreCard}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.exploreScrollContent}
            style={styles.exploreScroll}
          />
        </View>

        {/* Recommendations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendation for you</Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      <FlatList
        data={products}
        renderItem={renderRecommendation}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainListContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#003B95']}
            tintColor="#003B95"
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mainListContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 5,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    marginHorizontal: 10,
    fontWeight: '400',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  whiteSection: {
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  transportScroll: {
    marginBottom: 10,
  },
  transportContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  transportOption: {
    alignItems: 'center',
    marginRight: 10,
  },
  transportIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  transportIcon: {
    fontSize: 24,
  },
  transportText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  exploreScroll: {
    paddingLeft: 20,
  },
  exploreScrollContent: {
    paddingRight: 20,
  },
  exploreCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exploreImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  exploreInfo: {
    padding: 12,
  },
  exploreName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  exploreLocation: {
    fontSize: 9,
    color: '#4D565E',
    marginBottom: 8,
  },
  exploreFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  priceTag: {
    marginBottom: 8,
  },
  priceText: {
    fontSize: 10,
    color: '#505969',
    fontWeight: '400',
  },
  priceAmount: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  priceButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  recommendationCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendationImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  recommendationInfo: {
    flex: 1,
    padding: 12,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  recommendationAddress: {
    fontSize: 9,
    color: '#4D565E',
    marginBottom: 8,
    lineHeight: 16,
  },
  recommendationFooter: {
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationRating: {
    fontSize: 12,
    color: '#4D565E',
    fontWeight: '400',
  },
  recommendationPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#003B95',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
