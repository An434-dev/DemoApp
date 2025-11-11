import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkState, clearPendingRequests } from '../redux/networkSlice';
import { fetchProducts } from '../redux/productSlice';
import {
  initNetworkMonitor,
  getCurrentNetworkState,
} from '../utils/networkMonitor';
import { retryRequest } from '../utils/apiClient';

/**
 * Custom hook to monitor network state and retry failed requests
 */
export const useNetworkMonitor = () => {
  const dispatch = useDispatch();
  const { pendingRequests, isConnected, isInternetReachable } = useSelector(
    state => state.network,
  );

  const retryPendingRequests = useCallback(async () => {
    if (pendingRequests.length > 0) {
      console.log('Retrying pending requests:', pendingRequests.length);

      // Retry all pending requests
      for (const request of pendingRequests) {
        try {
          await retryRequest(request.config);
          console.log('Request retried successfully');
        } catch (error) {
          console.log('Retry failed:', error.message);
        }
      }

      // Clear pending requests after retry
      dispatch(clearPendingRequests());

      // Refresh products if there were pending requests
      dispatch(fetchProducts({ offset: 0 }));
    }
  }, [pendingRequests, dispatch]);

  useEffect(() => {
    // Get initial network state
    getCurrentNetworkState().then(state => {
      dispatch(setNetworkState(state));
    });

    // Set up network listener
    const unsubscribe = initNetworkMonitor(state => {
      const wasOffline = !isConnected || !isInternetReachable;
      const isNowOnline = state.isConnected && state.isInternetReachable;

      dispatch(setNetworkState(state));

      // If connection was restored, retry pending requests
      if (wasOffline && isNowOnline) {
        console.log('Network restored, retrying pending requests');
        setTimeout(() => {
          retryPendingRequests();
        }, 1000); // Small delay to ensure connection is stable
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, isConnected, isInternetReachable, retryPendingRequests]);

  return {
    isConnected,
    isInternetReachable,
    isOnline: isConnected && isInternetReachable,
  };
};
