
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Star, Plus, Minus, Heart, Truck, CreditCard, Facebook, Twitter, Linkedin, HelpCircle, Share2 } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { ProductImageGallery } from './product-image-gallery';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const productInfo = {
    "Fabric": "Silk",
    "Border Type": "Contrast Zari",
    "Weave": "Banarasi",
    "Blouse Included": "Yes",
    "Blouse Fabric": "SILK",
    "Blouse Type": "ATTACHED WITH SAREE",
    "Size": "Na"
};

export function ProductDetailsClient({ product }: { product: Product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
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

  const handleAddToCart = () => {
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].imageUrl,
    }, quantity);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Product link copied to clipboard.',
      });
    }
  };
  
  const discountPercentage = 40;
  const discountedPrice = product.price * (1 - discountPercentage / 100);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <ProductImageGallery images={product.images} />
      
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold font-headline text-primary">{product.name}</h1>
        
        <div className='space-y-1'>
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Availability:</span>
                <span className="text-sm font-semibold text-green-600">In Stock</span>
            </div>
            {product.inventory < 10 && <p className="text-sm text-destructive font-semibold">Only {product.inventory} left</p>}
            <p className="text-sm text-muted-foreground">SKU: SKU-{product.id.padStart(6, '0')}</p>
        </div>

        <div className="flex items-center gap-4">
             <p className="text-2xl md:text-3xl font-bold text-destructive">₹{discountedPrice.toFixed(2)}</p>
             <p className="text-xl md:text-2xl font-medium text-muted-foreground line-through">₹{product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-sm text-foreground/80">{product.description}</p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}><Minus className="h-4 w-4" /></Button>
            <span className="w-10 text-center text-lg font-semibold">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q+1)}><Plus className="h-4 w-4" /></Button>
          </div>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white uppercase" onClick={handleAddToCart}>Add to Cart</Button>
          <Button size="lg" variant="outline" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm">
             <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" onClick={handleWishlistClick}>
                <Heart className={cn("h-4 w-4 mr-2", isInWishlist ? 'text-red-500 fill-red-500' : '')} />
                {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
             </Button>
             <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
             </Button>
        </div>

        <Separator className="my-4" />

        <div>
            <h3 className="font-bold text-lg mb-4 font-headline text-primary">More Information</h3>
            <div className="space-y-2 text-sm">
                {Object.entries(productInfo).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2">
                        <span className="font-semibold text-foreground/80">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                    </div>
                ))}
            </div>
        </div>
        
         <Separator className="my-4" />
         
        <div className="space-y-2 text-sm">
             <h3 className="font-bold text-lg mb-4 font-headline text-primary">More Info</h3>
             <p className="text-muted-foreground">Have any Queries? We're here to help!</p>
             <p className="text-muted-foreground">Contact Us: +91-9852985299</p>
             <p className="text-muted-foreground">Email Us: hello@maaintikattu.com</p>
        </div>
        
        <div className="flex gap-8 mt-4">
            <div className="flex items-center gap-2 text-sm">
                <Truck className="h-8 w-8 text-primary" />
                <div>
                    <p className="font-semibold">FREE DELIVERY</p>
                </div>
            </div>
             <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                    <p className="font-semibold">PAYMENT SECURED</p>
                    <p className="text-xs text-muted-foreground">Safe with Our Payment</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
