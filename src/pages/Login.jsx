import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Login / Sign Up | NIR Brothers Coffee";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // Simulate success, navigate back to home or shop
      navigate('/shop');
    } else {
      setError('Please fill in all credentials.');
    }
  };

  return (
    <div className="py-24 bg-coffee-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        
        {/* Card wrapper */}
        <motion.div
          className="glass-card rounded-3xl p-8 bg-white/60 border border-coffee-200/20 shadow-2xl flex flex-col gap-6"
          layout
        >
          <div className="text-center">
            <span className="text-3xl block mb-2">☕</span>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-coffee-900">
              {isRegister ? 'Create Coffee Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-coffee-600 font-light mt-2">
              {isRegister ? 'Join the NIR Coffee Circle' : 'Sign in to access your roast orders'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
              />
            </div>

            {error && <p className="text-xxs text-red-500">{error}</p>}

            <button
              type="submit"
              className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest mt-2 transition-all active:scale-95 shadow-md"
            >
              {isRegister ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </form>

          {/* Toggle register/login */}
          <div className="text-center pt-4 border-t border-coffee-200/30">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-xs text-coffee-500 hover:text-coffee-900 hover:underline font-medium"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
