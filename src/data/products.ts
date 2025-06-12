// Backend product type (matches MongoDB schema)
export type BackendProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: Array<{
    public_id: string;
    url: string;
  }>;
  category: 'Belts' | 'Perfumes';
  stock: number;
  numOfReviews: number;
  reviews: Array<{
    user: string;
    name: string;
    rating: number;
    comment: string;
  }>;
  createdAt: string;
};

// Frontend product type (for display purposes)
export type Product = {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image?: string;
  images?: Array<{ url: string }>;
  category: 'Belts' | 'Perfumes';
  description: string;
  stock: number;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
};

// Sample products data (for static pages only)
export const products: Product[] = [
  {
    id: "perfume-1",
    name: "Royal Amber Oud",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    category: "Perfumes",
    description: "A majestic fragrance combining rich amber and exotic oud, creating an intense and long-lasting scent perfect for evening occasions.",
    stock: 10,
    featured: true,
    bestSeller: true
  },
  {
    id: "perfume-2",
    name: "Aqua Marine",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=800&auto=format&fit=crop",
    category: "Perfumes",
    description: "Fresh and invigorating fragrance with notes of citrus, marine accord, and woody base notes, ideal for daily wear.",
    stock: 15
  },
  {
    id: "perfume-3",
    name: "Patel's Neck Black",
    price: 150.00,
    image: "https://dms.mydukaan.io/original/jpeg/media/ab494b17-71f9-4b04-b4f1-207202e21422.jpg",
    category: "Perfumes",
    description: "A sophisticated blend of leather, tobacco, and vanilla, creating a timeless scent for the modern gentleman.",
    stock: 8,
    new: true
  },
  {
    id: "belt-1",
    name: "Classic Reversible Belt",
    price: 75.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8iTx9OPs9QSMgMOupZmF26c-rurCY-itenQ&s",
    category: "Belts",
    description: "A versatile reversible leather belt with a rotating buckle that offers two classic colors in one elegant accessory.",
    stock: 20,
    bestSeller: true
  },
  {
    id: "belt-2",
    name: "Designer Buckle Belt",
    price: 120.00,
    image: "https://img.joomcdn.net/a0cb209a506f2bbf40d41651c92779770bb5c479_original.jpeg",
    category: "Belts",
    description: "Premium leather belt featuring our signature designer buckle, handcrafted for exceptional style and durability.",
    stock: 15,
    featured: true
  }
];
