import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

// Context
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Story from './pages/Story';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import TrackOrder from './pages/TrackOrder';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return; // Wait until loader finishes

    // Skip Lenis on touch devices or mobile screens to prevent iOS/Safari crashes
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Cursor />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" finishLoading={() => setIsLoading(false)} />
          ) : (
            <div className="flex flex-col min-h-screen relative bg-coffee-50 selection:bg-coffee-500 selection:text-coffee-900">
              {/* Sticky Navbar */}
              <Navbar 
                onCartOpen={() => setIsCartOpen(true)} 
                onSearchOpen={() => setIsSearchOpen(true)} 
              />
              
              {/* Slide-over Cart Drawer */}
              <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
              />
              
              {/* Search Overlay */}
              <SearchOverlay 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
              />

              {/* Main Routing switcher */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/story" element={<Story />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/track" element={<TrackOrder />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
