import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, FetchProductsParams } from './productTypes';
import { productApi } from './productApi';

// Async thunks for product operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: FetchProductsParams) => {
    const response = await productApi.getProducts(params);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await productApi.getProductById(id);
    return response.data;
  }
);

export const addProductReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, review }: { productId: string; review: { rating: number; comment: string } }, { rejectWithValue }) => {
    try {
      return await productApi.addProductReview(productId, review);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: Omit<Product, '_id'>) => {
    const response = await productApi.createProduct(product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }: { id: string; product: Partial<Product> }) => {
    const response = await productApi.updateProduct(id, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await productApi.deleteProduct(id);
    return id;
  }
);
