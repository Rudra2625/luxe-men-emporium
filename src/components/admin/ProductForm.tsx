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
              onClick={onCancel}
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
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="specifications.weight">Weight</Label>
              <Input
                id="specifications.weight"
                name="specifications.weight"
                value={formData.specifications.weight}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="specifications.gemstone">Gemstone</Label>
              <Input
                id="specifications.gemstone"
                name="specifications.gemstone"
                value={formData.specifications.gemstone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="specifications.purity">Purity</Label>
              <Input
                id="specifications.purity"
                name="specifications.purity"
                value={formData.specifications.purity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2"
              />
              Featured Product
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="mr-2"
              />
              In Stock
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-luxe-gold text-white rounded-lg hover:bg-yellow-600"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
