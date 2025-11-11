import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

// API configuration
const PRODUCTS_PER_PAGE = 10;

// Async thunk to fetch products with pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ offset = 0, limit = PRODUCTS_PER_PAGE }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/products', {
        params: { offset, limit },
      });
      return {
        products: response.data,
        offset,
        hasMore: response.data.length === limit,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  offset: 0,
  hasMore: true,
  refreshing: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: state => {
      state.products = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        // Only show loading for initial load, not for pagination
        if (action.meta.arg.offset === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;

        // If offset is 0, replace products (refresh scenario)
        if (action.payload.offset === 0) {
          state.products = action.payload.products;
        } else {
          // Append products for pagination
          state.products = [...state.products, ...action.payload.products];
        }

        state.offset = action.payload.offset + action.payload.products.length;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { resetProducts, setRefreshing } = productSlice.actions;
export default productSlice.reducer;
