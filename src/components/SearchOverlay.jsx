import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

const SearchOverlay = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.blend.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const handleResultClick = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] bg-coffee-900/90 backdrop-blur-md flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-3 text-coffee-100 hover:text-coffee-500 transition-colors bg-white/5 hover:bg-white/10 rounded-full"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-2xl flex flex-col gap-6">
            {/* Search Input */}
            <div className="relative flex items-center border-b-2 border-coffee-200/40 focus-within:border-coffee-500 pb-3 transition-colors">
              <Search className="w-6 h-6 text-coffee-500 mr-4" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search premium roasts (e.g. Filter, Strong, Arabica)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xl font-heading text-coffee-50 placeholder-coffee-200/50 focus:outline-none"
              />
            </div>

            {/* Results Grid */}
            <div className="max-h-[60vh] overflow-y-auto pr-2 flex flex-col gap-3">
              {results.length > 0 ? (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-300 group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-coffee-800"
                    />
                    <div className="flex-1">
                      <h4 className="font-heading text-sm font-semibold text-coffee-50 group-hover:text-coffee-500 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xxs text-coffee-400 font-mono mt-1">
                        {product.category} &bull; {product.blend}
                      </p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-coffee-500">
                      ₹{product.price}
                    </span>
                  </div>
                ))
              ) : query ? (
                <p className="text-sm text-coffee-200/70 text-center py-8">No roasts matched your query.</p>
              ) : (
                <div className="text-center py-8 text-coffee-200/50 text-xs tracking-wider uppercase font-light">
                  Type to start searching...
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
