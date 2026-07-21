import React from 'react';
import { Leaf, ShieldCheck, Award, Flame, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    icon: Leaf,
    title: '100% Natural Sourced',
    description: 'No artificial additives, flavors, or preservatives. Grown in harmony with nature under protective forest canopies.'
  },
  {
    icon: ShieldCheck,
    title: 'Certified Organic',
    description: 'Pesticide-free shade-grown coffee plants nurtured using strictly organic vermicompost and traditional mulch.'
  },
  {
    icon: Award,
    title: 'Luxury Grade Beans',
    description: 'Exclusively sourcing specialty-grade beans graded above 80 points by SCA standards. Hand-sorted to remove defects.'
  },
  {
    icon: Flame,
    title: 'Batch-Roasted Fresh',
    description: 'We roast to order. Your coffee is hand-roasted in small batches to preserve highly volatile aroma compounds.'
  },
  {
    icon: Zap,
    title: 'Express Doorstep Delivery',
    description: 'Direct-to-consumer express shipping ensuring you receive fresh-roasted aromatics right to your kitchen.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-coffee-100/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-coffee-500 block mb-3">Our Standards</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900">Why NIR Brothers?</h2>
          <div className="w-16 h-[2px] bg-coffee-500 mx-auto mt-5" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 hover:border-coffee-500/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                {/* Icon Container with hover glow */}
                <div className="w-14 h-14 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-800 mb-6 group-hover:bg-coffee-500 group-hover:text-coffee-900 transition-colors duration-300 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-heading text-base font-bold text-coffee-900 mb-3 group-hover:text-coffee-500 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-xs text-coffee-700 leading-relaxed font-light">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
