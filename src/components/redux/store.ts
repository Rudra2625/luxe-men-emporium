
import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import authReducer from './authslice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';
=======
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
