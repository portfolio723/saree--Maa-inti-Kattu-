'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].imageUrl,
      });
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].imageUrl,
    });
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    });
  }

  const discountPercentage = 49;
  const discountedPrice = product.price * (1 - discountPercentage / 100);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg group border-none">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-[4/5] relative">
          <Image
            src={product.images[0].imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.images[0].imageHint}
          />
           <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
            onClick={handleWishlistClick}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-4 w-4", isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-500')} />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-3 flex-grow flex flex-col items-start text-left">
        <CardTitle className="text-xs font-medium leading-tight flex-grow uppercase text-muted-foreground">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
        <div className="flex items-baseline gap-2 mt-2">
            <p className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(2)}</p>
            <p className="text-sm font-semibold text-foreground">₹{discountedPrice.toFixed(2)}</p>
            <Badge variant="destructive" className="bg-red-500 text-white">-{discountPercentage}%</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
