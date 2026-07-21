import React, { useEffect } from 'react';
import farmImg from '../assets/images/about_farm.jpg';
import roastImg from '../assets/images/roasting_process.jpg';

const About = () => {
  useEffect(() => {
    document.title = "About Our Sourcing | NIR Brothers Coffee";
  }, []);

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">NIR Sourcing</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-coffee-900 mb-4">Under the Forest Canopy</h1>
          <div className="w-16 h-[2px] bg-coffee-500 mx-auto mt-4" />
        </div>

        {/* Section 1: Shade Grown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 mb-4">Shade-Grown Cultivation</h2>
            <p className="text-sm text-coffee-700 leading-relaxed font-light mb-4">
              Our coffee trees are grown under a multi-tier natural forest canopy in Mudigere and Talagur, Chikkamaglore. This shade blocks harsh direct sunlight, maintaining a cool microclimate that slows cherry development.
            </p>
            <p className="text-sm text-coffee-700 leading-relaxed font-light">
              This slow growth cycle gives the beans more time to absorb natural soil nutrients and complex sugars. It reduces bitterness and enhances delicate organic acidity, resulting in a cleaner, premium tasting coffee.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md aspect-video">
            <img src={farmImg} alt="Coffee trees under forest canopy" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Section 2: Direct Sourcing & Ecology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 md:flex-row-reverse">
          <div className="md:order-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 mb-4">Direct Sourcing Ethics</h2>
            <p className="text-sm text-coffee-700 leading-relaxed font-light mb-4">
              We cut out secondary distributors and broker boards. By working directly with family-run estates and local farming guilds, we ensure that premium prices go straight to the growers.
            </p>
            <p className="text-sm text-coffee-700 leading-relaxed font-light">
              This direct trade relationship funds agricultural improvements, protects biodiversity corridors, and supports fair living wages for plantation harvesters.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-md aspect-video md:order-1">
            <img src={roastImg} alt="Micro batch coffee roasting" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mission and values grid */}
        <div className="bg-white/40 p-8 rounded-3xl border border-coffee-200/30 glass-card">
          <h2 className="text-2xl font-heading font-bold text-coffee-900 text-center mb-8">Our Core Sourcing Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="text-3xl block mb-3">🍃</span>
              <h3 className="font-heading text-base font-bold text-coffee-900 mb-2">Ecological Balance</h3>
              <p className="text-xs text-coffee-700 font-light leading-relaxed">Cultivated alongside wild spices and oranges, keeping local biodiversity intact.</p>
            </div>
            <div className="text-center">
              <span className="text-3xl block mb-3">🤝</span>
              <h3 className="font-heading text-base font-bold text-coffee-900 mb-2">Fair Trade Sourcing</h3>
              <p className="text-xs text-coffee-700 font-light leading-relaxed">Direct-to-grower margins that exceed standard fair-trade benchmarks.</p>
            </div>
            <div className="text-center">
              <span className="text-3xl block mb-3">🔥</span>
              <h3 className="font-heading text-base font-bold text-coffee-900 mb-2">Roast Artistry</h3>
              <p className="text-xs text-coffee-700 font-light leading-relaxed">Roasting parameters custom calibrated in micro-batches under thermal control.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
