import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { motion } from 'framer-motion';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const BestSellers = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Pick top 4 products as best sellers
  const bestSellers = products.slice(0, 4);

  return (
    <section className="py-24 bg-coffee-100/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-3">
              Customer Favorites
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 leading-tight">
              Our Best Selling Roasts
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-coffee-800 hover:text-coffee-500 transition-colors py-2 group"
          >
            <span>VIEW ALL ROASTS</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="pb-16"
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div
                className="glass-card rounded-2xl p-4 flex flex-col h-full bg-white/70 relative border border-coffee-200/20 group hover:shadow-xl hover:bg-white transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                {/* Product Image Container */}
                <div 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-coffee-50 relative cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                  />
                  {product.tags && product.tags[0] && (
                    <span className="absolute top-3 left-3 bg-coffee-900 text-coffee-500 text-xxs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                      {product.tags[0]}
                    </span>
                  )}
                </div>

                {/* Rating & Brand details */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono">
                    {product.blend}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-coffee-500 stroke-transparent" />
                    <span className="text-xs font-mono font-medium text-coffee-800">{product.rating}</span>
                  </div>
                </div>

                {/* Product Title */}
                <h3 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="font-heading text-lg font-bold text-coffee-900 mb-2 hover:text-coffee-500 cursor-pointer transition-colors line-clamp-1"
                >
                  {product.name}
                </h3>

                {/* Tagline / Description snippet */}
                <p className="text-xs text-coffee-600 font-light mb-4 line-clamp-2 leading-relaxed">
                  {product.tagline || product.description}
                </p>

                {/* Weight selection and Price Row */}
                <div className="mt-auto pt-4 border-t border-coffee-200/30 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xxs text-coffee-500 font-mono">Weight: {product.weight}</span>
                    <span className="text-lg font-mono font-bold text-coffee-900">₹{product.price}</span>
                  </div>
                  
                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product, 1, 'Medium Grind', product.weight)}
                    className="p-3 bg-coffee-800 text-coffee-50 rounded-xl hover:bg-coffee-500 hover:text-coffee-900 transition-all duration-300 shadow-sm hover:shadow-coffee-500/30 group-hover:scale-105 active:scale-95"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSellers;
