import axios from 'axios';
import { BackendProduct } from '../data/products';

const BASE_URL = 'http://localhost:1000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User related API calls
export const userAPI = {
  login: async (email: string, password: string) => {
    try {
      console.log('Making login request...');
      const response = await api.post('/user/login', { 
        email: email.trim(), 
        password: password 
      });
      
      console.log('Raw login response:', response);
      
      if (response.data && response.data.token) {
        console.log('Setting token in localStorage and headers');
        // Store both token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Set default auth header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } else {
        console.error('No token in response:', response.data);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error);
      throw error;
    }
  },
  signup: async (userData: { name: string; email: string; password: string; phonenumber: string }) => {
    try {
      const response = await api.post('/user/register', {
        ...userData,
        email: userData.email.trim(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post('/user/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Remove auth header
      delete api.defaults.headers.common['Authorization'];
      return response.data;
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error);
      throw error;
    }
  },
  getProfile: async () => {
    try {
      console.log('Getting user profile...');
      const token = localStorage.getItem('token');
      console.log('Current token:', token);
      
      // Use the correct endpoint from your backend
      const response = await api.get('/user/me');
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error.response?.data || error);
      throw error;
    }
  },
};

// Response types
type ProductResponse = {
  success: boolean;
  products: BackendProduct[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

type SingleProductResponse = {
  success: boolean;
  product: BackendProduct;
};

// Product related API calls
export const productAPI = {
  getAllProducts: async (): Promise<ProductResponse> => {
    try {
      console.log('Making request to /product endpoint');
      const response = await api.get<ProductResponse>('/product');
      console.log('Raw API response:', response);
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },
  
  getProduct: async (id: string): Promise<SingleProductResponse> => {
    try {
      const response = await api.get<SingleProductResponse>(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
  
  getProductsByCategory: async (category: 'Belts' | 'Perfumes'): Promise<ProductResponse> => {
    try {
      console.log('Making request to /product with category:', category);
      const response = await api.get<ProductResponse>(`/product?category=${category}`);
      console.log('Raw API response:', response);
      console.log('Response data:', response.data);
      if (!response.data || (!response.data.products && !Array.isArray(response.data))) {
        throw new Error('Invalid response format from server');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },
};

// Order related API calls
export const orderAPI = {
  createOrder: async (orderData: {
    shippingInfo: {
      address: string;
      city: string;
      phoneNo: string;
      postalCode: string;
      country: string;
    };
    orderItems: Array<{
      product: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }>;
    paymentInfo: {
      id: string;
      status: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }) => {
    const response = await api.post('/order', orderData);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await api.get('/order/me');
    return response.data;
  },
  getOrderDetails: async (id: string) => {
    const response = await api.get(`/order/${id}`);
    return response.data;
  },
};

// Add request interceptor to handle authentication
api.interceptors.request.use(
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

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Log detailed error information
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        config: {
          url: error.config.url,
          method: error.config.method,
          data: error.config.data,
        }
      });

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Clear both token and user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        // Only redirect to login if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api; 