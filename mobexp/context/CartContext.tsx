import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as cartService from '@/services/cartService';
import { useAuth } from './AuthContext';

export type CartItem = {
  id: string;
  title: string;
  qty: number;
};


type CartContextType = {
  items: CartItem[];
  count: number;
  loading: boolean;
  add: (id: string, title: string) => Promise<void>;
  inc: (id: string) => Promise<void>;
  dec: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuth) {
      loadCart();
    } else {
      // Clear cart when user logs out
      setItems([]);
      setCount(0);
    }
  }, [isAuth]);

  const loadCart = async () => {
    if (!isAuth) return;
    
    try {
      setLoading(true);
      const response = await cartService.getCart();
      if (response.success && response.data) {
        // Transform backend cart items to match frontend format
        const transformedItems = response.data.items.map(item => ({
          id: item.product_id,
          title: item.product_title,
          qty: item.quantity,
        }));
        setItems(transformedItems);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const add = useCallback(async (id: string, title: string) => {
    if (!isAuth) {
      console.warn('User must be logged in to add items to cart');
      return;
    }
    
    try {
      setLoading(true);
      const response = await cartService.addToCart(id, title);
      if (response.success && response.data) {
        const transformedItems = response.data.items.map(item => ({
          id: item.product_id,
          title: item.product_title,
          qty: item.quantity,
        }));
        setItems(transformedItems);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuth]);

  const inc = useCallback(async (id: string) => {
    if (!isAuth) return;
    
    try {
      setLoading(true);
      const response = await cartService.incrementItem(id);
      if (response.success && response.data) {
        const transformedItems = response.data.items.map(item => ({
          id: item.product_id,
          title: item.product_title,
          qty: item.quantity,
        }));
        setItems(transformedItems);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error('Error incrementing item:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuth]);

  const dec = useCallback(async (id: string) => {
    if (!isAuth) return;
    
    try {
      setLoading(true);
      const response = await cartService.decrementItem(id);
      if (response.success && response.data) {
        const transformedItems = response.data.items.map(item => ({
          id: item.product_id,
          title: item.product_title,
          qty: item.quantity,
        }));
        setItems(transformedItems);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error('Error decrementing item:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuth]);

  const remove = useCallback(async (id: string) => {
    if (!isAuth) return;
    
    try {
      setLoading(true);
      const response = await cartService.removeItem(id);
      if (response.success && response.data) {
        const transformedItems = response.data.items.map(item => ({
          id: item.product_id,
          title: item.product_title,
          qty: item.quantity,
        }));
        setItems(transformedItems);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuth]);

  const clear = useCallback(async () => {
    if (!isAuth) return;
    
    try {
      setLoading(true);
      const response = await cartService.clearCart();
      if (response.success) {
        setItems([]);
        setCount(0);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuth]);

  const refresh = useCallback(async () => {
    await loadCart();
  }, [isAuth]);

  const value = {
    items,
    count,
    loading,
    add,
    inc,
    dec,
    remove,
    clear,
    refresh,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
