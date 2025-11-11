import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hotel, Flight, Train, Ship, Bus, Star } from '../assests/icons';

const HomeScreen = ({ navigation }) => {
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

  const recommendations = [
    {
      id: 1,
      name: 'Rainforest Kuta',
      address: 'Jl. Sunset Road No. 101, Kuta, Bali, Indonesia',
      rating: 4,
      price: 50,
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    },
    {
      id: 2,
      name: 'Belhotel',
      address: 'Jl. Sunset Road No. 101, Kuta, Bali, Indonesia',
      rating: 4,
      price: 45,
      image:
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
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
      <Image source={{ uri: item.image }} style={styles.recommendationImage} />
      <View style={styles.recommendationInfo}>
        <Text style={styles.recommendationName}>{item.name}</Text>
        <Text style={styles.recommendationAddress}>{item.address}</Text>
        <View style={styles.recommendationFooter}>
          <View style={styles.starsContainer}>
            <Star
              width={14}
              height={14}
              fill="#FBBF24"
              style={styles.starIcon}
            />
            <Text style={styles.recommendationRating}>
              {item.rating}-star hotel
            </Text>
          </View>
        </View>
        <Text style={styles.recommendationPrice}>$ {item.price}/night</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <TouchableOpacity>
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
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainListContent}
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
});

export default HomeScreen;
