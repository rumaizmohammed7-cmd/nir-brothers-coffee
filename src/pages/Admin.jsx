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
  const [formspreeId, setFormspreeId] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappNumber2, setWhatsappNumber2] = useState('');
  const [imageString, setImageString] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    document.title = "Admin Dashboard | NIR Brothers Coffee";
    const isAuth = sessionStorage.getItem('nir_admin_authenticated') === 'true';
    setIsAdminAuthenticated(isAuth);
    
    // Load Formspree ID
    setFormspreeId(localStorage.getItem('nir_formspree_id') || '');
    // Load WhatsApp Number
    setWhatsappNumber(localStorage.getItem('nir_whatsapp_number') || '917760782551');
    setWhatsappNumber2(localStorage.getItem('nir_whatsapp_number_2') || '917899487901');
    
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

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('nir_formspree_id', formspreeId);
    localStorage.setItem('nir_whatsapp_number', whatsappNumber);
    localStorage.setItem('nir_whatsapp_number_2', whatsappNumber2);
    alert("Notification and Sourcing settings updated successfully!");
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'NIRCOFFEE2026') {
      sessionStorage.setItem('nir_admin_authenticated', 'true');
      setIsAdminAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access Denied: Incorrect staff passcode.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nir_admin_authenticated');
    setIsAdminAuthenticated(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const max_size = 400; // max width/height in px
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to low size JPEG to fit in localStorage easily
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImageString(dataUrl);
          setImagePreview(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
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
        image: imageString || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop', // default premium coffee image if empty
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
      setImageString('');
      setImagePreview('');

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

  if (!isAdminAuthenticated) {
    return (
      <div className="py-32 bg-coffee-950 min-h-screen flex items-center justify-center text-coffee-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-card p-8 rounded-3xl bg-white/5 border border-coffee-200/10 shadow-2xl flex flex-col gap-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-coffee-900 flex items-center justify-center text-coffee-500 mx-auto text-2xl border border-coffee-700/50 shadow-inner">
            🔒
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold tracking-wider text-coffee-100">Staff Portal Security</h1>
            <p className="text-[10px] text-coffee-400 font-light mt-2 max-w-xs mx-auto leading-relaxed">
              Access is restricted to authorized NIR Brothers roastery managers only.
            </p>
          </div>
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[9px] font-mono uppercase tracking-wider text-coffee-300 font-bold">Roastery Passcode</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="bg-white/10 text-white text-xs px-4 py-3.5 rounded-xl border border-coffee-700/50 focus:outline-none focus:border-coffee-500 text-center font-mono placeholder-coffee-600"
              />
            </div>
            {authError && <p className="text-[10px] text-red-400 font-mono mt-1">{authError}</p>}
            <button
              type="submit"
              className="bg-coffee-500 text-coffee-950 hover:bg-coffee-100 hover:text-coffee-950 py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest mt-2 transition-all active:scale-95 shadow-md"
            >
              UNLOCK PORTAL
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-coffee-500 block mb-2">Internal Sourcing Portal</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900">NIR Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-coffee-800 text-coffee-50 text-xxs font-mono font-bold tracking-widest px-4 py-2.5 rounded-xl border border-coffee-700 flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-coffee-500" />
              <span>SECURED ACCESS</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-950/20 text-red-700 hover:bg-red-600 hover:text-white text-xxs font-mono font-bold tracking-widest px-4 py-2.5 rounded-xl border border-red-500/20 shadow-sm transition-all"
            >
              LOG OUT
            </button>
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

              {/* Notification Settings Setup */}
              <div className="glass-card bg-coffee-100/40 border border-coffee-200/40 p-5 rounded-2xl mb-8">
                <h3 className="font-heading text-sm font-bold text-coffee-900 mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-coffee-500" />
                  <span>Configure Dispatch & Order Notifications</span>
                </h3>
                <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
                  
                  {/* Formspree */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-coffee-800 font-bold">
                      Formspree ID (Email Alerts)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. mvoyzpqw"
                      value={formspreeId}
                      onChange={(e) => setFormspreeId(e.target.value)}
                      className="bg-white text-xs px-3 py-2.5 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono w-full"
                    />
                  </div>

                  {/* WhatsApp 1 */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-coffee-800 font-bold">
                      WhatsApp Admin 1 (Noushad)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 917760782551"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="bg-white text-xs px-3 py-2.5 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono w-full"
                    />
                  </div>

                  {/* WhatsApp 2 */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-coffee-800 font-bold">
                      WhatsApp Admin 2 (Irsad)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 917899487901"
                      value={whatsappNumber2}
                      onChange={(e) => setWhatsappNumber2(e.target.value)}
                      className="bg-white text-xs px-3 py-2.5 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono w-full"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="md:col-span-1">
                    <button
                      type="submit"
                      className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 text-[10px] font-mono font-bold tracking-wider px-2 py-3 rounded-xl transition-all w-full text-center"
                    >
                      SAVE
                    </button>
                  </div>

                </form>
                <p className="text-[10px] text-coffee-600 font-light mt-3 leading-relaxed">
                  * Entering WhatsApp numbers (with country code, e.g. 91 for India) will let customers choose which roaster (Noushad or Irsad) to text to submit their billing details on checkout.
                </p>
              </div>

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

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] font-bold text-coffee-700 uppercase">Product Image (Upload from Device)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-white px-3 py-2 rounded-lg border border-coffee-200 focus:outline-none text-[10px]"
                    />
                    {imagePreview && (
                      <div className="flex items-center gap-3 mt-1.5 bg-coffee-100/30 p-2 rounded-xl border border-coffee-200/20">
                        <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-coffee-200" />
                        <span className="text-[10px] text-coffee-500 font-mono">Compressed successfully!</span>
                      </div>
                    )}
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
