import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

// Async thunk to fetch products from API
export const getProducts = createAsyncThunk(
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


















// /**
//  * Fetch all products from the API
//  * @returns {Promise<Array>} Array of products
//  */
// export const getProducts = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products`);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

// /**
//  * Fetch a single product by ID
//  * @param {number} id - Product ID
//  * @returns {Promise<Object>} Product object
//  */
// export const getProductById = async (id) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Error fetching product ${id}:`, error);
//     throw error;
//   }
// };

// /**
//  * Update product stock
//  * @param {number} id - Product ID
//  * @param {number} quantity - Quantity to reduce
//  * @returns {Promise<Object>} Updated product
//  */
// export const updateProductStock = async (id, quantity) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ quantity }),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Error updating stock for product ${id}:`, error);
//     throw error;
//   }
// };

// /**
//  * Create a new order
//  * @param {Object} orderData - Order information
//  * @returns {Promise<Object>} Created order
//  */
// export const createOrder = async (orderData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/orders`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(orderData),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error;
//   }
// };

// /**
//  * User authentication
//  * @param {string} email - User email
//  * @param {string} password - User password
//  * @returns {Promise<Object>} User data and token
//  */
// export const loginUser = async (email, password) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error logging in:', error);
//     throw error;
//   }
// };

// /**
//  * User registration
//  * @param {Object} userData - User registration data
//  * @returns {Promise<Object>} Created user data
//  */
// export const registerUser = async (userData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/auth/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };