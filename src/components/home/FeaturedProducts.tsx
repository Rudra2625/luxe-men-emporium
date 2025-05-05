
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-luxe-navy">Featured Products</h2>
          <Link 
            to="/products" 
            className="flex items-center text-luxe-navy hover:text-luxe-gold transition-colors"
          >
            View All <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
