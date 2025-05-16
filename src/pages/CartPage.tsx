
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { X, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
const CartPage = () => {

  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  

   const handleCheckout = () => {
    toast.success("Order Placed Successfully", {
      description: "Thank you for your order! We'll email you the confirmation shortly.",
    });
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <h1 className="font-serif text-3xl font-bold mb-6">Your Cart is Empty</h1>
              <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold mb-8">Your Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200 last:border-b-0">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow sm:ml-6">
                        <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <span className="mr-2">Qty:</span>
                            <select
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="p-1 border border-gray-300 rounded w-16"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                       <button
                        onClick={() => {
                          clearCart();
                          toast(`${item.name} removed from cart.`);
                        }}
                        className="text-gray-500 hover:text-red-500 ml-4 focus:outline-none"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/products')}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>

                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-luxe-gold text-luxe-navy hover:bg-luxe-gold/90"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
