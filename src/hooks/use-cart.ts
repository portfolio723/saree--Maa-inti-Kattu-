'use client';
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  addToCart: (item, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter((item) => item.id !== id) };
      }
      return {
        cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
      };
    }),
  clearCart: () => set({ cart: [] }),
}));
