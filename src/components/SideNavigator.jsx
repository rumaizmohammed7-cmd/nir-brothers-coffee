import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'bestsellers', label: 'Best Sellers' },
  { id: 'journey', label: 'Our Sourcing' },
  { id: 'about', label: 'Who We Are' },
  { id: 'process', label: 'The Quality Loop' },
  { id: 'whyus', label: 'Why NIR' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'newsletter', label: 'Circle' }
];

const SideNavigator = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total page scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }

      // Detect active section based on viewport position
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6">
      
      {/* Scroll Progress Line */}
      <div className="relative w-[2px] h-40 bg-coffee-200/30 rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute top-0 left-0 w-full bg-coffee-500 origin-top"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Section Dots */}
      <div className="flex flex-col gap-4">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Tooltip Label */}
              <span className="absolute right-8 text-xxs uppercase tracking-widest font-mono font-bold bg-coffee-900 text-coffee-50 px-3 py-1.5 rounded-lg border border-coffee-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap">
                {sec.label}
              </span>

              {/* Dot visual */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-coffee-500 border border-coffee-500 scale-125'
                    : 'w-1.5 h-1.5 bg-coffee-200/50 group-hover:bg-coffee-500 group-hover:scale-110'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigator;
