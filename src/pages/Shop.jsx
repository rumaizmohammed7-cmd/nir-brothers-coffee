import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  
  // States for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBlend, setSelectedBlend] = useState('All');
  const [priceRange, setPriceRange] = useState(500); // Max budget
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle wishlist filter from URL query
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'wishlist') {
      // simulate returning favorites
      setSelectedCategory('All');
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = "Shop Premium Roasts | NIR Brothers Coffee";
  }, []);

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBlend = selectedBlend === 'All' || product.blend.includes(selectedBlend);
    const matchesPrice = product.price <= priceRange;

    return matchesSearch && matchesCategory && matchesBlend && matchesPrice;
  });

  // Sorted Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // Default Popularity
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const categories = ['All', 'Filter', 'Espresso', 'Single Origin', 'Flavored'];
  const blends = ['All', '100% Arabica', 'Arabica-Robusta', 'Chicory Blend'];

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="text-center mb-16 pt-8">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-coffee-500 block mb-3">NIR Sourcing</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-coffee-900 mb-4">The Roasters Guild</h1>
          <p className="text-sm text-coffee-700 font-light max-w-md mx-auto">
            Discover our collection of estate-grown, micro-roasted specialty coffee beans.
          </p>
        </div>

        {/* Search, Filter & Sort Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Left Side: Filter Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8 bg-white/40 p-6 rounded-2xl border border-coffee-200/30 glass-card">
            
            {/* Search */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Search Selection</label>
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-coffee-500" />
                <input
                  type="text"
                  placeholder="Find your flavor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-xs pl-10 pr-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Category</label>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                    className={`text-left text-xs py-2 px-3 rounded-lg transition-colors font-medium ${
                      selectedCategory === cat
                        ? 'bg-coffee-800 text-coffee-50 font-semibold'
                        : 'hover:bg-coffee-200/40 text-coffee-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Blend */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Blend Sourcing</label>
              <div className="flex flex-col gap-2">
                {blends.map((blend) => (
                  <button
                    key={blend}
                    onClick={() => { setSelectedBlend(blend); setCurrentPage(1); }}
                    className={`text-left text-xs py-2 px-3 rounded-lg transition-colors font-medium ${
                      selectedBlend === blend
                        ? 'bg-coffee-800 text-coffee-50 font-semibold'
                        : 'hover:bg-coffee-200/40 text-coffee-800'
                    }`}
                  >
                    {blend}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">
                <span>Max Budget</span>
                <span className="font-mono">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="300"
                max="600"
                step="10"
                value={priceRange}
                onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-coffee-500 cursor-pointer h-1 bg-coffee-200 rounded-lg"
              />
            </div>

          </div>

          {/* Right Side: Product Grid & Sorting */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Top Bar Sort options */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 p-4 rounded-xl border border-coffee-200/30 glass-card">
              <span className="text-xs text-coffee-700 font-light font-mono">
                Showing {sortedProducts.length} results
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <ArrowUpDown className="w-4 h-4 text-coffee-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white text-xs px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none focus:border-coffee-500 w-full sm:w-auto font-medium"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {currentItems.map((product) => (
                    <motion.div
                      key={product.id}
                      className="glass-card rounded-2xl p-4 flex flex-col h-full bg-white/70 relative border border-coffee-200/20 group hover:shadow-xl hover:bg-white transition-all duration-500"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                    >
                      {/* Image container */}
                      <a href={`/product/${product.id}`} className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-coffee-50 relative block">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-700"
                        />
                        {product.tags && product.tags[0] && (
                          <span className="absolute top-3 left-3 bg-coffee-900 text-coffee-500 text-xxs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                            {product.tags[0]}
                          </span>
                        )}
                      </a>

                      {/* Brand Info */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono">
                          {product.blend}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-coffee-500 stroke-transparent" />
                          <span className="text-xs font-mono font-medium text-coffee-800">{product.rating}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-base font-bold text-coffee-900 mb-2 hover:text-coffee-500 cursor-pointer transition-colors line-clamp-1">
                        <a href={`/product/${product.id}`}>{product.name}</a>
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-coffee-600 font-light mb-4 line-clamp-2 leading-relaxed">
                        {product.tagline || product.description}
                      </p>

                      {/* Weight and Purchase row */}
                      <div className="mt-auto pt-4 border-t border-coffee-200/30 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xxs text-coffee-500 font-mono">Weight: {product.weight}</span>
                          <span className="text-base font-mono font-bold text-coffee-900">₹{product.price}</span>
                        </div>
                        
                        <button
                          onClick={() => addToCart(product, 1, 'Filter Fine', product.weight)}
                          className="p-3 bg-coffee-800 text-coffee-50 rounded-xl hover:bg-coffee-500 hover:text-coffee-900 transition-all duration-300 shadow-sm hover:shadow-coffee-500/30 active:scale-95"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-16 bg-white/20 rounded-2xl border border-coffee-200/25">
                <span className="text-4xl">🫘</span>
                <p className="text-sm text-coffee-700 mt-3 font-light">No coffee beans matched your filter configurations.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8 pt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-4 py-2 border border-coffee-200/40 rounded-lg text-xs font-bold text-coffee-800 hover:bg-coffee-200/30 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs font-mono font-semibold text-coffee-800">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-4 py-2 border border-coffee-200/40 rounded-lg text-xs font-bold text-coffee-800 hover:bg-coffee-200/30 disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Shop;
