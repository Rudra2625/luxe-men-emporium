import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { useCart } from '../context/CartContext';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: Array<{ url: string }>;
    category: string;
    stock: number;
    ratings: number;
    numOfReviews: number;
    reviews: Array<{
        user: string;
        name: string;
        rating: number;
        comment: string;
    }>;
}

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            if (!id) return;
            const data = await productAPI.getProduct(id);
            setProduct(data.product);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || 'Failed to fetch product details',
            });
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (value: number) => {
        if (product && value >= 1 && value <= product.stock) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url || '/placeholder.png',
                quantity,
                stock: product.stock,
            });
            toast({
                title: 'Success',
                description: 'Product added to cart',
            });
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="container mx-auto px-4 py-8 text-center">Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <img
                        src={product.images[0]?.url || '/placeholder.png'}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg"
                    />
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`${product.name} view ${index + 2}`}
                                className="w-full rounded-md cursor-pointer hover:opacity-75"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Stock Status</h3>
                        {product.stock > 0 ? (
                            <p className="text-green-600">In Stock ({product.stock} available)</p>
                        ) : (
                            <p className="text-red-600">Out of Stock</p>
                        )}
                    </div>

                    {product.stock > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <span className="text-xl font-semibold">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                className="w-full"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    )}

                    {/* Reviews Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold mb-4">Reviews ({product.numOfReviews})</h3>
                        <div className="space-y-4">
                            {product.reviews.map((review, index) => (
                                <Card key={index} className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">{review.name}</h4>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400">★</span>
                                            <span className="ml-1">{review.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
