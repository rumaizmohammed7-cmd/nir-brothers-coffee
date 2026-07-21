import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('nir_coffee_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem('nir_coffee_coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  useEffect(() => {
    localStorage.setItem('nir_coffee_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('nir_coffee_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('nir_coffee_coupon');
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1, grind = 'Filter Fine', weight = '250g') => {
    setCart((prevCart) => {
      // Create a unique key for item combining product ID, grind, and weight
      const cartItemId = `${product.id}-${grind.replace(/\s+/g, '')}-${weight}`;
      
      const existingItemIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            quantity,
            grind,
            weight,
            priceAtAdd: product.price, // in case price changes
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const formattedCode = code.toUpperCase().trim();
    if (formattedCode === 'NIRBREW20') {
      setCoupon({ code: 'NIRBREW20', discount: 20 }); // 20% off
      return { success: true, message: '20% discount applied successfully!' };
    } else if (formattedCode === 'FREESHIP') {
      setCoupon({ code: 'FREESHIP', discount: 0, freeShipping: true });
      return { success: true, message: 'Free shipping applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try NIRBREW20' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  const discountAmount = coupon && coupon.discount 
    ? Math.round(subtotal * (coupon.discount / 100)) 
    : 0;

  const taxAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST

  const isFreeShippingApplied = (coupon && coupon.freeShipping) || subtotal >= 500;
  const shippingAmount = cart.length === 0 ? 0 : (isFreeShippingApplied ? 0 : 49);

  const total = subtotal - discountAmount + taxAmount + shippingAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discountAmount,
        taxAmount,
        shippingAmount,
        total,
        coupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
