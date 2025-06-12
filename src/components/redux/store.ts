// components/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

// ✅ Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
