
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative bg-luxe-navy text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Elevate Your <span className="text-luxe-gold">Style</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-lg">
              Discover our premium collection of men's accessories that define elegance and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild className="bg-luxe-gold hover:bg-luxe-gold/90 text-luxe-navy px-8 py-6">
                <Link to="/products">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                <Link to="/about">
                  About Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                alt="Premium Men's Accessories" 
                className="rounded-lg shadow-2xl object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-luxe-gold text-luxe-navy p-4 rounded-lg shadow-lg">
                <p className="font-serif text-lg">Premium Quality</p>
                <p>Handcrafted Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
