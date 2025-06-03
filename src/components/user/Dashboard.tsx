
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { RootState } from '../redux/store';
import { selectCurrentUser } from '../redux/authSelector';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders({ page: 1, limit: 10 }));
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-luxe-navy mb-4">Please log in to view your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-serif font-bold text-luxe-navy mb-4">
            Welcome back, {user.fullname}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-luxe-gold/10 p-4 rounded-lg">
              <h3 className="font-semibold text-luxe-navy">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="bg-luxe-gold/10 p-4 rounded-lg">
              <h3 className="font-semibold text-luxe-navy">Phone</h3>
              <p className="text-gray-600">{user.phonenumber}</p>
            </div>
            <div className="bg-luxe-gold/10 p-4 rounded-lg">
              <h3 className="font-semibold text-luxe-navy">Role</h3>
              <p className="text-gray-600 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-serif font-bold text-luxe-navy mb-4">Your Orders</h2>
          
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxe-gold"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 py-4">
              Error loading orders: {error}
            </div>
          )}

          {orders.length === 0 && !loading && !error && (
            <div className="text-center py-8">
              <p className="text-gray-600">No orders found</p>
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-luxe-navy">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-luxe-gold">
                        ₹{order.total.toLocaleString()}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.orderStatus === 'delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.items.length} item(s) • {order.paymentMethod}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
