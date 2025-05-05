
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import { X } from 'lucide-react';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);
  
  // Handle category change from URL parameter
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-luxe-navy text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl font-bold mb-2">Our Collection</h1>
            <p className="text-gray-300">Discover premium quality men's accessories</p>
          </div>
        </div>
        
        {/* Products section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filtering options */}
            <div className="mb-8">
              <h2 className="font-serif text-xl font-semibold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === null 
                      ? 'bg-luxe-navy text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                  onClick={() => handleCategoryChange(null)}
                >
                  All Products
                </button>
                {['perfume', 'wallet', 'belt', 'watch', 'glasses'].map((category) => (
                  <button 
                    key={category}
                    className={`px-4 py-2 rounded-full ${
                      selectedCategory === category 
                        ? 'bg-luxe-navy text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1) + 's'}
                  </button>
                ))}
              </div>
              
              {/* Active filters */}
              {selectedCategory && (
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
                  <div className="bg-luxe-navy text-white text-sm px-3 py-1 rounded-full flex items-center">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + 's'}
                    <button 
                      onClick={() => handleCategoryChange(null)}
                      className="ml-1 p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500">Try changing your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
