import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Coffee } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-coffee-900 text-coffee-50 pt-20 pb-10 overflow-hidden">
      {/* Animated Wave SVG at the top of footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 bg-transparent">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] fill-coffee-50"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-8">
        {/* Brand Details */}
        <div className="flex flex-col gap-5">
          <Link to="/" className="font-heading text-2xl font-bold tracking-widest text-coffee-50 flex items-center gap-2">
            <Coffee className="text-coffee-500 w-6 h-6" />
            <span>NIR BROTHERS</span>
          </Link>
          <p className="text-coffee-200 text-sm leading-relaxed font-light">
            Luxury coffee roasters serving farm-fresh, premium quality coffee blends. Roasted in small batches with passion and authenticity.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="p-2 bg-coffee-800 rounded-full text-coffee-200 hover:bg-coffee-500 hover:text-coffee-900 transition-colors duration-300 flex items-center justify-center" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" className="p-2 bg-coffee-800 rounded-full text-coffee-200 hover:bg-coffee-500 hover:text-coffee-900 transition-colors duration-300 flex items-center justify-center" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="p-2 bg-coffee-800 rounded-full text-coffee-200 hover:bg-coffee-500 hover:text-coffee-900 transition-colors duration-300 flex items-center justify-center" aria-label="Twitter (X)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-wider text-coffee-500 mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm text-coffee-200 font-light">
            <li><Link to="/shop" className="hover:text-coffee-500 transition-colors duration-300">Browse Shop</Link></li>
            <li><Link to="/story" className="hover:text-coffee-500 transition-colors duration-300">Our Story</Link></li>
            <li><Link to="/about" className="hover:text-coffee-500 transition-colors duration-300">About Sourcing</Link></li>
            <li><Link to="/blog" className="hover:text-coffee-500 transition-colors duration-300">Coffee Blog</Link></li>
            <li><Link to="/faq" className="hover:text-coffee-500 transition-colors duration-300">FAQs & Help</Link></li>
          </ul>
        </div>

        {/* Customer Care / Policy */}
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-wider text-coffee-500 mb-6">Support & Policy</h3>
          <ul className="flex flex-col gap-3 text-sm text-coffee-200 font-light">
            <li><Link to="/contact" className="hover:text-coffee-500 transition-colors duration-300">Contact Us</Link></li>
            <li><Link to="/terms" className="hover:text-coffee-500 transition-colors duration-300">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-coffee-500 transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link to="/admin" className="hover:text-coffee-500 transition-colors duration-300">Staff Portal (Admin)</Link></li>
            <li><span className="text-coffee-400">Shipping: Free above ₹500</span></li>
            <li><span className="text-coffee-400">GST: 5% Inclusive</span></li>
          </ul>
        </div>

        {/* Sourcing / Newsletter */}
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-wider text-coffee-500 mb-6">Fresh Sourcing</h3>
          <p className="text-coffee-200 text-sm leading-relaxed font-light mb-4">
            Join the NIR Coffee Circle for exclusive recipe guides, farm journals, and 20% off your first bag.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-coffee-800 text-coffee-50 text-sm px-4 py-3 pr-12 rounded-lg border border-coffee-700 focus:outline-none focus:border-coffee-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 p-2 text-coffee-500 hover:text-coffee-900 hover:bg-coffee-500 rounded-md transition-colors"
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-coffee-500 mt-2 font-light">
              Successfully subscribed! Check your inbox for NIRBREW20.
            </p>
          )}
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-coffee-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-coffee-400 font-light">
        <p>&copy; {new Date().getFullYear()} NIR Brothers Coffee Roasters. All rights reserved.</p>
        <p>Made with passion for premium farm-fresh beans.</p>
      </div>
    </footer>
  );
};

export default Footer;
