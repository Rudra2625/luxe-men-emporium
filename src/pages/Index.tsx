
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import TestimonialSection from '../components/home/TestimonialSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <section className="py-16 bg-luxe-navy text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-6">Premium Quality & Craftsmanship</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Each LUXEMEN product is meticulously crafted using the finest materials and expert techniques to ensure exceptional quality and lasting elegance.
            </p>
          </div>
        </section>
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
