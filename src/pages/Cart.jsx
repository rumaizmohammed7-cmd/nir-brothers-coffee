import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    total,
    coupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  useEffect(() => {
    document.title = "Review Your Bag | NIR Brothers Coffee";
  }, []);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const result = applyCoupon(promoInput);
    setPromoMessage(result.message);
    if (result.success) setPromoInput('');
  };

  return (
    <div className="py-24 bg-coffee-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8">
        
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-coffee-900 mb-12">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-coffee-200/30 rounded-3xl glass-card flex flex-col items-center gap-6">
            <span className="text-5xl">☕</span>
            <div>
              <h2 className="font-heading text-xl font-bold text-coffee-900 mb-2">Your shopping bag is empty</h2>
              <p className="text-sm text-coffee-700 font-light max-w-sm">You haven't added any fresh-roasted blends to your selection yet.</p>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="bg-coffee-800 text-coffee-50 px-8 py-4 rounded-xl font-heading text-xs font-bold tracking-widest hover:bg-coffee-500 hover:text-coffee-900 transition-colors"
            >
              BROWSE ROASTS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Side: Items List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 md:gap-6 p-4 rounded-2xl bg-white border border-coffee-200/40 relative shadow-sm"
                >
                  {/* Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-coffee-100 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-base font-bold text-coffee-900">{item.product.name}</h4>
                      <div className="flex gap-2 text-xxs text-coffee-600 mt-1 font-mono">
                        <span className="bg-coffee-50 px-2 py-0.5 rounded-full border border-coffee-200/20">{item.weight}</span>
                        <span className="bg-coffee-50 px-2 py-0.5 rounded-full border border-coffee-200/20">{item.grind}</span>
                      </div>
                    </div>

                    {/* Quantity selectors and price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-coffee-200 rounded-lg bg-coffee-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1.5 hover:bg-coffee-200 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-coffee-800" />
                        </button>
                        <span className="px-3.5 text-xs font-mono font-medium text-coffee-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1.5 hover:bg-coffee-200 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-coffee-800" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-bold text-coffee-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="absolute top-4 right-4 text-coffee-300 hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary Panel */}
            <div className="lg:col-span-1 flex flex-col gap-6 bg-white/40 p-6 rounded-2xl border border-coffee-200/30 glass-card">
              <h2 className="font-heading text-lg font-bold text-coffee-900">Order Summary</h2>

              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-white text-xs px-3 py-2.5 rounded-lg border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono"
                />
                <button
                  type="submit"
                  className="bg-coffee-800 hover:bg-coffee-700 text-coffee-50 text-xs uppercase px-4 rounded-lg font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {coupon ? (
                <div className="flex justify-between items-center bg-green-50 text-green-800 text-xs px-3 py-2 rounded-lg border border-green-200 font-mono">
                  <span>Coupon: {coupon.code} Applied</span>
                  <button onClick={removeCoupon} className="text-green-600 font-bold underline ml-2">Remove</button>
                </div>
              ) : (
                promoMessage && <p className="text-xxs font-mono text-coffee-600">{promoMessage}</p>
              )}

              {/* Calculation Breakdown */}
              <div className="flex flex-col gap-2 border-t border-coffee-200/30 pt-4 text-xs text-coffee-700 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount (20%)</span>
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

              {/* Checkout Call to Action */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-coffee-500 text-coffee-900 hover:bg-coffee-700 hover:text-coffee-50 py-4 rounded-xl font-heading text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
