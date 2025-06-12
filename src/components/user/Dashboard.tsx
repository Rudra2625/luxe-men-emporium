import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { RootState, AppDispatch } from '../redux/store';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxe-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading orders: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">Order #{order.orderNumber}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.orderStatus}
              </span>
            </div>
            <p className="text-gray-600">Total: ₹{order.total.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
