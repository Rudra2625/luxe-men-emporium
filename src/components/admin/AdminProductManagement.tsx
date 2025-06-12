import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../redux/productThunks';
import { Product } from '../redux/productTypes';
import { ProductForm } from './ProductForm';

export const AdminProductManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleCreateProduct = async (productData: Omit<Product, '_id'>) => {
    await dispatch(createProduct(productData));
    setIsFormOpen(false);
    dispatch(fetchProducts({}));
  };

  const handleUpdateProduct = async (id: string, productData: Partial<Product>) => {
    await dispatch(updateProduct({ id, product: productData }));
    setSelectedProduct(null);
    dispatch(fetchProducts({}));
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id));
      dispatch(fetchProducts({}));
    }
  };

  // Ensure only one form (create or edit) is open at a time
  const openCreateForm = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setIsFormOpen(false);
    setSelectedProduct(product);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={openCreateForm}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>

      {isFormOpen && !selectedProduct && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={closeForm}
        />
      )}

      {selectedProduct && (
        <ProductForm
          product={selectedProduct}
          onSubmit={(data) => handleUpdateProduct(selectedProduct._id, data)}
          onCancel={closeForm}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => openEditForm(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
