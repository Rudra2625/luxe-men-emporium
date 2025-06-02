// components/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice'; // adjust the path if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
