import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose }) => {
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
    removeCoupon,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode) return;
    const result = applyCoupon(promoCode);
    if (result.success) {
      setPromoSuccess(result.message);
      setPromoError('');
      setPromoCode('');
    } else {
      setPromoError(result.message);
      setPromoSuccess('');
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-coffee-50 z-[100] shadow-2xl flex flex-col border-l border-coffee-200/20"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-coffee-500 w-5 h-5" />
                <h2 className="font-heading text-xl font-bold text-coffee-900">Your Roast Selection</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-coffee-200/40 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-coffee-900" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <span className="text-5xl">☕</span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-coffee-900 mb-1">Your cart is empty</h3>
                    <p className="text-sm text-coffee-600 font-light">Explore our premium roasts and add fresh beans to your cart.</p>
                  </div>
                  <button
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="mt-2 bg-coffee-800 text-coffee-50 px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-coffee-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-coffee-200/40 relative shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Product Thumbnail */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-coffee-100 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-coffee-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xxs text-coffee-600 mt-1">
                          <span className="bg-coffee-100 px-2 py-0.5 rounded-full font-mono">{item.weight}</span>
                          <span className="bg-coffee-100 px-2 py-0.5 rounded-full">{item.grind}</span>
                        </div>
                      </div>

                      {/* Quantity adjusting and price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-coffee-200 rounded-lg bg-coffee-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1.5 hover:bg-coffee-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 text-coffee-800" />
                          </button>
                          <span className="px-3 text-xs font-mono font-medium text-coffee-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1.5 hover:bg-coffee-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 text-coffee-800" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-semibold text-coffee-800">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="absolute top-4 right-4 text-coffee-200 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary & Coupon Input */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-coffee-200/60 shadow-[0_-8px_32px_rgba(45,22,6,0.03)] flex flex-col gap-4">
                {/* Coupon Code section */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (e.g. NIRBREW20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-coffee-50 text-xs px-3 py-2.5 rounded-lg border border-coffee-200 focus:outline-none focus:border-coffee-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-coffee-800 hover:bg-coffee-700 text-coffee-50 text-xs uppercase px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {coupon ? (
                  <div className="flex justify-between items-center bg-green-50 text-green-800 text-xs px-3 py-2 rounded-lg border border-green-200 font-mono">
                    <span>Coupon: <strong>{coupon.code}</strong> Applied</span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-900 font-bold underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    {promoError && <p className="text-red-500 text-xxs">{promoError}</p>}
                    {promoSuccess && <p className="text-green-500 text-xxs">{promoSuccess}</p>}
                  </>
                )}

                {/* Subtotal calculations */}
                <div className="flex flex-col gap-2 border-t border-coffee-100 pt-3 text-xs text-coffee-700">
                  <div className="flex justify-between font-mono">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-mono">
                      <span>Discount (20% off)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-mono">
                    <span>GST (5%)</span>
                    <span>₹{taxAmount}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Shipping</span>
                    <span>{shippingAmount === 0 ? 'FREE' : `₹${shippingAmount}`}</span>
                  </div>
                  <div className="flex justify-between font-mono text-base font-bold text-coffee-900 border-t border-coffee-100 pt-2">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-coffee-500 text-coffee-900 hover:bg-coffee-700 hover:text-coffee-50 py-4 rounded-xl font-heading text-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
