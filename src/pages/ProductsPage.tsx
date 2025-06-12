import { useState, useEffect } from 'react';        
import { productAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '../data/products';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Backend Product type
interface BackendProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: Array<{ url: string }>;
    category: 'Belts' | 'Perfumes';
    stock: number;
}

// Category mapping
const categoryMapping = {
    'Belts': 'belt',
    'Perfumes': 'perfume'
} as const;

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<'all' | 'Belts' | 'Perfumes'>('all');
    const { toast } = useToast();

    useEffect(() => {
        fetchProducts();
    }, [activeCategory]);

    const fetchProducts = async () => {
        try {
            let data;
            if (activeCategory === 'all') {
                data = await productAPI.getAllProducts();
            } else {
                data = await productAPI.getProductsByCategory(activeCategory);
            }
            
            // Check if data and products array exist
            if (!data || !data.products || !Array.isArray(data.products)) {
                throw new Error('Invalid response format from server');
            }
            
            const convertedProducts = data.products.map(convertToFrontendProduct);
            setProducts(convertedProducts);
            setError(null);
        } catch (error: any) {
            console.error('Error fetching products:', error);
            setError(error.response?.data?.message || error.message || 'Failed to fetch products');
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch products. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const convertToFrontendProduct = (backendProduct: BackendProduct): Product => ({
        _id: backendProduct._id,
        name: backendProduct.name,
        price: backendProduct.price,
        images: backendProduct.images,
        category: backendProduct.category,
        description: backendProduct.description,
        stock: backendProduct.stock
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="container mx-auto px-4 py-8 flex-grow">
                    <div className="text-center">Loading products...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="container mx-auto px-4 py-8 flex-grow">
                    <div className="text-center text-red-600">
                        <p>{error}</p>
                        <Button 
                            onClick={fetchProducts}
                            className="mt-4"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
                    
                    <Tabs defaultValue={activeCategory} className="w-full mb-8">
                        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                            <TabsTrigger 
                                value="all"
                                onClick={() => setActiveCategory('all')}
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger 
                                value="Belts"
                                onClick={() => setActiveCategory('Belts')}
                            >
                                Belts
                            </TabsTrigger>
                            <TabsTrigger 
                                value="Perfumes"
                                onClick={() => setActiveCategory('Perfumes')}
                            >
                                Perfumes
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center text-gray-500 mt-8">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductsPage;
