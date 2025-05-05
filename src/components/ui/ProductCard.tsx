
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.colors ? product.colors[0] : undefined
    });
  };
  
  return (
    <div className="product-card bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative">
        {/* Product image */}
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.new && (
            <Badge className="bg-luxe-burgundy">New</Badge>
          )}
          {product.bestSeller && (
            <Badge className="bg-luxe-gold text-luxe-navy">Best Seller</Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Product category */}
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
          {product.category}
        </p>
        
        {/* Product name */}
        <Link 
          to={`/product/${product.id}`}
          className="block mb-2 hover:text-luxe-gold transition-colors"
        >
          <h3 className="font-serif text-lg font-medium">{product.name}</h3>
        </Link>
        
        {/* Price */}
        <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
        
        {/* Add to cart button */}
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-luxe-navy text-white hover:bg-luxe-navy/90 transition-colors"
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
