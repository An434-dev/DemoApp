import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Edit,
  Help,
  Card,
  Shield,
  Notification,
  Language,
} from '../assests/icons';

const ProfileScreen = ({ navigation }) => {
  const settingsOptions = [
    { id: 1, icon: 'Card', title: 'Your Card' },
    { id: 2, icon: 'Shield', title: 'Security' },
    { id: 3, icon: 'Notification', title: 'Notification' },
    { id: 4, icon: 'Language', title: 'Languages' },
  ];

  const handleLogout = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>Brooklyn Simmons</Text>
              <Text style={styles.profileEmail}>Brooklyn@testmail.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit width={20} height={20} fill="#171725" />
          </TouchableOpacity>
        </View>

        {/* Setting Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Setting</Text>

          {settingsOptions.map((option, index) => {
            const IconComponent =
              option.icon === 'Card'
                ? Card
                : option.icon === 'Shield'
                ? Shield
                : option.icon === 'Notification'
                ? Notification
                : Language;

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.menuItem,
                  index === settingsOptions.length - 1 && styles.menuItemLast,
                ]}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    <IconComponent width={20} height={20} fill="#171725" />
                  </View>
                  <Text style={styles.menuText}>{option.title}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Help and Support */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.iconContainer}>
              <Help width={20} height={20} fill="#171725" />
            </View>
            <Text style={styles.menuText}>Help and Support</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171725',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E8E',
    fontWeight: '400',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 17,
    color: '#9CA3A4B',
    marginBottom: 20,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#171725',
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 40,
    marginBottom: 40,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#F41F52',
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default ProfileScreen;
