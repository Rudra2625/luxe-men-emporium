
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/thunks/productThunks';
import { Package, Plus, Edit, Trash2, Eye, Settings } from 'lucide-react';
import AdminOrderManagement from './AdminOrderManagement';
import AdminProductManagement from './AdminProductManagement';
import AdminStats from './AdminStats';

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminStats />;
      case 'orders':
        return <AdminOrderManagement />;
      case 'products':
        return <AdminProductManagement />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-luxe-navy">LUXEMEN Admin</h1>
          </div>
          <nav className="mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-luxe-gold bg-opacity-10 text-luxe-gold border-r-2 border-luxe-gold'
                    : 'text-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
