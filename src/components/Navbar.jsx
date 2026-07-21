import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/images/logo.jpg';

const Navbar = ({ onCartOpen, onSearchOpen }) => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/story' },
    { name: 'Track Order', path: '/track' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass py-4 shadow-lg border-b border-coffee-200/20' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-heading text-xl md:text-2xl font-bold tracking-widest text-coffee-900 flex items-center gap-3"
          >
            <img src={logoImg} alt="NIR Logo" className="w-8 h-8 rounded-full border border-coffee-500/20 object-cover shadow-sm" />
            <span className="text-coffee-500">NIR</span>
            <span className="text-xs uppercase font-sans tracking-[0.2em] font-light text-coffee-700 hidden sm:inline">Brothers</span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest font-medium transition-all duration-300 relative py-1 hover:text-coffee-500 ${
                    isActive ? 'text-coffee-500 font-semibold' : 'text-coffee-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-coffee-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="text-coffee-900 hover:text-coffee-500 p-2 transition-colors rounded-full hover:bg-coffee-200/20"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <Link
              to="/login"
              className="text-coffee-900 hover:text-coffee-500 p-2 transition-colors rounded-full hover:bg-coffee-200/20"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/shop?filter=wishlist"
              className="text-coffee-900 hover:text-coffee-500 p-2 transition-colors rounded-full hover:bg-coffee-200/20 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={onCartOpen}
              className="text-coffee-900 hover:text-coffee-500 p-2 transition-colors rounded-full hover:bg-coffee-200/20 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-coffee-500 text-coffee-900 text-xxs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-coffee-50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-coffee-900 hover:text-coffee-500 p-2 transition-colors rounded-full hover:bg-coffee-200/20"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 top-[72px] bg-coffee-50/95 backdrop-blur-md z-40 lg:hidden flex flex-col px-8 py-12 gap-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xl uppercase tracking-widest font-medium py-2 border-b border-coffee-200/40 hover:text-coffee-500 ${
                      isActive ? 'text-coffee-500 font-bold' : 'text-coffee-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
