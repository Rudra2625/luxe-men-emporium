
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Perfumes',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    description: 'Exquisite fragrances for the distinguished gentleman.',
    link: '/products?category=perfume'
  },
  {
    name: 'Wallets',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted leather wallets combining style and functionality.',
    link: '/products?category=wallet'
  },
  {
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800&auto=format&fit=crop',
    description: 'Precision timepieces that make a statement.',
    link: '/products?category=watch'
  },
  {
    name: 'Belts',
    image: 'https://images.unsplash.com/photo-1605348863400-c21ea557333e?q=80&w=800&auto=format&fit=crop',
    description: 'Premium leather belts crafted for lasting elegance.',
    link: '/products?category=belt'
  },
  {
    name: 'Glasses',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop',
    description: 'Designer eyewear combining style and protection.',
    link: '/products?category=glasses'
  }
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-center text-luxe-navy mb-12">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              className={`relative overflow-hidden rounded-lg shadow-lg group ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <Link to={category.link}>
                <div className="relative h-80 w-full">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="font-serif text-2xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-gray-200 mb-4 max-w-xs">{category.description}</p>
                      <span className="inline-block bg-luxe-gold text-luxe-navy px-4 py-2 rounded font-medium transition-colors">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
