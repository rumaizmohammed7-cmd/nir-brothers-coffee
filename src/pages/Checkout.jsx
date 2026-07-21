import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, discountAmount, taxAmount, shippingAmount, total, clearCart } = useCart();
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Completed
  const [addressData, setAddressData] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    document.title = "Checkout | NIR Brothers Coffee";
    if (cart.length === 0 && step !== 3) {
      navigate('/shop');
    }
  }, [cart, navigate, step]);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (addressData.name && addressData.email && addressData.address) {
      setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    // Save order data to localStorage for Admin view
    const existing = JSON.parse(localStorage.getItem('nir_orders') || '[]');
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString(),
      customer: addressData,
      paymentMethod: paymentMethod,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        grind: item.grind,
        weight: item.weight
      })),
      pricing: {
        subtotal: subtotal,
        discount: discountAmount,
        tax: taxAmount,
        shipping: shippingAmount,
        total: total
      },
      status: 'Processing'
    };
    localStorage.setItem('nir_orders', JSON.stringify([newOrder, ...existing]));

    // Check if Formspree ID is set for real email notifications
    const formspreeId = localStorage.getItem('nir_formspree_id');
    if (formspreeId) {
      let cleanId = formspreeId.trim();
      if (cleanId.includes('formspree.io/f/')) {
        cleanId = cleanId.split('formspree.io/f/')[1];
      }
      cleanId = cleanId.split('/')[0].trim();

      const emailBody = {
        orderId: orderId,
        date: newOrder.date,
        customerName: addressData.name,
        customerEmail: addressData.email,
        customerPhone: addressData.phone,
        customerAddress: `${addressData.address}, ${addressData.city} - ${addressData.pincode}`,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card',
        itemsOrdered: cart.map(item => `${item.product.name} (${item.weight}, ${item.grind}) x${item.quantity}`).join('\n'),
        totalAmount: `₹${total}`,
        _subject: `New Coffee Order ${orderId} - ₹${total}`
      };

      fetch(`https://formspree.io/f/${cleanId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailBody)
      }).catch(err => console.log('Error dispatching Formspree notification:', err));
    }

    setStep(3);
    // clear cart after completing order
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Progress tracker */}
        <div className="flex justify-between items-center max-w-lg mx-auto mb-16 relative">
          <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-coffee-200 z-0" />
          <div
            className="absolute left-0 top-[18px] h-[2px] bg-coffee-500 z-0 transition-all duration-500"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {/* Node 1 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-xs font-bold ${
              step >= 1 ? 'bg-coffee-800 text-coffee-50' : 'bg-white border border-coffee-200 text-coffee-600'
            }`}>
              1
            </div>
            <span className="text-xxs uppercase tracking-wider font-mono font-bold mt-2 text-coffee-800">Shipping</span>
          </div>

          {/* Node 2 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-xs font-bold ${
              step >= 2 ? 'bg-coffee-800 text-coffee-50' : 'bg-white border border-coffee-200 text-coffee-600'
            }`}>
              2
            </div>
            <span className="text-xxs uppercase tracking-wider font-mono font-bold mt-2 text-coffee-800">Payment</span>
          </div>

          {/* Node 3 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-xs font-bold ${
              step === 3 ? 'bg-coffee-800 text-coffee-50' : 'bg-white border border-coffee-200 text-coffee-600'
            }`}>
              3
            </div>
            <span className="text-xxs uppercase tracking-wider font-mono font-bold mt-2 text-coffee-800">Confirmed</span>
          </div>
        </div>

        {/* Checkout Main grid layout */}
        {step !== 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Step form left */}
            <div className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 bg-white/60 border border-coffee-200/20">
              {step === 1 ? (
                <form onSubmit={handleShippingSubmit} className="flex flex-col gap-4">
                  <h2 className="font-heading text-xl font-bold text-coffee-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-coffee-500" />
                    <span>Shipping Address</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Contact Name</label>
                      <input
                        type="text"
                        required
                        value={addressData.name}
                        onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                        className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={addressData.email}
                        onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
                        className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={addressData.address}
                      onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                      className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2 col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">City / District</label>
                      <input
                        type="text"
                        required
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2 col-span-1">
                      <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Pincode</label>
                      <input
                        type="text"
                        required
                        value={addressData.pincode}
                        onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                        className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-coffee-800 font-bold">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={addressData.phone}
                      onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                      className="bg-white text-xs px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 py-4 rounded-xl font-heading text-xs font-bold tracking-widest mt-4 transition-all"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </form>
              ) : (
                <div className="flex flex-col gap-6">
                  <h2 className="font-heading text-xl font-bold text-coffee-900 mb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-coffee-500" />
                    <span>Choose Payment Method</span>
                  </h2>

                  <div className="flex flex-col gap-3">
                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-coffee-500 bg-coffee-100/30' : 'border-coffee-200 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-coffee-500"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-coffee-900">Cash on Delivery (COD)</span>
                        <span className="text-xxs text-coffee-600 mt-0.5">Pay in cash or UPI at the doorstep</span>
                      </div>
                    </label>

                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-coffee-500 bg-coffee-100/30' : 'border-coffee-200 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-coffee-500"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-coffee-900">Instant UPI (GPay / PhonePe)</span>
                        <span className="text-xxs text-coffee-600 mt-0.5">Secure payment via UPI link</span>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-coffee-200 hover:border-coffee-500 py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest transition-colors bg-white"
                    >
                      EDIT SHIPPING
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-coffee-500 text-coffee-900 hover:bg-coffee-700 hover:text-coffee-50 py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest transition-all shadow-md"
                    >
                      PLACE ORDER (₹{total})
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Checkout summary right */}
            <div className="lg:col-span-1 flex flex-col gap-6 bg-white/40 p-6 rounded-2xl border border-coffee-200/30 glass-card">
              <h3 className="font-heading text-lg font-bold text-coffee-900">Your Selection</h3>
              
              <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between items-center text-xs border-b border-coffee-100 pb-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-coffee-900">{item.product.name}</span>
                      <span className="text-xxs text-coffee-500 font-mono">{item.weight} &bull; Qty {item.quantity}</span>
                    </div>
                    <span className="font-mono font-semibold text-coffee-800">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 text-xs text-coffee-700 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{taxAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingAmount === 0 ? 'FREE' : `₹${shippingAmount}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-coffee-900 border-t border-coffee-200/30 pt-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Confirmation / Completed step */
          <motion.div
            className="max-w-md mx-auto text-center py-16 px-6 bg-white/40 border border-coffee-200/30 rounded-3xl glass-card flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h1 className="font-heading text-2xl font-bold text-coffee-900 mb-2">Order Confirmed!</h1>
              <p className="text-xs text-coffee-700 font-light leading-relaxed">
                Thank you for support. Your batch of beans is slated for roasting at our Bangalore unit. We will email tracking details shortly.
              </p>
            </div>

            <div className="bg-coffee-100/50 p-4 rounded-xl border border-coffee-200/20 w-full text-xs font-mono text-left flex flex-col gap-2">
              <div className="flex justify-between"><span className="text-coffee-500">Order Ref</span><span className="font-semibold">NIR-#{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div className="flex justify-between"><span className="text-coffee-500">Deliver To</span><span className="font-semibold">{addressData.name || 'Brew Lover'}</span></div>
              <div className="flex justify-between"><span className="text-coffee-500">Estimated Delivery</span><span className="font-semibold">3-4 business days</span></div>
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="w-full bg-coffee-800 text-coffee-50 hover:bg-coffee-500 hover:text-coffee-900 py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
