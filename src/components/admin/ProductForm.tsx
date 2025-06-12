<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import axios from 'axios';
import { Product } from '../redux/productTypes';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, '_id'>) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Product, '_id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    subcategory: '',
    images: [],
    inStock: true,
    stockQuantity: 0,
    specifications: {},
    tags: [],
    rating: { average: 0, count: 0 },
    reviews: [],
    featured: false
  });

  useEffect(() => {
    if (product) {
      const { _id, ...productData } = product;
      setFormData(productData);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
=======

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import axios from 'axios';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    category: product?.category || 'rings',
    subcategory: product?.subcategory || '',
    stockQuantity: product?.stockQuantity || '',
    images: product?.images || [{ url: '', alt: '' }],
    specifications: {
      material: product?.specifications?.material || '',
      weight: product?.specifications?.weight || '',
      dimensions: product?.specifications?.dimensions || '',
      gemstone: product?.specifications?.gemstone || '',
      purity: product?.specifications?.purity || ''
    },
    featured: product?.featured || false,
    inStock: product?.inStock !== false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stockQuantity: Number(formData.stockQuantity)
      };

      if (product) {
        // Update existing product
        await axios.put(
          `http://localhost:1000/api/products/${product._id}`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new product
        await axios.post(
          'http://localhost:1000/api/products',
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [specField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
<<<<<<< HEAD
              onClick={onCancel}
=======
              onClick={onClose}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bracelets">Bracelets</option>
                <option value="watches">Watches</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
                required
              />
            </div>

            <div>
<<<<<<< HEAD
=======
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleInputChange}
              />
            </div>

            <div>
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
                required
              />
            </div>

            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
<<<<<<< HEAD
              onChange={handleChange}
=======
              onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              rows={4}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <Label>Product Image</Label>
            <div className="space-y-2">
              <Input
                placeholder="Image URL"
                value={formData.images[0]?.url || ''}
                onChange={(e) => handleImageChange(0, 'url', e.target.value)}
              />
              <Input
                placeholder="Image Alt Text"
                value={formData.images[0]?.alt || ''}
                onChange={(e) => handleImageChange(0, 'alt', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="specifications.material">Material</Label>
              <Input
                id="specifications.material"
                name="specifications.material"
                value={formData.specifications.material}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              />
            </div>

            <div>
              <Label htmlFor="specifications.weight">Weight</Label>
              <Input
                id="specifications.weight"
                name="specifications.weight"
                value={formData.specifications.weight}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              />
            </div>

            <div>
              <Label htmlFor="specifications.gemstone">Gemstone</Label>
              <Input
                id="specifications.gemstone"
                name="specifications.gemstone"
                value={formData.specifications.gemstone}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              />
            </div>

            <div>
              <Label htmlFor="specifications.purity">Purity</Label>
              <Input
                id="specifications.purity"
                name="specifications.purity"
                value={formData.specifications.purity}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
                className="mr-2"
              />
              Featured Product
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
<<<<<<< HEAD
                onChange={handleChange}
=======
                onChange={handleInputChange}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
                className="mr-2"
              />
              In Stock
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
<<<<<<< HEAD
              onClick={onCancel}
=======
              onClick={onClose}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
<<<<<<< HEAD
              className="px-4 py-2 bg-luxe-gold text-white rounded-lg hover:bg-yellow-600"
            >
              {product ? 'Update Product' : 'Create Product'}
=======
              disabled={loading}
              className="px-4 py-2 bg-luxe-gold text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

export default ProductForm;
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
