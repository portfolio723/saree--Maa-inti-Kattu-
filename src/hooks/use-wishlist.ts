"use client"
import { create } from 'zustand';

interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>((set, get) => ({
  wishlist: [],
  addToWishlist: (item) => set((state) => ({ wishlist: [...state.wishlist, item] })),
  removeFromWishlist: (id) => set((state) => ({ wishlist: state.wishlist.filter((item) => item.id !== id) })),
  isInWishlist: (id) => get().wishlist.some((item) => item.id === id),
}));