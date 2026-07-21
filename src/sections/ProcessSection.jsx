import React from 'react';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  { label: 'Seed', desc: 'Superior seed strain selected' },
  { label: 'Farm', desc: 'Shade-grown slow maturation' },
  { label: 'Harvest', desc: 'Handpicked selective picking' },
  { label: 'Roast', desc: 'Micro-batch thermal profile' },
  { label: 'Grind', desc: 'Chilled stone grind precision' },
  { label: 'Pack', desc: 'Aroma-lock degassing valve' },
  { label: 'Deliver', desc: 'Roast-to-order shipping' }
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-coffee-50 border-t border-b border-coffee-200/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-2">Our Method</span>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-coffee-900">The 7-Step Quality Loop</h2>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Horizontal connector line on desktop */}
          <div className="absolute top-[24px] left-[5%] right-[5%] h-[2px] bg-coffee-200 hidden md:block z-0" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center relative z-10 w-full md:w-[13%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Circular node */}
              <div className="w-12 h-12 rounded-full bg-white border-2 border-coffee-200 flex items-center justify-center font-heading text-base font-bold text-coffee-800 shadow-sm hover:border-coffee-500 hover:text-coffee-500 transition-colors duration-300">
                {index + 1}
              </div>

              <h3 className="font-heading text-sm font-semibold text-coffee-900 mt-4 mb-1">
                {step.label}
              </h3>
              <p className="text-xxs text-coffee-600 leading-normal max-w-[120px] mx-auto font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
