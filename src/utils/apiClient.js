import axios from 'axios';
import { store } from '../redux/store';
import { addPendingRequest } from '../redux/networkSlice';

// API configuration
export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    // You can add auth tokens here
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      // Timeout error
      error.message = 'Request timeout. Please try again.';
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      // Network error
      error.message = 'Network error. Please check your connection.';

      // Store failed request for retry when network comes back
      const state = store.getState();
      if (!state.network.isConnected) {
        store.dispatch(
          addPendingRequest({
            id: Date.now().toString(),
            config: error.config,
            timestamp: new Date().toISOString(),
          }),
        );
      }
    } else if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      switch (status) {
        case 400:
          error.message = error.response.data?.message || 'Invalid request';
          break;
        case 401:
          error.message = 'Unauthorized. Please login again.';
          // You can trigger logout here
          break;
        case 403:
          error.message = 'Access forbidden';
          break;
        case 404:
          error.message = 'Resource not found';
          break;
        case 429:
          error.message = 'Too many requests. Please try again later.';
          break;
        case 500:
          error.message = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
        case 504:
          error.message = 'Service temporarily unavailable';
          break;
        default:
          error.message = error.response.data?.message || 'An error occurred';
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Retry a failed request
 * @param {Object} requestConfig - Axios request config
 * @returns {Promise}
 */
export const retryRequest = async requestConfig => {
  try {
    const response = await apiClient.request(requestConfig);
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
