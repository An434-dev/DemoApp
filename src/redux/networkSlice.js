import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: true,
  isInternetReachable: true,
  type: null,
  pendingRequests: [], // Store requests that failed due to network issues
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkState: (state, action) => {
      state.isConnected = action.payload.isConnected;
      state.isInternetReachable = action.payload.isInternetReachable;
      state.type = action.payload.type;
    },
    addPendingRequest: (state, action) => {
      // Add a request to retry when network comes back
      state.pendingRequests.push(action.payload);
    },
    clearPendingRequests: state => {
      state.pendingRequests = [];
    },
    removePendingRequest: (state, action) => {
      state.pendingRequests = state.pendingRequests.filter(
        req => req.id !== action.payload,
      );
    },
  },
});

export const {
  setNetworkState,
  addPendingRequest,
  clearPendingRequests,
  removePendingRequest,
} = networkSlice.actions;

export default networkSlice.reducer;
