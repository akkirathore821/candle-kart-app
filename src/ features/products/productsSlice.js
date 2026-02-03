import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import fallbackProducts from '../../sample_data/product_response.json'

const fallbackProducts = [];

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/public/product/');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return fallback products if API fails
      return rejectWithValue(fallbackProducts);
    }
  }
);

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     const API_BASE_URL = 'http://192.168.1.100:8080';

//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/public/product/`);
//       // Axios automatically throws for non-2xx status codes, but just in case:
//       if (!response.data) {
//         throw new Error('No data returned from API');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching products:', error.message || error);
//       // Return fallback products if API fails
//       return rejectWithValue(fallbackProducts);
//     }
//   }
// );

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: fallbackProducts,
    filteredItems: fallbackProducts,
    selectedCategory: 'All',
    searchQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'All') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (item) => item.category === action.payload
        );
      }
    },
    searchProducts: (state, action) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    },
    updateStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        product.stock -= quantity;
      }
      // Update filtered items as well
      const filteredProduct = state.filteredItems.find((item) => item.id === id);
      if (filteredProduct) {
        filteredProduct.stock -= quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // Use fallback products from payload
        state.items = action.payload || fallbackProducts;
        state.filteredItems = action.payload || fallbackProducts;
      });
  },
});

export const { filterByCategory, searchProducts, updateStock } = productsSlice.actions;
export default productsSlice.reducer;