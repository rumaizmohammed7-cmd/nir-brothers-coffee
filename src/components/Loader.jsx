import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/images/logo.jpg';

const Loader = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finishLoading();
          }, 600); // short delay after hitting 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-coffee-900 text-coffee-50"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -50,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Coffee Cup SVG */}
        <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-24 h-24 stroke-coffee-50 fill-none stroke-[2]"
          >
            {/* Cup Outline */}
            <defs>
              <linearGradient id="cup-fill" x1="0" y1="1" x2="0" y2="0">
                <stop offset={`${progress}%`} stopColor="#C89B5A" />
                <stop offset={`${progress}%`} stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Cup Outline */}
            <path
              d="M30 40 L35 70 C36 78, 44 80, 50 80 C56 80, 64 78, 65 70 L70 40 Z"
              className="stroke-coffee-50"
              style={{ fill: 'url(#cup-fill)' }}
            />
            {/* Handle */}
            <path
              d="M70 45 C80 45, 80 65, 70 65"
              className="stroke-coffee-50 fill-none"
            />
            {/* Plate / Saucer */}
            <path
              d="M20 85 L80 85"
              className="stroke-coffee-50 stroke-[3]"
            />
            {/* Steam Waves */}
            <motion.path
              d="M40 30 Q45 20 40 10"
              className="stroke-coffee-50/60"
              animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            />
            <motion.path
              d="M50 32 Q55 22 50 12"
              className="stroke-coffee-50/80"
              animate={{ y: [0, -12, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }}
            />
            <motion.path
              d="M60 30 Q65 20 60 10"
              className="stroke-coffee-50/60"
              animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.8 }}
            />
          </svg>
          
          {/* Floating/Rotating Coffee Bean */}
          <motion.div
            className="absolute -top-2 -right-2 text-3xl"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            ☕
          </motion.div>
        </div>

        {/* Brand Name Text Reveal */}
        <motion.img
          src={logoImg}
          alt="NIR Brothers Logo"
          className="w-16 h-16 rounded-full border border-coffee-500/20 object-cover shadow-lg mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        />
        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-widest font-heading text-coffee-50 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          NIR BROTHERS
        </motion.h1>
        
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-coffee-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          luxury coffee roasters
        </motion.p>

        {/* Progress Bar & Number */}
        <div className="w-48 bg-coffee-800 h-[2px] rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-coffee-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-sm tracking-wider text-coffee-200">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
};

export default Loader;
