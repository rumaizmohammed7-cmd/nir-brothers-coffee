import React, { useState } from 'react';
import { Search, ShoppingBag, Truck, Package, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    const orders = JSON.parse(localStorage.getItem('nir_orders') || '[]');
    const found = orders.find(o => o.id.toLowerCase() === orderId.trim().toLowerCase());
    
    setSearchResult(found || null);
    setHasSearched(true);
  };

  const steps = [
    { label: 'Order Placed', desc: 'Sourced from estate & logged in system', status: 'Processing', icon: ShoppingBag },
    { label: 'Roasted & Packed', desc: 'Carefully micro-roasted by NIR brothers', status: 'Processing', icon: Package },
    { label: 'Shipped', desc: 'In transit from Chikkamaglore', status: 'Shipped', icon: Truck },
    { label: 'Delivered', desc: 'Fresh coffee at your doorstep', status: 'Delivered', icon: CheckCircle2 }
  ];

  // Helper to determine active steps based on order status
  const getStepIndex = (status) => {
    if (status === 'Delivered') return 3;
    if (status === 'Shipped') return 2;
    return 1; // Processing status shows Placed & Processing complete
  };

  const activeIndex = searchResult ? getStepIndex(searchResult.status) : 0;

  return (
    <div className="py-32 bg-coffee-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-2">Order Dispatch Logs</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900">Track Your Coffee Order</h1>
          <p className="text-sm text-coffee-600 font-light mt-3 max-w-lg mx-auto leading-relaxed">
            Enter your unique Order ID to track the fresh roasting, packaging, and shipping progress of your NIR Brothers Coffee.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-12 bg-white/60 p-2.5 rounded-2xl border border-coffee-200/40 glass-card">
          <div className="relative flex-grow flex items-center">
            <Search className="w-5 h-5 text-coffee-400 absolute left-4" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-123456)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-transparent text-sm w-full pl-12 pr-4 py-3.5 focus:outline-none text-coffee-900 font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 px-8 rounded-xl font-heading text-xs font-bold tracking-widest transition-all"
          >
            TRACK
          </button>
        </form>

        {/* Results */}
        {hasSearched && (
          <div>
            {searchResult ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-6 md:p-8 bg-white/60 border border-coffee-200/20 shadow-md"
              >
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-coffee-200/40 pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-mono text-coffee-500 block uppercase">Order ID</span>
                    <h2 className="text-lg font-mono font-bold text-coffee-900">{searchResult.id}</h2>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] font-mono text-coffee-500 block uppercase">Order Status</span>
                    <span className={`inline-block px-3 py-1 rounded-full font-mono text-xs font-bold mt-1 ${
                      searchResult.status === 'Processing' 
                        ? 'bg-amber-100 text-amber-800' 
                        : searchResult.status === 'Shipped' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {searchResult.status === 'Processing' ? 'Roasted & Packed' : searchResult.status}
                    </span>
                  </div>
                </div>

                {/* Progress bar timeline */}
                <div className="relative flex flex-col gap-10 pl-10 border-l-2 border-coffee-200/60 ml-3.5 mb-10 py-2">
                  {steps.map((step, idx) => {
                    const isDone = idx <= activeIndex;
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="relative flex flex-col">
                        
                        {/* Bullet point icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center absolute -left-[57px] top-0 border ${
                          isDone 
                            ? 'bg-coffee-800 border-coffee-800 text-coffee-50 shadow-md' 
                            : 'bg-white border-coffee-200 text-coffee-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Step details */}
                        <span className={`text-sm font-semibold tracking-wide ${isDone ? 'text-coffee-900' : 'text-coffee-400'}`}>
                          {step.label}
                        </span>
                        <span className="text-xxs text-coffee-600 font-light mt-0.5 leading-relaxed">
                          {step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Ordered Items summary */}
                <div className="bg-coffee-100/30 border border-coffee-200/20 p-5 rounded-2xl">
                  <h3 className="font-heading text-sm font-bold text-coffee-900 mb-4">Sourced Batch Details</h3>
                  <div className="flex flex-col gap-3">
                    {searchResult.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-coffee-100/60 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                          <span className="font-semibold text-coffee-900">{item.name}</span>
                          <span className="text-xxs text-coffee-500 font-mono mt-0.5">{item.weight} &bull; Grind: {item.grind} &bull; Qty {item.quantity}</span>
                        </div>
                        <span className="font-mono font-bold text-coffee-800">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-coffee-900 pt-4 border-t border-coffee-200/40 mt-4">
                    <span>Grand Total</span>
                    <span>₹{searchResult.pricing.total.toLocaleString()}</span>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center bg-white/40 border border-coffee-200/20 p-12 rounded-3xl glass-card text-sm text-coffee-600 font-light"
              >
                We could not find any active coffee shipment matching **"{orderId}"**. 
                Please make sure the spelling is correct (e.g. `ORD-849204`).
              </motion.div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;
