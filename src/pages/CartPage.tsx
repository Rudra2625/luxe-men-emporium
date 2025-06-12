import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { X, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const calculateTax = (subtotal: number) => {
        return subtotal * 0.18; // 18% tax
    };

    const calculateShipping = (subtotal: number) => {
        return subtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
    };

    const subtotal = getCartTotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping(subtotal);
    const total = subtotal + tax + shipping;

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        const item = cart.find(i => i.id === itemId);
        if (item && newQuantity >= 1 && newQuantity <= item.stock) {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Your cart is empty',
            });
            return;
        }
        toast({
            title: 'Success',
            description: 'Order placed successfully',
        });
        clearCart();
        navigate('/checkout');
    };

    if (cart.length === 0) {
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
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <Card key={item.id} className="p-4">
                                    <div className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-primary font-bold">₹{item.price}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                variant="ghost"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                ✕
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax (18%)</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between font-bold">
                                            <span>Total</span>
                                            <span>₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full mt-6"
                                    onClick={handleCheckout}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
