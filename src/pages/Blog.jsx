import React, { useState, useEffect } from 'react';
import { blogs } from '../data/blogs';
import { Search, Calendar, User, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = "Coffee Sourcing Journal | NIR Brothers Coffee";
  }, []);

  const categories = ['All', 'Farming', 'Roasting', 'Heritage'];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">Coffee Journal</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-coffee-900 mb-4">Sourcing & Brewing Logs</h1>
          <p className="text-sm text-coffee-700 font-light max-w-md mx-auto">
            Deep dives into farming ecology, coffee roasting chemistry, and traditional filter brewing guides.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/40 p-4 rounded-2xl border border-coffee-200/30 glass-card">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs py-2 px-4 rounded-xl transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-coffee-800 text-coffee-50 font-semibold shadow-sm'
                    : 'bg-white/60 hover:bg-coffee-200/40 text-coffee-800 border border-coffee-200/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-coffee-500" />
            <input
              type="text"
              placeholder="Search journals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  className="glass-card rounded-2xl overflow-hidden bg-white/70 border border-coffee-200/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group h-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-[16/10] overflow-hidden bg-coffee-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xxs font-mono font-bold text-coffee-500 uppercase tracking-widest block mb-2">
                      {blog.category}
                    </span>
                    
                    <h2 className="font-heading text-lg font-bold text-coffee-900 mb-3 group-hover:text-coffee-500 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-xs text-coffee-700 leading-relaxed font-light mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="mt-auto pt-4 border-t border-coffee-200/20 flex items-center justify-between text-xxs text-coffee-500 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white/20 rounded-2xl border border-coffee-200/20">
            <span className="text-4xl">✍️</span>
            <p className="text-sm text-coffee-700 mt-3 font-light">No journal entries matched your search query.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
