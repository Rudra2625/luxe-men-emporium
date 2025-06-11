
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../services/productApi';
import { FetchProductsParams } from '../types/productTypes';

// Async thunks for product operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: FetchProductsParams = {}, { rejectWithValue }) => {
    try {
      return await productApi.fetchProducts(params);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      return await productApi.fetchProductById(productId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
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
  async (productData: any, { rejectWithValue }) => {
    try {
      return await productApi.createProduct(productData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData }: { productId: string; productData: any }, { rejectWithValue }) => {
    try {
      return await productApi.updateProduct(productId, productData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      await productApi.deleteProduct(productId);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);
