
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'perfume' | 'wallet' | 'belt' | 'watch' | 'glasses';
  description: string;
  colors?: string[];
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
};

export const products: Product[] = [
  {
    id: "perfume-1",
    name: "Royal Amber Oud",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    category: "perfume",
    description: "A majestic fragrance combining rich amber and exotic oud, creating an intense and long-lasting scent perfect for evening occasions.",
    colors: ["Amber", "Black"],
    featured: true,
    bestSeller: true
  },
  {
    id: "perfume-2",
    name: "Aqua Marine",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=800&auto=format&fit=crop",
    category: "perfume",
    description: "Fresh and invigorating fragrance with notes of citrus, marine accord, and woody base notes, ideal for daily wear.",
    colors: ["Blue", "Silver"]
  },
  {
    id: "perfume-3",
    name: "Gentleman's Reserve",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1619994103821-0d35a9d2a46b?q=80&w=800&auto=format&fit=crop",
    category: "perfume",
    description: "A sophisticated blend of leather, tobacco, and vanilla, creating a timeless scent for the modern gentleman.",
    colors: ["Brown", "Gold"],
    new: true
  },
  {
    id: "wallet-1",
    name: "Executive Leather Bifold",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    category: "wallet",
    description: "Handcrafted from premium full-grain leather, this bifold wallet features multiple card slots, a bill compartment, and RFID blocking technology.",
    colors: ["Black", "Brown", "Tan"],
    featured: true
  },
  {
    id: "wallet-2",
    name: "Carbon Fiber Minimalist",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1581516302996-87cf02a86322?q=80&w=800&auto=format&fit=crop",
    category: "wallet",
    description: "Sleek and modern carbon fiber wallet with a slim profile, perfect for the minimalist who appreciates cutting-edge design and functionality.",
    colors: ["Carbon", "Silver"],
    new: true
  },
  {
    id: "belt-1",
    name: "Classic Reversible Belt",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1605348863400-c21ea557333e?q=80&w=800&auto=format&fit=crop",
    category: "belt",
    description: "A versatile reversible leather belt with a rotating buckle that offers two classic colors in one elegant accessory.",
    colors: ["Black/Brown", "Navy/Tan"],
    bestSeller: true
  },
  {
    id: "belt-2",
    name: "Designer Buckle Belt",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1619624653777-483d1a917b75?q=80&w=800&auto=format&fit=crop",
    category: "belt",
    description: "Premium leather belt featuring our signature designer buckle, handcrafted for exceptional style and durability.",
    colors: ["Black", "Brown"],
    featured: true
  },
  {
    id: "watch-1",
    name: "Chronograph Classic",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800&auto=format&fit=crop",
    category: "watch",
    description: "Sophisticated chronograph with a stainless steel case, three subdials, and a genuine leather strap for timeless elegance.",
    colors: ["Silver/Black", "Gold/Brown"],
    bestSeller: true,
    featured: true
  },
  {
    id: "watch-2",
    name: "Diver Professional",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800&auto=format&fit=crop",
    category: "watch",
    description: "Water-resistant to 300m with a unidirectional rotating bezel and luminous hands, perfect for underwater adventures or everyday style.",
    colors: ["Blue", "Black"],
    new: true
  },
  {
    id: "glasses-1",
    name: "Aviator Premium",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
    category: "glasses",
    description: "Classic aviator sunglasses with polarized lenses and a lightweight metal frame, providing 100% UV protection with timeless style.",
    colors: ["Gold/Green", "Silver/Blue"],
    featured: true
  },
  {
    id: "glasses-2",
    name: "Urban Wayfarer",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    category: "glasses",
    description: "Modern interpretation of the iconic wayfarer style, featuring premium acetate frames and anti-reflective lenses.",
    colors: ["Black", "Tortoise"],
    bestSeller: true
  }
];
