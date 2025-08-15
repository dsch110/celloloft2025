'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  sku: string;
  title: string;
  price: number;
  quantity: number;
  stripePriceId: string;
  type: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (sku: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
  updateCartQuantity: (sku: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.sku === item.sku);
      if (existing) {
        return prev.map(i => i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (sku: string) => setCart(prev => prev.filter(i => i.sku !== sku));
  const clearCart = () => setCart([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const updateCartQuantity = (sku: string, quantity: number) => {
    setCart(prev => prev.map(i => i.sku === sku ? { ...i, quantity } : i));
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      openCart, 
      closeCart, 
      isCartOpen, 
      updateCartQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
} 