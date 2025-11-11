import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import networkReducer from './networkSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    network: networkReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
