import NetInfo from '@react-native-community/netinfo';

let networkListeners = [];

/**
 * Initialize network monitoring
 * @param {Function} callback - Called when network state changes
 * @returns {Function} Unsubscribe function
 */
export const initNetworkMonitor = callback => {
  const unsubscribe = NetInfo.addEventListener(state => {
    const networkState = {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? false,
      type: state.type,
    };
    callback(networkState);
  });

  return unsubscribe;
};

/**
 * Get current network state
 * @returns {Promise<Object>} Current network state
 */
export const getCurrentNetworkState = async () => {
  const state = await NetInfo.fetch();
  return {
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable ?? false,
    type: state.type,
  };
};

/**
 * Check if device is online
 * @returns {Promise<boolean>}
 */
export const isOnline = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected && state.isInternetReachable;
};

/**
 * Add a listener for network changes
 * @param {Function} listener
 */
export const addNetworkListener = listener => {
  networkListeners.push(listener);
};

/**
 * Remove a network listener
 * @param {Function} listener
 */
export const removeNetworkListener = listener => {
  networkListeners = networkListeners.filter(l => l !== listener);
};

/**
 * Notify all listeners of network change
 * @param {Object} state
 */
export const notifyListeners = state => {
  networkListeners.forEach(listener => listener(state));
};
