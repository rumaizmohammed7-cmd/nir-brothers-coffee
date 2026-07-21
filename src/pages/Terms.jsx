import React, { useEffect } from 'react';

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | NIR Brothers Coffee";
  }, []);

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
        
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 mb-8">Terms & Conditions</h1>
        
        <div className="bg-white/40 p-8 rounded-3xl border border-coffee-200/30 glass-card text-sm text-coffee-700 leading-relaxed font-light flex flex-col gap-6">
          <p>
            Welcome to the NIR Brothers Coffee online experience. By accessing or purchasing from our platform, you agree to comply with the terms outlined below.
          </p>

          <h2 className="font-heading text-lg font-bold text-coffee-900 mt-4">1. Custom Roast & Grinding Policy</h2>
          <p>
            Because we custom roast and grind our coffee bags immediately prior to shipping, orders are custom assets and cannot be cancelled or modified once they enter our roasting schedule (typically 2 hours after purchase).
          </p>

          <h2 className="font-heading text-lg font-bold text-coffee-900 mt-4">2. Sourcing Commitments</h2>
          <p>
            Our beans are 100% estate-sourced and direct-traded. Variances in seasonal yields, weather, and canopy conditions can impact taste profiles and crop availability from batch to batch.
          </p>

          <h2 className="font-heading text-lg font-bold text-coffee-900 mt-4">3. Refunds & Replacements</h2>
          <p>
            We stand by our roast quality. If your bag arrives damaged, or if there is a fulfillment error, contact us at roasters@nirbrothers.coffee within 48 hours of delivery to secure a replacement.
          </p>

          <p className="text-xxs text-coffee-400 font-mono mt-6">
            Last Updated: July 21, 2026
          </p>
        </div>

      </div>
    </div>
  );
};

export default Terms;
