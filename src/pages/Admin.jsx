import React, { useState, useEffect } from 'react';
import { ShoppingBag, Mail, Package, ShieldCheck, Plus, Trash2, ArrowUpRight, DollarSign, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { products as initialProducts } from '../data/products';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    tagline: '',
    description: '',
    price: '',
    category: 'Filter',
    blend: '100% Arabica',
    weight: '250g',
    intensity: 3,
  });

  useEffect(() => {
    document.title = "Admin Dashboard | NIR Brothers Coffee";
    
    // Load orders
    const loadedOrders = JSON.parse(localStorage.getItem('nir_orders') || '[]');
    setOrders(loadedOrders);

    // Load messages
    const loadedMessages = JSON.parse(localStorage.getItem('nir_messages') || '[]');
    setMessages(loadedMessages);

    // Load products
    const loadedProducts = JSON.parse(localStorage.getItem('nir_products') || '[]');
    if (loadedProducts.length === 0) {
      localStorage.setItem('nir_products', JSON.stringify(initialProducts));
      setProductsList(initialProducts);
    } else {
      setProductsList(loadedProducts);
    }
  }, []);

  // Calculate statistics
  const totalSales = orders.reduce((acc, curr) => acc + curr.pricing.total, 0);
  const averageOrder = orders.length > 0 ? (totalSales / orders.length).toFixed(0) : 0;

  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    localStorage.setItem('nir_orders', JSON.stringify(updated));
    setOrders(updated);
  };

  const handleDeleteMessage = (msgId) => {
    const filtered = messages.filter(m => m.id !== msgId);
    localStorage.setItem('nir_messages', JSON.stringify(filtered));
    setMessages(filtered);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const newId = 'nir-' + newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const productToAdd = {
        id: newId,
        ...newProduct,
        price: parseFloat(newProduct.price),
        intensity: parseInt(newProduct.intensity),
        rating: 5.0,
        reviewsCount: 1,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop', // default premium coffee image
        tags: ['New Sourcing', 'Estate Direct'],
        specifications: {
          origin: 'Mudigere, Chikkamaglore, India',
          roastLevel: 'Medium Roast',
          process: 'Washed Process',
          grindOption: 'Whole Beans / Filter Fine',
        }
      };

      const updatedProducts = [productToAdd, ...productsList];
      localStorage.setItem('nir_products', JSON.stringify(updatedProducts));
      setProductsList(updatedProducts);
      
      // Reset form
      setNewProduct({
        name: '',
        tagline: '',
        description: '',
        price: '',
        category: 'Filter',
        blend: '100% Arabica',
        weight: '250g',
        intensity: 3,
      });

      // Force refresh page content since database config references products
      window.location.reload();
    }
  };

  const handleDeleteProduct = (prodId) => {
    const filtered = productsList.filter(p => p.id !== prodId);
    localStorage.setItem('nir_products', JSON.stringify(filtered));
    setProductsList(filtered);
    window.location.reload();
  };

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-2">Internal Sourcing Portal</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900">NIR Admin Dashboard</h1>
          </div>
          <div className="bg-coffee-800 text-coffee-50 text-xxs font-mono font-bold tracking-widest px-4 py-2.5 rounded-xl border border-coffee-700 flex items-center gap-2 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-coffee-500" />
            <span>SECURED ADMINISTRATOR ACCESS</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs uppercase tracking-wider font-mono text-coffee-500 font-bold block mb-1">Total Sales Revenue</span>
              <span className="text-2xl font-heading font-bold text-coffee-900">₹{totalSales.toLocaleString()}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-800">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs uppercase tracking-wider font-mono text-coffee-500 font-bold block mb-1">Total Orders Placed</span>
              <span className="text-2xl font-heading font-bold text-coffee-900">{orders.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs uppercase tracking-wider font-mono text-coffee-500 font-bold block mb-1">Active Enquiries</span>
              <span className="text-2xl font-heading font-bold text-coffee-900">{messages.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-800">
              <Mail className="w-5 h-5" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 bg-white/60 border border-coffee-200/20 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xxs uppercase tracking-wider font-mono text-coffee-500 font-bold block mb-1">Average Order Value</span>
              <span className="text-2xl font-heading font-bold text-coffee-900">₹{averageOrder}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-800">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Tab Controls */}
        <div className="flex gap-4 border-b border-coffee-200/40 pb-4 mb-8">
          {[
            { id: 'orders', label: 'Incoming Orders', icon: ShoppingBag },
            { id: 'messages', label: 'Contact Messages', icon: Mail },
            { id: 'products', label: 'Product Catalog', icon: Package }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading text-xs font-bold tracking-wider transition-all ${
                  isActive
                    ? 'bg-coffee-800 text-coffee-50 shadow-md'
                    : 'text-coffee-600 hover:bg-coffee-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="glass-card rounded-3xl p-6 md:p-8 bg-white/60 border border-coffee-200/20 shadow-md">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-heading font-bold text-coffee-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-coffee-500" />
                <span>Order Management Queue</span>
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-coffee-300 mx-auto mb-4" />
                  <p className="text-sm text-coffee-600 font-light">No orders have been placed yet. Place some mock orders from the checkout page!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-coffee-200/60 font-mono text-coffee-700 font-bold uppercase tracking-wider">
                        <th className="py-4 px-4">Order ID / Date</th>
                        <th className="py-4 px-4">Customer Details</th>
                        <th className="py-4 px-4">Items / Grind</th>
                        <th className="py-4 px-4">Payment</th>
                        <th className="py-4 px-4 text-right">Total Price</th>
                        <th className="py-4 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-coffee-200/30 hover:bg-white/40 transition-colors">
                          <td className="py-4 px-4 align-top">
                            <span className="font-mono font-bold text-coffee-900 block">{order.id}</span>
                            <span className="text-[10px] text-coffee-500 block mt-1">{order.date}</span>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <span className="font-bold text-coffee-900 block">{order.customer.name}</span>
                            <span className="text-coffee-600 block">{order.customer.email}</span>
                            <span className="text-coffee-500 font-light block mt-1">{order.customer.address}, {order.customer.city}</span>
                          </td>
                          <td className="py-4 px-4 align-top">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="mb-2 last:mb-0">
                                <span className="font-semibold text-coffee-800">{item.name} x {item.quantity}</span>
                                <span className="text-[10px] text-coffee-500 block mt-0.5">{item.weight} | {item.grind}</span>
                              </div>
                            ))}
                          </td>
                          <td className="py-4 px-4 align-top">
                            <span className="uppercase tracking-wider font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-coffee-100 text-coffee-800">
                              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Secure Card'}
                            </span>
                          </td>
                          <td className="py-4 px-4 align-top text-right font-bold text-coffee-900">
                            ₹{order.pricing.total.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 align-top text-center">
                            <div className="flex flex-col items-center gap-2">
                              <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                                order.status === 'Processing' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : order.status === 'Shipped' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                              }`}>
                                {order.status}
                              </span>
                              
                              <select 
                                value={order.status}
                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                className="bg-white border border-coffee-200 rounded px-1.5 py-0.5 text-[10px] focus:outline-none"
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-heading font-bold text-coffee-900 mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-coffee-500" />
                <span>Customer Sourcing Enquiries</span>
              </h2>

              {messages.length === 0 ? (
                <div className="text-center py-16">
                  <Mail className="w-12 h-12 text-coffee-300 mx-auto mb-4" />
                  <p className="text-sm text-coffee-600 font-light">No sourcing messages have been received. Submit a form in the contact screen!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {messages.map(msg => (
                    <div key={msg.id} className="p-5 rounded-2xl bg-white/50 border border-coffee-200/20 hover:border-coffee-300/40 transition-colors flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-coffee-950 text-sm">{msg.name}</span>
                          <span className="text-xxs text-coffee-500 font-mono">({msg.email})</span>
                          <span className="text-[10px] text-coffee-400 font-mono ml-2">{msg.date}</span>
                        </div>
                        <h4 className="font-heading font-bold text-coffee-800 text-xs mt-1">Subject: {msg.subject || 'Sourcing Question'}</h4>
                        <p className="text-xs text-coffee-700 leading-relaxed font-light mt-1 whitespace-pre-line">{msg.message}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 text-coffee-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              
              {/* Product catalog list */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-heading font-bold text-coffee-900 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-coffee-500" />
                  <span>Current Catalog Items ({productsList.length})</span>
                </h3>

                <div className="flex flex-col gap-4">
                  {productsList.map(prod => (
                    <div key={prod.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-coffee-200/20 hover:bg-white/60 transition-colors justify-between">
                      <div className="flex items-center gap-4">
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover border border-coffee-200/20" />
                        <div>
                          <h4 className="font-heading font-bold text-coffee-900 text-xs">{prod.name}</h4>
                          <span className="text-[10px] text-coffee-500 font-mono block mt-0.5">{prod.blend} | {prod.weight}</span>
                          <span className="text-[10px] text-coffee-600 font-light block mt-0.5">{prod.tagline}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-heading font-bold text-coffee-900 text-sm">₹{prod.price}</span>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-2 text-coffee-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add product form */}
              <div className="glass-card rounded-2xl p-6 bg-white/50 border border-coffee-200/20">
                <h3 className="text-lg font-heading font-bold text-coffee-900 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-coffee-500" />
                  <span>Sourced Coffee Dispatch</span>
                </h3>

                <form onSubmit={handleAddProduct} className="flex flex-col gap-4 text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arabica Reserve"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Tagline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Micro-batch wood roasted"
                      value={newProduct.tagline}
                      onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                      className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Description</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Detailed blend highlights..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Price (₹)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 450"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Blend Ratio</label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Arabica"
                        value={newProduct.blend}
                        onChange={(e) => setNewProduct({ ...newProduct, blend: e.target.value })}
                        className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none"
                      >
                        <option value="Filter">Filter</option>
                        <option value="Espresso">Espresso</option>
                        <option value="Single Origin">Single Origin</option>
                        <option value="Flavored">Flavored</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Intensity (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={newProduct.intensity}
                        onChange={(e) => setNewProduct({ ...newProduct, intensity: e.target.value })}
                        className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 py-3 rounded-lg font-heading font-bold tracking-widest transition-colors mt-2 text-[10px]"
                  >
                    ADD TO CATALOG
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Admin;
