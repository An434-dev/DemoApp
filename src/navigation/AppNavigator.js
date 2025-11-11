import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

// Import screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import BookingsScreen from '../screens/BookingsScreen';
import OffersScreen from '../screens/OffersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Offer, Profile, Home, Bookings } from '../assests/icons';

// Import storage utilities
import { isUserLoggedIn, getUser } from '../utils/storage';
import { setUser } from '../redux/userSlice';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator for main app screens
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#1F2937',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Home
              width={20}
              height={20}
              fill={focused ? '#1F2937' : '#6B7280'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Bookings
              width={20}
              height={20}
              fill={focused ? '#1F2937' : '#6B7280'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Offer
              width={20}
              height={20}
              fill={focused ? '#1F2937' : '#6B7280'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Profile
              width={20}
              height={20}
              fill={focused ? '#1F2937' : '#6B7280'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator with all screens
const AppNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('SignIn');

  useEffect(() => {
    // Check if user is already logged in
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        if (loggedIn) {
          const userData = await getUser();
          if (userData) {
            dispatch(setUser(userData));
            setInitialRoute('MainApp');
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003B95" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#003B95',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabBarIcon: {
    marginBottom: 0,
  },
  icon: {
    fontSize: 24,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
});

export default AppNavigator;
