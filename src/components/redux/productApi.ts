import axios from 'axios';
import { Product, FetchProductsParams } from "./productTypes";

// Ensure the base URL does not end with a slash
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:1000/api').replace(/\/$/, '');

// Create an axios instance that attaches the token if present
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );
  
export const productApi = {
  getProducts: async (params: FetchProductsParams) => {
    return axiosInstance.get('/product', { params });
  },

  getProductById: async (id: string) => {
    return axiosInstance.get(`/product/${id}`);
  },

  createProduct: async (product: Omit<Product, '_id'>) => {
    return axiosInstance.post('/product', product);
  },

  updateProduct: async (id: string, product: Partial<Product>) => {
    return axiosInstance.put(`/product/${id}`, product);
  },

  deleteProduct: async (id: string) => {
    return axiosInstance.delete(`/product/${id}`);
  },

  addProductReview: async (productId: string, review: { rating: number; comment: string }) => {
    return axiosInstance.post(`/product/${productId}/reviews`, review);
  }
};
