import type { ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: ImagePlaceholder[];
  category: string;
  rating: number;
  reviewCount: number;
  inventory: number;
};

export type Review = {
  id: string;
  author: string;
  avatar: ImagePlaceholder;
  rating: number;
  title: string;
  text: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  orderDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: CartItem[];
};
