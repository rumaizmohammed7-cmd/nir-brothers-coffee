import React from 'react';
import { motion } from 'framer-motion';
import { Map, Hand, Flame, Disc, Box, Truck } from 'lucide-react';

const STEPS = [
  {
    icon: Map,
    title: 'The Sourcing Estate',
    subtitle: 'Mudigere & Talagur',
    description: 'We source exclusively from family-run estates under heavy forest canopies, ensuring slow-matured cherries with natural sweetness.'
  },
  {
    icon: Hand,
    title: '100% Handpicked Cherries',
    subtitle: 'Selective Harvest',
    description: 'Only crimson red, fully ripe cherries are harvested by hand. No strip-harvesting, ensuring uniform sugar levels and zero defect.'
  },
  {
    icon: Flame,
    title: 'Precision Roasting',
    subtitle: 'Small Batch Control',
    description: 'Roasting profiles calibrated in small batches. Beans are heat-treated with precision to draw out specific origin aromatics.'
  },
  {
    icon: Disc,
    title: 'Slow Stone Grinding',
    subtitle: 'Preserved Aromas',
    description: 'Custom grind sizes are processed with chilled steel plates to prevent friction heat, locking in delicate volatile oils.'
  },
  {
    icon: Box,
    title: 'Aroma-Lock Packing',
    subtitle: 'One-Way Degassing Valve',
    description: 'Packed within minutes of roasting into thick foil bags with one-way degassing valves to expel CO2 while keeping oxygen out.'
  },
  {
    icon: Truck,
    title: 'Delivered Fresh',
    subtitle: 'Direct Sourcing Model',
    description: 'Direct-to-consumer delivery ensuring you receive your beans within 3-5 days of roasting. Farm-fresh, direct to cup.'
  }
];

const FarmJourney = () => {
  return (
    <section className="py-24 bg-coffee-900 text-coffee-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-coffee-500 block mb-3">
            Our Farm-To-Cup Sourcing Model
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-50">
            The NIR Sourcing Journey
          </h2>
          <div className="w-24 h-[2px] bg-coffee-500 mx-auto mt-6" />
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-[50%] transform -translate-x-[50%] top-8 bottom-8 w-[2px] bg-coffee-800 hidden md:block" />

          {/* Sourcing Steps */}
          <div className="flex flex-col gap-16 md:gap-24 relative">
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-8 relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {/* Text card */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end md:px-8">
                    <div className={`glass-dark rounded-2xl p-6 md:p-8 max-w-md w-full border border-coffee-800/40 relative hover:border-coffee-500/50 transition-colors ${
                      isEven ? 'text-left' : 'md:text-right'
                    }`}>
                      <span className="text-xs font-mono font-bold text-coffee-500 uppercase tracking-widest block mb-1">
                        Step 0{idx + 1} &bull; {step.subtitle}
                      </span>
                      <h3 className="font-heading text-lg md:text-xl font-bold text-coffee-50 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-xs md:text-sm text-coffee-200/80 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon Node Center */}
                  <div className="absolute left-[50%] transform -translate-x-[50%] w-12 h-12 rounded-full bg-coffee-800 border-2 border-coffee-700 flex items-center justify-center z-10 hidden md:flex shadow-lg group">
                    <motion.div
                      whileInView={{
                        backgroundColor: '#C89B5A',
                        borderColor: '#C89B5A',
                        color: '#2D1606',
                      }}
                      viewport={{ once: true, margin: '-150px' }}
                      transition={{ duration: 0.4 }}
                      className="w-10 h-10 rounded-full bg-coffee-900 border border-coffee-800 flex items-center justify-center text-coffee-500"
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Dummy side to align grid */}
                  <div className="w-full md:w-1/2 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FarmJourney;
