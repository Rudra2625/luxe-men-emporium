
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000/api';

// Types
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: Array<{ url: string; alt: string }>;
  inStock: boolean;
  stockQuantity: number;
  specifications: {
    material?: string;
    weight?: string;
    dimensions?: string;
    gemstone?: string;
    purity?: string;
  };
  tags: string[];
  rating: {
    average: number;
    count: number;
  };
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  featured: boolean;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
}

interface FetchProductsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: FetchProductsParams = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axios.get(`${API_BASE_URL}/products?${queryParams}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data.product;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const addProductReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, review }: { productId: string; review: { rating: number; comment: string } }, { rejectWithValue }) => {
    try {
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
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

// Initial state
const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  pagination: null,
  filters: {},
};

// Products slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Fetch product by ID
    .addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
      state.error = null;
    })
    .addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Add review
    .addCase(addProductReview.pending, (state) => {
      state.loading = true;
    })
    .addCase(addProductReview.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(addProductReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setFilters, clearFilters, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
