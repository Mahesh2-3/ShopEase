import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [cart, setCart] = useState({ products: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ products: [], totalAmount: 0 });
      return;
    }
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      // Silently ignore - cart will just appear empty
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (productId, quantity = 1) => {
    try {
      const data = await cartService.addToCart(productId, quantity);
      setCart(data);
      showToast('Added to cart', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not add to cart', 'error');
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const data = await cartService.updateCartItem(productId, quantity);
      setCart(data);
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not update cart', 'error');
    }
  };

  const removeItem = async (productId) => {
    try {
      const data = await cartService.removeCartItem(productId);
      setCart(data);
      showToast('Item removed', 'info');
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not remove item', 'error');
    }
  };

  const clear = async () => {
    try {
      const data = await cartService.clearCart();
      setCart(data);
    } catch (error) {
      showToast('Could not clear cart', 'error');
    }
  };

  const itemCount = cart.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{ cart, loading, itemCount, refreshCart, addItem, updateItem, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
