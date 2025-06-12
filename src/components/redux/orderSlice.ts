import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000/api';

// Types
interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
  } | null;
}

interface CreateOrderData {
  items: Array<{
    product: string;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

// Async thunks
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: CreateOrderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      const response = await axios.post(`${API_BASE_URL}/order`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (params: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      const response = await axios.get(`${API_BASE_URL}/order?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      const response = await axios.get(`${API_BASE_URL}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async ({ orderId, reason }: { orderId: string; reason: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      const response = await axios.put(
        `${API_BASE_URL}/order/${orderId}/cancel`,
        { cancellationReason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { orderId, message: response.data.message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
    }
  }
);

// Admin: Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (params: { page?: number; limit?: number; status?: string } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
      const response = await axios.get(`${API_BASE_URL}/order/all?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all orders');
    }
  }
);

// Admin: Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, orderStatus }: { orderId: string; orderStatus: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');
      const response = await axios.put(
        `${API_BASE_URL}/order/${orderId}/status`,
        { orderStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.order;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
    }
  }
);

// Admin: Delete order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');
      await axios.delete(`${API_BASE_URL}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete order');
    }
  }
);

// Initial state
const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  pagination: null,
};

// Orders slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    // Create order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Fetch user orders
    .addCase(fetchUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.pagination = action.payload.pagination;
      state.error = null;
    })
    .addCase(fetchUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Fetch order by ID
    .addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.error = null;
    })
    .addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Cancel order
    .addCase(cancelOrder.pending, (state) => {
      state.loading = true;
    })
    .addCase(cancelOrder.fulfilled, (state, action) => {
      state.loading = false;
      // Update order status in the list
      const orderIndex = state.orders.findIndex(order => order._id === action.payload.orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].orderStatus = 'cancelled';
      }
      if (state.currentOrder && state.currentOrder._id === action.payload.orderId) {
        state.currentOrder.orderStatus = 'cancelled';
      }
      state.error = null;
    })
    .addCase(cancelOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Fetch all orders
    .addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.pagination = action.payload.pagination;
      state.error = null;
    })
    .addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Update order status
    .addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      // Update order status in the list
      const orderIndex = state.orders.findIndex(order => order._id === action.payload._id);
      if (orderIndex !== -1) {
        state.orders[orderIndex].orderStatus = action.payload.orderStatus;
      }
      if (state.currentOrder && state.currentOrder._id === action.payload._id) {
        state.currentOrder.orderStatus = action.payload.orderStatus;
      }
      state.error = null;
    })
    .addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Delete order
    .addCase(deleteOrder.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      // Remove order from the list
      state.orders = state.orders.filter(order => order._id !== action.payload);
      if (state.currentOrder && state.currentOrder._id === action.payload) {
        state.currentOrder = null;
      }
      state.error = null;
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;