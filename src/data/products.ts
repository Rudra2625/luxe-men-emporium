
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
    name: "Patel's Neck Black ",
    price: 150.00,
    image: "https://dms.mydukaan.io/original/jpeg/media/ab494b17-71f9-4b04-b4f1-207202e21422.jpg",
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
    image: "https://i.etsystatic.com/7832984/r/il/9913d4/656265776/il_fullxfull.656265776_7i5s.jpg",
    category: "wallet",
    description: "Sleek and modern carbon fiber wallet with a slim profile, perfect for the minimalist who appreciates cutting-edge design and functionality.",
    colors: ["Carbon", "Silver"],
    new: true
  },
  {
    id: "wallet-3",
    name: "Bifold Leather Wallet",
    price: 45.00,
    image: "https://redtape.com/cdn/shop/files/4_e6d21443-b497-410b-8d67-b6052298b4b0.jpg?v=1741417414",
    category: "wallet",
    description: "Keep your essentials organized and secure with our Bifold Leather Wallet. With 6 card slots, 2 secret pockets and 2 currency compartments, this wallet offers ample space for your essentials..",
    colors: ["Black Grey", "Navy"],
    bestSeller: true
  },
  {
    id: "wallet-4",
    name: "Soild Leather Wallet",
    price: 45.00,
    image: "https://i.pinimg.com/736x/06/41/c6/0641c6ea298ed2e293d2f60bb2bb93b4.jpg",
    category: "wallet",
    description: "Keep your essentials organized and secure with our Solid Leather Wallet. With 6 card slots, 2 secret pockets and 2 currency compartments, this wallet offers ample space for your essentials..",
    colors: ["Black Grey", "Navy"],
    
  },
  
  {
    id: "belt-1",
    name: "Classic Reversible Belt",
    price: 75.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8iTx9OPs9QSMgMOupZmF26c-rurCY-itenQ&s",
    category: "belt",
    description: "A versatile reversible leather belt with a rotating buckle that offers two classic colors in one elegant accessory.",
    colors: ["Black/Brown", "Navy/Tan"],
    bestSeller: true
  },
  {
    id: "belt-2",
    name: "Designer Buckle Belt",
    price: 120.00,
    image: "https://img.joomcdn.net/a0cb209a506f2bbf40d41651c92779770bb5c479_original.jpeg",
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
