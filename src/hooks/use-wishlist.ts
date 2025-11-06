"use client"
import { create } from 'zustand';
import { getImagePath } from '@/lib/paths';

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
  addToWishlist: (item) => set((state) => ({ wishlist: [...state.wishlist, { ...item, image: item.image.startsWith('http') ? item.image : getImagePath(item.image) }] })),
  removeFromWishlist: (id) => set((state) => ({ wishlist: state.wishlist.filter((item) => item.id !== id) })),
  isInWishlist: (id) => get().wishlist.some((item) => item.id === id),
}));
