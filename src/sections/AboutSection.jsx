import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import farmAboutImg from '../assets/images/about_farm.jpg';

const Counter = ({ to, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    // Start animation when component mounts/is in view
    const controls = animate(count, to, {
      duration: 2.0,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toLocaleString());
      }
    });
    return () => controls.stop();
  }, [to]);

  return <span className="font-mono text-3xl md:text-4xl font-bold text-coffee-800">{displayValue}{suffix}</span>;
};

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-coffee-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          
          {/* Left Side: Images Grid */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-coffee-200/40 relative">
              <img
                src={farmAboutImg}
                alt="Shade-grown coffee farm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/45 to-transparent" />
            </div>

            {/* Small Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-coffee-800 text-coffee-50 p-6 rounded-2xl shadow-xl border border-coffee-700 max-w-[200px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <h4 className="font-heading text-lg font-bold text-coffee-500 mb-1">Direct Trade</h4>
              <p className="text-xxs text-coffee-200/90 leading-relaxed font-light">
                Supporting over 150 local farmers in Chikkamaglore through fair pricing.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side: Text & Counter Stats */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 leading-tight">
              Honest Sourcing.<br/>Micro-Batch Roasted.
            </h2>
            <p className="text-sm md:text-base text-coffee-700 leading-relaxed font-light">
              Founded by the NIR brothers—Noushad, Irsad, and Rasheed—our brand began on our ancestral plantation in Mudigere. Our goal is to bring the luxury of premium, single-estate filter coffee out of the hills and direct to the cup of modern coffee connoisseurs.
            </p>
            <p className="text-sm md:text-base text-coffee-700 leading-relaxed font-light">
              We manage everything from handpicking and sun-drying to roasting and packaging. Every bag you purchase represents direct-to-farm trade, supporting sustainable agriculture and ecological shade-canopy farming.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-6 mt-6 border-t border-coffee-200/40 pt-8">
              <div className="flex flex-col">
                <Counter to={12} suffix="+" />
                <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono mt-1">Years Sourcing</span>
              </div>
              <div className="flex flex-col">
                <Counter to={45000} suffix="+" />
                <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono mt-1">Happy Brewers</span>
              </div>
              <div className="flex flex-col">
                <Counter to={18} suffix="+" />
                <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono mt-1">Blend Formulations</span>
              </div>
              <div className="flex flex-col">
                <Counter to={120000} suffix="+" />
                <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono mt-1">Orders Shipped</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate('/story')}
                className="bg-coffee-800 text-coffee-50 px-8 py-4 rounded-xl font-heading text-xs font-bold tracking-widest hover:bg-coffee-500 hover:text-coffee-900 transition-colors"
              >
                OUR HERITAGE STORY
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
