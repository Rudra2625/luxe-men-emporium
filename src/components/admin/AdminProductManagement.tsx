<<<<<<< HEAD
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
=======

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/thunks/productThunks';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import ProductForm from './ProductForm';
import axios from 'axios';

const AdminProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

<<<<<<< HEAD
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
=======
  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.delete(`http://localhost:1000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(fetchProducts({}));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    dispatch(fetchProducts({}));
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
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={handleAdd}
          className="bg-luxe-gold text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img 
                    src={product.images[0]?.url || '/placeholder.svg'} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>₹{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default AdminProductManagement;
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
