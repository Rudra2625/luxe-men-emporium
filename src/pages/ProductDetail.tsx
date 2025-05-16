
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(
    product?.colors ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: selectedColor
    }, quantity);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && (
                  <Badge className="bg-luxe-burgundy">New</Badge>
                )}
                {product.bestSeller && (
                  <Badge className="bg-luxe-gold text-luxe-navy">Best Seller</Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                  {product.category}
                </p>
                <h1 className="font-serif text-3xl font-bold text-luxe-navy mb-2">{product.name}</h1>
                <p className="text-2xl font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(product.price)}
                </p>

              </div>

              {/* Product Description */}
              <div className="mb-6">
                <h3 className="font-serif text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-semibold mb-2">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`p-4 border rounded-md ${selectedColor === color
                            ? 'border-luxe-gold bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="font-serif text-xl font-semibold mb-2">Quantity</h3>
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 p-2 border border-gray-300 rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-8 py-6 bg-luxe-navy text-white hover:bg-luxe-navy/90 transition-colors"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
