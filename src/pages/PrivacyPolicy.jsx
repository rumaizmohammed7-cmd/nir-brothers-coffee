import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | NIR Brothers Coffee";
  }, []);

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
        
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white/40 p-8 rounded-3xl border border-coffee-200/30 glass-card text-sm text-coffee-700 leading-relaxed font-light flex flex-col gap-6">
          <p>
            At NIR Brothers Coffee, we respect your privacy and are committed to protecting the personal data you share with us. This policy outlines how we collect, store, and process your details.
          </p>

          <h2 className="font-heading text-lg font-bold text-coffee-900 mt-4">1. Information We Collect</h2>
          <p>
            When you purchase our premium coffee, sign up for our newsletter, or register an account, we collect contact information (name, shipping address, email, phone) and payment preferences.
          </p>

          <h2 className="font-heading text-lg font-bold text-coffee-900 mt-4">2. Sourcing & Order Fulfillment</h2>
          <p>
            Your shipping data is shared securely with our direct-trade delivery partners to ensure fresh roasted bags are delivered safely. We do not sell or trade your personal data with third-party advertising companies.
          </p>

          <h2 className="font-heading text-lg font-bold text-coffee-900 mt-4">3. Security</h2>
          <p>
            We process transaction payments via secure SSL encrypted payment processors. No credit card details are stored directly on our servers.
          </p>

          <p className="text-xxs text-coffee-400 font-mono mt-6">
            Last Updated: July 21, 2026
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
