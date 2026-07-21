import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Coffee } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-coffee-800 text-coffee-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated Floating Beans in Background */}
      <motion.div
        className="absolute top-10 left-[10%] text-6xl opacity-10 select-none pointer-events-none"
        animate={{ y: [0, -15, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        🫘
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-[15%] text-5xl opacity-15 select-none pointer-events-none"
        animate={{ y: [0, 20, 0], rotate: -360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
      >
        🫘
      </motion.div>
      <motion.div
        className="absolute top-[60%] left-[80%] text-4xl opacity-10 select-none pointer-events-none"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        🍃
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          className="glass-dark rounded-3xl p-8 md:p-16 border border-coffee-700/50 shadow-2xl text-center flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand Icon */}
          <div className="w-16 h-16 rounded-full bg-coffee-900 border border-coffee-800 flex items-center justify-center text-coffee-500 shadow-inner">
            <Coffee className="w-6 h-6" />
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-50 max-w-xl leading-tight">
            Join the NIR Coffee Circle
          </h2>
          
          <p className="text-sm md:text-base text-coffee-200/80 leading-relaxed font-light max-w-lg">
            Receive updates on micro-batch releases, coffee recipes, and estate harvests. Enjoy 20% off your first subscription.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-coffee-900/60 text-coffee-50 text-sm px-5 py-4 rounded-xl border border-coffee-700 focus:outline-none focus:border-coffee-500 transition-colors placeholder-coffee-200/40"
            />
            <button
              type="submit"
              className="bg-coffee-500 hover:bg-coffee-700 hover:text-coffee-50 text-coffee-900 px-6 py-4 rounded-xl font-heading text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95"
            >
              <span>SUBSCRIBE</span>
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

          {submitted && (
            <motion.p
              className="text-xs text-coffee-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Welcome to the circle! Use code <strong className="underline">NIRBREW20</strong> at checkout for 20% off.
            </motion.p>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
