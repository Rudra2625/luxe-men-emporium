
// Product related type definitions
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: Array<{ url: string; alt: string }>;
  inStock: boolean;
  stockQuantity: number;
  specifications: {
    material?: string;
    weight?: string;
    dimensions?: string;
    gemstone?: string;
    purity?: string;
  };
  tags: string[];
  rating: {
    average: number;
    count: number;
  };
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  featured: boolean;
}

export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
}

export interface FetchProductsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}
