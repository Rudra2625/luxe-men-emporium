
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-luxe-navy text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">About LUXEMEN</h1>
            <p className="max-w-2xl mx-auto text-gray-300">
              Crafting premium accessories for the modern gentleman since 2010.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 text-luxe-navy">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  LUXEMEN was founded with a singular mission: to create exceptional men's accessories that 
                  combine timeless elegance with contemporary style. What began as a small boutique in 
                  the heart of Beverly Hills has grown into a renowned brand trusted by discerning gentlemen worldwide.
                </p>
                <p className="text-gray-700 mb-4">
                  Our journey started when our founder, Alexander Reynolds, recognized a gap in the market for 
                  high-quality men's accessories that didn't compromise on craftsmanship or materials. Drawing from 
                  his family's legacy in luxury goods manufacturing, he assembled a team of skilled artisans and 
                  designers to create products that would stand the test of time.
                </p>
                <p className="text-gray-700">
                  Today, LUXEMEN continues to uphold the values of exceptional quality, attention to detail, 
                  and customer satisfaction that have defined our brand since day one.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=1000&auto=format&fit=crop" 
                  alt="Luxury watches and accessories" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-luxe-gold text-luxe-navy p-4 rounded-lg shadow-lg">
                  <p className="font-serif text-lg">Est. 2010</p>
                  <p>Beverly Hills, CA</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center mb-12 text-luxe-navy">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-luxe-navy w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every product we create, from the selection of materials to 
                  the final quality check. No detail is too small to overlook.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-luxe-navy w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  While respecting traditional craftsmanship, we continuously innovate to enhance the 
                  functionality, durability, and style of our products.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-luxe-navy w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices in our production processes and responsible 
                  sourcing of materials to minimize our environmental impact.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Craftsmanship */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-center mb-12 text-luxe-navy">Our Craftsmanship</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1595246140625-573b8c10551c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Craftsman working on a leather product" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Handcrafted Excellence</h3>
                <p className="text-gray-700 mb-4">
                  At LUXEMEN, we maintain a dedication to traditional craftsmanship. Each product is 
                  carefully handcrafted by our team of skilled artisans, many of whom have decades of 
                  experience in their respective fields.
                </p>
                <p className="text-gray-700 mb-4">
                  We source the finest materials from around the world: Italian leathers, Swiss mechanisms 
                  for our watches, and premium ingredients for our fragrances. These materials are then 
                  transformed through meticulous processes that combine time-honored techniques with 
                  modern innovation.
                </p>
                <p className="text-gray-700">
                  Every item undergoes rigorous quality control to ensure it meets our exacting standards 
                  before reaching our customers. It's this unwavering commitment to craftsmanship that 
                  allows us to offer products of exceptional quality and durability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
