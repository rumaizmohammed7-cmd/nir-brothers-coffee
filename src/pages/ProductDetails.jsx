import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Plus, Minus, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState('Filter Fine');
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedWeight(foundProduct.weight || '250g');
      setQuantity(1);
      document.title = `${foundProduct.name} | NIR Brothers Coffee`;
    } else {
      // Direct to 404
      navigate('/404');
    }
  }, [id, navigate]);

  if (!product) return null;

  // Pricing calculations based on weight selection
  const getPriceForWeight = () => {
    if (selectedWeight === '500g') return Math.round(product.price * 1.8);
    if (selectedWeight === '1kg') return Math.round(product.price * 3.4);
    return product.price;
  };

  const currentPrice = getPriceForWeight();

  const handleAddToCart = () => {
    // Modify copy with current calculated price
    const finalProduct = {
      ...product,
      price: currentPrice
    };
    addToCart(finalProduct, quantity, selectedGrind, selectedWeight);
  };

  // Image Zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // Grind / Weight options
  const grindOptions = ['Whole Beans', 'Filter Fine', 'Espresso Fine', 'French Press Coarse'];
  const weightOptions = ['250g', '500g', '1kg'];

  // Filter out related products
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-coffee-800 hover:text-coffee-500 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ROASTERS GUILD</span>
        </button>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          
          {/* Left Side: Image Zoom View */}
          <div className="flex flex-col gap-4">
            <div
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-coffee-200/40 shadow-md cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover origin-center"
                animate={{
                  scale: isZoomed ? 1.6 : 1,
                  x: isZoomed ? `${50 - mousePos.x * 0.6}%` : 0,
                  y: isZoomed ? `${50 - mousePos.y * 0.6}%` : 0,
                }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            <p className="text-center text-xxs text-coffee-500 font-light italic">
              Hover image to zoom into the roast details
            </p>
          </div>

          {/* Right Side: Configuration & Purchase */}
          <div className="flex flex-col gap-6">
            
            {/* Title, Category & rating */}
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-2">
                {product.category} &bull; {product.blend}
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 leading-tight mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-coffee-500 stroke-transparent" />
                  <span className="text-sm font-mono font-medium text-coffee-800">{product.rating}</span>
                </div>
                <span className="text-coffee-300">|</span>
                <span className="text-xs text-coffee-600 font-light">{product.reviewsCount} verified reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-coffee-200/40 py-4">
              <span className="text-2xl md:text-3xl font-mono font-bold text-coffee-900">₹{currentPrice}</span>
              <span className="text-xxs uppercase tracking-wider text-coffee-500 font-mono block mt-1">GST Inclusive &bull; Free delivery above ₹500</span>
            </div>

            {/* Grind Selector */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">1. Select Grind Option</span>
              <div className="flex flex-wrap gap-2">
                {grindOptions.map((grind) => (
                  <button
                    key={grind}
                    onClick={() => setSelectedGrind(grind)}
                    className={`text-xs py-2.5 px-4 rounded-xl border transition-all ${
                      selectedGrind === grind
                        ? 'border-coffee-500 bg-coffee-800 text-coffee-50 font-semibold'
                        : 'border-coffee-200 bg-white text-coffee-800 hover:border-coffee-500'
                    }`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Selector */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">2. Select Weight Pack</span>
              <div className="flex gap-3">
                {weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`text-xs py-2.5 px-4 rounded-xl border flex-1 text-center transition-all ${
                      selectedWeight === weight
                        ? 'border-coffee-500 bg-coffee-800 text-coffee-50 font-semibold'
                        : 'border-coffee-200 bg-white text-coffee-800 hover:border-coffee-500'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add CTA */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center border border-coffee-200 rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="p-3.5 hover:bg-coffee-200/40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-coffee-800" />
                </button>
                <span className="px-5 text-sm font-mono font-medium text-coffee-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3.5 hover:bg-coffee-200/40 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-coffee-800" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-coffee-500 text-coffee-900 hover:bg-coffee-700 hover:text-coffee-50 py-4 rounded-xl font-heading text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>ADD TO BAG</span>
              </button>

              <button className="p-4 bg-white border border-coffee-200 hover:border-coffee-500 rounded-xl hover:text-red-500 transition-colors shadow-sm" aria-label="Add to wishlist">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Trade Tag */}
            <div className="flex items-center gap-3 bg-coffee-100/50 p-4 rounded-xl border border-coffee-200/30 mt-2">
              <ShieldCheck className="w-5 h-5 text-coffee-500" />
              <span className="text-xxs uppercase tracking-wider text-coffee-700 font-bold font-mono">NIR Guarantees: 100% Direct Sourced, Handpacked Fresh.</span>
            </div>

          </div>

        </div>

        {/* Tab Sections (Specs, Reviews) */}
        <div className="mb-24">
          
          {/* Tab buttons */}
          <div className="flex border-b border-coffee-200/60 mb-8 overflow-x-auto">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs uppercase tracking-widest font-bold pb-4 px-6 relative transition-all ${
                  activeTab === tab ? 'text-coffee-500' : 'text-coffee-700 hover:text-coffee-500'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeDetailTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-coffee-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="bg-white/40 p-6 md:p-8 rounded-2xl border border-coffee-200/30 glass-card">
            {activeTab === 'description' && (
              <div className="text-sm text-coffee-700 leading-relaxed font-light flex flex-col gap-4">
                <p>{product.description}</p>
                <p>We source shade-grown beans to let them mature slowly inside their cherries. This results in cleaner sugars and rich aromatic chemical compositions that don't need artificial additives.</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-coffee-200/20 py-2">
                      <span className="text-coffee-500 uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-coffee-900 font-semibold">{val}</span>
                    </div>
                  ))
                ) : (
                  <p>Standard roast parameters: Estate grown, washed sun-dried, micro-batch.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-coffee-100 pb-4">
                  <div className="text-3xl font-mono font-bold text-coffee-800">{product.rating}</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-coffee-500 stroke-transparent" />
                      ))}
                    </div>
                    <span className="text-xxs text-coffee-500 font-light mt-1">Based on global certified buyer reviews</span>
                  </div>
                </div>
                <div className="text-xs text-coffee-700 font-light italic">
                  "This coffee exhibits notes of deep cacao and velvet crema. Sits beautifully on the palate." - Verified Buyer.
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 mb-8">Related Roasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="glass-card rounded-2xl p-4 bg-white/70 border border-coffee-200/20 group hover:shadow-lg hover:bg-white cursor-pointer transition-all duration-300"
              >
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-coffee-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-heading text-sm font-bold text-coffee-900 group-hover:text-coffee-500 transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <span className="font-mono text-xs font-semibold text-coffee-800 mt-2 block">
                  ₹{p.price}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
