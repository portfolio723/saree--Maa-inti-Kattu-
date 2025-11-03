'use client';

import { Heart, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';

export default function FavoritesPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  
  const wishlistedProducts = products.filter(p => wishlist.some(w => w.id === p.id));

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">My Wishlist</h1>
      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border rounded-lg bg-card">
          <div className="flex flex-col items-center justify-center text-center h-96">
            <Heart className="h-20 w-20 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">Your wishlist is empty</h3>
            <p className="mt-2 text-muted-foreground">Add products to your wishlist to see them here.</p>
            <Button asChild className="mt-4">
                <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
