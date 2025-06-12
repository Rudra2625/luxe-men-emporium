
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../redux/authSelector';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {  
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD
  const totalItems = getTotalItems();
=======
  const navigate = useNavigate();
  const dispatch = useDispatch();
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const authUser = useSelector(selectCurrentUser);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    } else {
      // Fallback if user is stored in localStorage
      const localUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(localUser);
    }
  }, [authUser]);

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Brahmani Luxe Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-serif font-bold text-luxe-navy">
              Brahmani <span className="text-luxe-gold">Luxe</span>
            </h1>
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

            {/* Conditional User Display */}
<<<<<<< HEAD
            {user && user.name ? (
              <Link to="/dashboard" className="text-luxe-navy hover:text-luxe-gold font-medium">
                {user.name.split(' ')[0]}
              </Link>
=======
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="text-luxe-navy hover:text-luxe-gold font-medium">
                  {user.fullname.split(' ')[0]}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-luxe-navy hover:text-luxe-gold transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
>>>>>>> 3b8404820fc2ec81453d6b87f50b15154e09842f
            ) : (
              <>
                <Link to="/login" className="text-luxe-navy hover:text-luxe-gold font-medium">Login</Link>
                <Link to="/signup" className="text-luxe-navy hover:text-luxe-gold font-medium">Signup</Link>
              </>
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
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-luxe-navy hover:text-luxe-gold transition-colors py-2">Home</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-luxe-navy hover:text-luxe-gold transition-colors py-2">Products</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-luxe-navy hover:text-luxe-gold transition-colors py-2">About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-luxe-navy hover:text-luxe-gold transition-colors py-2">Contact</Link>
              {user && (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-luxe-navy hover:text-luxe-gold transition-colors py-2 text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
