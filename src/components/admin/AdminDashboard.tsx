import React from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchProducts } from '../redux/productThunks';
import { AdminOrderManagement } from './AdminOrderManagement';
import { AdminProductManagement } from "./AdminProductManagement";
import { AdminStats } from "./AdminStats";

export const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminStats />
      <div className="mt-8">
        <AdminProductManagement />
      </div>
      <div className="mt-8">
        <AdminOrderManagement />
      </div>
    </div>
  );
};