
import axios from 'axios';
import { FetchProductsParams } from '../types/productTypes';

const API_BASE_URL = 'http://localhost:1000/api';

export const productApi = {
  fetchProducts: async (params: FetchProductsParams = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await axios.get(`${API_BASE_URL}/products?${queryParams}`);
    return response.data;
  },

  fetchProductById: async (productId: string) => {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data.product;
  },

  addProductReview: async (productId: string, review: { rating: number; comment: string }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.post(
      `${API_BASE_URL}/products/${productId}/reviews`,
      review,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    return response.data;
  },

  createProduct: async (productData: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.post(
      `${API_BASE_URL}/products`,
      productData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    return response.data;
  },

  updateProduct: async (productId: string, productData: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.put(
      `${API_BASE_URL}/products/${productId}`,
      productData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    return response.data;
  },

  deleteProduct: async (productId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    await axios.delete(`${API_BASE_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
