<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchAllOrders, updateOrderStatus, deleteOrder } from '../redux/orderSlice';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusOptions = ['All', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export const AdminOrderManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error, pagination } = useAppSelector((state) => state.orders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllOrders({ page: currentPage, limit: ordersPerPage, status: statusFilter !== 'All' ? statusFilter : undefined }));
  }, [dispatch, currentPage, statusFilter]);

  const filteredOrders = orders.filter((order) => {
    if (!search) return true;
    return (
      order.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.fullname?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }));
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order Number or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/5"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{order.orderNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.user?.fullname || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[order.orderStatus] || ''}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">₹{order.total?.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.createdAt?.slice(0, 10)}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex flex-col md:flex-row gap-2">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border rounded px-2 py-1 text-xs"
                      >
                        {statusOptions.filter((s) => s !== 'All').map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
=======

import React, { useEffect, useState } from 'react';
import { Eye, Package } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import axios from 'axios';

interface Order {
  _id: string;
  orderNumber: string;
  user: { fullname: string; email: string };
  total: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:1000/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.put(
        `http://localhost:1000/api/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.map(order => 
        order._id === orderId 
          ? { ...order, orderStatus: newStatus }
          : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxe-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span className="text-sm text-gray-600">{orders.length} total orders</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                <TableCell>{order.user.fullname}</TableCell>
                <TableCell>₹{order.total.toLocaleString()}</TableCell>
                <TableCell>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details - #{selectedOrder.orderNumber}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <p>Name: {selectedOrder.user.fullname}</p>
                <p>Email: {selectedOrder.user.email}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}; 
=======
};

export default AdminOrderManagement;
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
