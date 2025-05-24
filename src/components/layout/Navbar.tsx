
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [user, setUser] = useState<{ fullname: string } | null>(null);
  useEffect(() => { })

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Brahmani Luxe Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-serif font-bold text-luxe-navy">Brahmani <span className="text-luxe-gold">Luxe</span></h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-luxe-navy hover:text-luxe-gold transition-colors">Home</Link>
            <Link to="/products" className="text-luxe-navy hover:text-luxe-gold transition-colors">Products</Link>
            <Link to="/about" className="text-luxe-navy hover:text-luxe-gold transition-colors">About Us</Link>
            <Link to="/contact" className="text-luxe-navy hover:text-luxe-gold transition-colors">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-luxe-navy hover:text-luxe-gold transition-colors">
              <Search size={20} />
            </button>

            <Link to="/cart" className="text-luxe-navy hover:text-luxe-gold transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxe-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* User Login/Signup */}
            {user ? (
              <Link to="/dashboard" className="text-luxe-navy hover:text-luxe-gold font-medium">
                Login as {user.fullname.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link to="/signup" className="text-luxe-navy hover:text-luxe-gold font-medium">
                Signup
              </Link>
            )}
            
            <button onClick={toggleMenu} className="md:hidden text-luxe-navy">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-4">
              <Link
                to="/"
                className="text-luxe-navy hover:text-luxe-gold transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-luxe-navy hover:text-luxe-gold transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-luxe-navy hover:text-luxe-gold transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-luxe-navy hover:text-luxe-gold transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
