import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Spilled Beans | NIR Brothers Coffee";
  }, []);

  return (
    <div className="py-24 bg-coffee-50 min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md px-6 flex flex-col items-center gap-6">
        
        {/* Animated Spilled Coffee Mug SVG */}
        <div className="w-48 h-48 relative flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-coffee-900 fill-none stroke-[2.5]">
            {/* Spilled liquid puddle */}
            <motion.path
              d="M10 85 C30 85, 40 88, 60 85 C80 82, 90 85, 95 85"
              className="stroke-coffee-500 stroke-[5] fill-none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Tilted, cracked cup */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 80, x: -10, y: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {/* Cup Outline */}
              <path d="M30 40 L35 70 C36 78, 44 80, 50 80 C56 80, 64 78, 65 70 L70 40 Z" />
              {/* Handle */}
              <path d="M70 45 C80 45, 80 65, 70 65" />
              {/* Crack line */}
              <path d="M42 45 L48 60 L45 75" className="stroke-red-500/80 stroke-[1.5]" />
            </motion.g>
          </svg>
          
          {/* Floating beans flying away */}
          <motion.div
            className="absolute top-8 left-6 text-2xl"
            animate={{ y: [-10, -50], x: [0, -30], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          >
            🫘
          </motion.div>
          <motion.div
            className="absolute top-12 right-6 text-xl"
            animate={{ y: [-15, -45], x: [0, 20], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", delay: 0.4 }}
          >
            🫘
          </motion.div>
        </div>

        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-coffee-900 mb-2">404 - Spilled the Beans</h1>
          <p className="text-sm text-coffee-700 font-light leading-relaxed">
            The page you are looking for has been spilled or moved. Let's get you back to fresh brews.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 px-8 py-4 rounded-xl font-heading text-xs font-bold tracking-widest transition-colors shadow-md"
        >
          BACK TO HOME
        </button>

      </div>
    </div>
  );
};

export default NotFound;
