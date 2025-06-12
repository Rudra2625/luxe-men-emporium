import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

export const AdminStats: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);

  const totalProducts = products.length;
  const outOfStock = products.filter(p => !p.inStock).length;
  const featuredProducts = products.filter(p => p.featured).length;
  const averagePrice = products.reduce((acc, p) => acc + p.price, 0) / totalProducts || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
        <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Out of Stock</h3>
        <p className="text-3xl font-bold text-red-600">{outOfStock}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Featured Products</h3>
        <p className="text-3xl font-bold text-green-600">{featuredProducts}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Average Price</h3>
        <p className="text-3xl font-bold text-purple-600">
          ${averagePrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
