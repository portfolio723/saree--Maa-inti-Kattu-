
import type { Product, Review, Order } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Package, Zap } from 'lucide-react';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)!;

export const products: Product[] = [
  {
    id: '1',
    name: 'Kanjeevaram Silk Saree',
    description: 'Handwoven with pure mulberry silk and gold zari.',
    longDescription: 'Experience the regal elegance of a handwoven Kanjeevaram silk saree. This masterpiece of craftsmanship features intricate temple borders and peacock motifs, woven with pure mulberry silk and authentic gold zari. Perfect for weddings and grand occasions.',
    price: 250.00,
    images: [findImage('product-1'), findImage('product-1'), findImage('product-1')],
    category: 'Apparel',
    rating: 4.8,
    reviewCount: 120,
    inventory: 15,
  },
  {
    id: '2',
    name: 'Antique Jhumka Earrings',
    description: 'Gold-plated temple jewelry with intricate details.',
    longDescription: 'Adorn yourself with these exquisite antique Jhumka earrings. Inspired by South Indian temple jewelry, they are gold-plated and feature intricate carvings, pearl droplets, and a timeless design that adds a touch of divinity to any traditional attire.',
    price: 85.50,
    images: [findImage('product-2'), findImage('product-2'), findImage('product-2')],
    category: 'Jewelry',
    rating: 4.9,
    reviewCount: 250,
    inventory: 30,
  },
  {
    id: '3',
    name: 'Terracotta Clay Pot',
    description: 'Handmade eco-friendly pot for cooking or decoration.',
    longDescription: 'Embrace tradition with this handmade terracotta clay pot. Ideal for slow-cooking flavorful meals that retain nutrients, or as a rustic decorative piece for your home. Its porous nature ensures even heat distribution.',
    price: 40.00,
    images: [findImage('product-3'), findImage('product-3'), findImage('product-3')],
    category: 'Home Decor',
    rating: 4.6,
    reviewCount: 85,
    inventory: 50,
  },
  {
    id: '4',
    name: 'Organic Turmeric Powder',
    description: 'Aromatic and authentic spice from native farms.',
    longDescription: 'Add a golden touch to your culinary creations with our organic turmeric powder. Sourced directly from native farms, this spice is known for its vibrant color, earthy aroma, and powerful anti-inflammatory properties. A staple in any Indian kitchen.',
    price: 12.99,
    images: [findImage('product-4'), findImage('product-4'), findImage('product-4')],
    category: 'Groceries',
    rating: 4.9,
    reviewCount: 310,
    inventory: 100,
  },
  {
    id: '5',
    name: 'Madhubani Folk Painting',
    description: 'Vibrant and detailed traditional art on handmade paper.',
    longDescription: 'Bring home a piece of Indian heritage with this authentic Madhubani folk painting. Characterized by its complex geometric patterns and vibrant natural colors, this piece depicts tales of mythology and nature. Hand-painted by skilled artisans on handmade paper.',
    price: 120.00,
    images: [findImage('product-5'), findImage('product-5'), findImage('product-5')],
    category: 'Art',
    rating: 4.7,
    reviewCount: 45,
    inventory: 10,
  },
  {
    id: '6',
    name: 'Zari Embroidered Cushion',
    description: 'Luxurious cushion cover with golden thread work.',
    longDescription: 'Elevate your living space with this luxurious cushion cover. Made from rich velvet, it features elaborate Zari embroidery with golden threads, forming intricate paisley and floral patterns. A perfect blend of comfort and opulence.',
    price: 55.00,
    images: [findImage('product-6'), findImage('product-6'), findImage('product-6')],
    category: 'Home Decor',
    rating: 4.8,
    reviewCount: 95,
    inventory: 40,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Priya Sharma',
    avatar: findImage('avatar-1'),
    rating: 5,
    title: 'Absolutely Stunning!',
    text: 'The Kanjeevaram saree exceeded my expectations. The silk is so soft and the zari work is breathtaking. I received so many compliments at the wedding. Worth every penny!',
    createdAt: '2 weeks ago',
    upvotes: 42,
    downvotes: 1,
  },
  {
    id: '2',
    author: 'Rohan Mehta',
    avatar: findImage('avatar-2'),
    rating: 5,
    title: 'Elegant and Authentic',
    text: 'I bought the Jhumka earrings for my wife and she adores them. They look just like the picture, if not better. The craftsmanship is top-notch.',
    createdAt: '1 month ago',
    upvotes: 28,
    downvotes: 0,
  },
  {
    id: '3',
    author: 'Ananya Reddy',
    avatar: findImage('avatar-3'),
    rating: 4,
    title: 'Good quality, but fragile',
    text: 'The terracotta pot is beautiful and cooks dal perfectly. My only concern is that it feels quite fragile, so one has to be very careful. But the taste it imparts is amazing.',
    createdAt: '3 days ago',
    upvotes: 15,
    downvotes: 3,
  },
];

export const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', date: 'by Fri, 7 Nov', cost: 0, icon: Package },
  { id: 'express', name: 'Express Delivery', date: 'by Wed, 5 Nov', cost: 150, icon: Zap },
];


export const orders: Order[] = [
    {
        id: 'mock-ord-1',
        userId: '123',
        orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'delivered',
        totalAmount: 132.99,
        items: [
            {...products[2], quantity: 1, image: products[2].images[0].imageUrl},
            {...products[3], quantity: 1, image: products[3].images[0].imageUrl}
        ],
        shippingAddress: {
            id: 'addr1',
            fullName: 'Jane Doe',
            mobileNumber: '9876543210',
            email: 'jane.doe@example.com',
            pincode: '500081',
            addressLine1: '123 Tech Park',
            addressLine2: 'Hitech City',
            city: 'Hyderabad',
            state: 'Telangana',
            addressType: 'work',
        }
    },
    {
        id: 'mock-ord-2',
        userId: '123',
        orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'shipped',
        totalAmount: 250.00,
        items: [
            {...products[0], quantity: 1, image: products[0].images[0].imageUrl}
        ],
        shippingAddress: {
             id: 'addr1',
            fullName: 'Jane Doe',
            mobileNumber: '9876543210',
            email: 'jane.doe@example.com',
            pincode: '500081',
            addressLine1: '123 Tech Park',
            addressLine2: 'Hitech City',
            city: 'Hyderabad',
            state: 'Telangana',
            addressType: 'work',
        }
    }
];
