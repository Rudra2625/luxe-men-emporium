
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState } from '../types/productTypes';
import {
  fetchProducts,
  fetchProductById,
  addProductReview,
  createProduct,
  updateProduct,
  deleteProduct
} from '../thunks/productThunks';

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
    })

    // Create product
    .addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload.product);
      state.error = null;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // Update product
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(product => product._id === action.payload.product._id);
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
      state.error = null;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // Delete product
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(product => product._id !== action.payload);
      state.error = null;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setFilters, clearFilters, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
