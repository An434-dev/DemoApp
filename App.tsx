/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import NetworkAlert from './src/components/NetworkAlert';
import ErrorBoundary from './src/components/ErrorBoundary';
import { useNetworkMonitor } from './src/hooks/useNetworkMonitor';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';

  // Initialize network monitoring
  useNetworkMonitor();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NetworkAlert />
      <AppNavigator />
    </View>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
