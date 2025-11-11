import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const NetworkAlert = () => {
  const { isConnected, isInternetReachable } = useSelector(
    (state: any) => state.network,
  );
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const previousConnectionState = useRef(true);

  const isOffline = !isConnected || !isInternetReachable;

  useEffect(() => {
    if (isOffline) {
      // Show alert when going offline
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
      previousConnectionState.current = false;
    } else if (!isOffline && !previousConnectionState.current) {
      // Show "back online" message briefly before hiding
      Animated.sequence([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.delay(2000),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      previousConnectionState.current = true;
    }
  }, [isOffline, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isOffline ? '#D32F2F' : '#388E3C',
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{isOffline ? '⚠️' : '✅'}</Text>
        <Text style={styles.text}>
          {isOffline ? 'No Internet Connection' : 'Back Online'}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NetworkAlert;
