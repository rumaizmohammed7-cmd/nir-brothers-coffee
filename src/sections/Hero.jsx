import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

import filterCoffeeImg from '../assets/images/filter_coffee.jpg';
import strongBlendImg from '../assets/images/strong_blend.jpg';
import premiumBlendImg from '../assets/images/premium_blend.jpg';
import chicoryCoffeeImg from '../assets/images/chicory_coffee.jpg';

const SLIDES = [
  {
    id: 'nir-filter-coffee',
    title: 'Filter Coffee',
    headline: 'Born in Mudigere.\nCrafted for Coffee Lovers.',
    description: 'Experience the rich aroma and authentic taste of premium coffee from the heart of Karnataka.',
    price: '₹349',
    packetImage: filterCoffeeImg,
    bgColor: '#2D1606',
    accentColor: '#C89B5A',
  },
  {
    id: 'nir-strong-blend',
    title: 'Strong Blend',
    headline: 'Real Taste.\nIntense Espresso.',
    description: 'Vienna-roasted Robusta and Arabica blend giving notes of rich cocoa, wood spice, and a velvety dense crema.',
    price: '₹399',
    packetImage: strongBlendImg,
    bgColor: '#1c0c03',
    accentColor: '#8D6E63',
  },
  {
    id: 'nir-premium-blend',
    title: 'Premium Blend',
    headline: 'Luxury Crema.\nSweet Caramel.',
    description: '100% single-origin honey-processed Arabica from Talagur, Chikkamaglore. Smooth, balanced, with subtle citrus undertones.',
    price: '₹449',
    packetImage: premiumBlendImg,
    bgColor: '#3b220f',
    accentColor: '#C89B5A',
  },
  {
    id: 'nir-chicory-coffee',
    title: 'Chicory Coffee',
    headline: 'Real Connection.\nNatural Wellness.',
    description: 'shade-grown Arabica combined with 40% organic roasted French chicory. A prebiotic-rich, digestion-friendly cup.',
    price: '₹329',
    packetImage: chicoryCoffeeImg,
    bgColor: '#2c1e13',
    accentColor: '#8D6E63',
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const autoPlayRef = useRef(null);

  // Mouse parallax tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 30;
      const y = (clientY - window.innerHeight / 2) / 30;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Autoplay functionality
  const startAutoplay = () => {
    stopAutoplay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleQuickAdd = (slide) => {
    // find item from mock database
    const productItem = {
      id: slide.id,
      name: slide.title === 'Filter Coffee' ? 'South Indian Filter Coffee' : `NIR ${slide.title}`,
      price: parseInt(slide.price.replace('₹', '')),
      image: slide.packetImage,
      category: 'Filter',
      blend: 'Chicory Blend',
    };
    addToCart(productItem, 1, 'Medium Grind', '250g');
  };

  const slide = SLIDES[current];

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
    })
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none bg-coffee-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full flex items-center"
          style={{ backgroundColor: slide.bgColor }}
        >
          {/* Slow zooming background layer */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url(${slide.packetImage})` }}
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 5, ease: 'easeOut' }}
          />

          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-20">
            {/* Left side text content */}
            <div className="text-coffee-50 z-10 flex flex-col justify-center">
              <motion.span
                className="text-xs uppercase tracking-[0.4em] font-semibold mb-3 text-coffee-500 block"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                NIR Brothers Premium Coffee
              </motion.span>
              
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 whitespace-pre-line"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                className="text-sm md:text-base leading-relaxed text-coffee-100/80 mb-8 max-w-md font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {slide.description}
              </motion.p>

              {/* Price and CTA Buttons */}
              <motion.div
                className="flex items-center gap-6 flex-wrap"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex flex-col">
                  <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono">Premium bag</span>
                  <span className="text-2xl md:text-3xl font-mono font-bold text-coffee-50">{slide.price}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuickAdd(slide)}
                    className="bg-coffee-500 text-coffee-900 px-6 py-3.5 rounded-xl font-heading text-xs font-bold tracking-wider hover:bg-coffee-700 hover:text-coffee-50 transition-all flex items-center gap-2 hover:shadow-lg shadow-coffee-500/20"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/shop')}
                    className="border border-coffee-200/40 hover:border-coffee-500 text-coffee-50 px-6 py-3.5 rounded-xl font-heading text-xs font-bold tracking-wider hover:bg-white/5 transition-all"
                  >
                    EXPLORE SHOP
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right side visual components */}
            <div className="relative flex items-center justify-center h-[50vh] lg:h-[60vh] z-10 select-none pointer-events-none">
              {/* Parallax Container */}
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{ 
                  transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {/* Background radial glow */}
                <div 
                  className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-40 transition-colors duration-1000"
                  style={{ backgroundColor: slide.accentColor }}
                />

                {/* Cup & Saucer floating */}
                <motion.div
                  className="absolute bottom-[10%] left-[5%] w-[120px] md:w-[160px] drop-shadow-2xl z-20"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: [0, -10, 0], opacity: 1 }}
                  transition={{ 
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    opacity: { duration: 0.8 }
                  }}
                >
                  <div className="text-6xl md:text-8xl filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">
                    ☕
                  </div>
                  {/* Cup Steam animation */}
                  <div className="absolute top-0 left-[35%] flex flex-col gap-1 opacity-60">
                    <motion.div className="w-[2px] h-6 bg-white/50 blur-[1px] rounded-full" animate={{ y: [0, -15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} />
                    <motion.div className="w-[2px] h-6 bg-white/40 blur-[1px] rounded-full" animate={{ y: [0, -15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.7 }} />
                  </div>
                </motion.div>

                {/* Coffee Packet Image */}
                <motion.div
                  className="w-[180px] md:w-[260px] h-[240px] md:h-[350px] rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 z-10"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    x: { duration: 0.8 },
                    opacity: { duration: 0.8 },
                    y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                  }}
                >
                  <img
                    src={slide.packetImage}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Coffee Beans */}
                <motion.div
                  className="absolute top-[10%] right-[10%] text-2xl md:text-4xl filter drop-shadow-md z-30"
                  animate={{ 
                    rotate: 360,
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                >
                  🫘
                </motion.div>

                <motion.div
                  className="absolute bottom-[20%] right-[5%] text-xl md:text-3xl filter drop-shadow-md z-30"
                  animate={{ 
                    rotate: -360,
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 12, ease: "linear" },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }
                  }}
                >
                  🫘
                </motion.div>

                {/* Leaves */}
                <motion.div
                  className="absolute top-[15%] left-[15%] text-3xl md:text-5xl filter drop-shadow-md z-30"
                  animate={{ 
                    rotate: [0, 10, -5, 0],
                    x: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  🍃
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-12 right-12 z-30 flex items-center justify-between pointer-events-none">
        {/* Pagination Dots */}
        <div className="flex gap-3 items-center pointer-events-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-coffee-500 w-8' : 'bg-white/40 w-2 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/10 hover:bg-coffee-500 hover:text-coffee-900 text-coffee-50 border border-white/20 hover:border-transparent transition-all"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/10 hover:bg-coffee-500 hover:text-coffee-900 text-coffee-50 border border-white/20 hover:border-transparent transition-all"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
