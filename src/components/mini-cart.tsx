'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, X } from 'lucide-react';
import { PopoverClose } from '@radix-ui/react-popover';

export function MiniCart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
      </div>
      {cart.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-16 rounded-md overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-sm leading-tight">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} &times; ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                     <p className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PopoverClose asChild>
                <Button asChild variant="outline">
                  <Link href="/cart">View Cart</Link>
                </Button>
              </PopoverClose>
               <PopoverClose asChild>
                <Button asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
               </PopoverClose>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
           <PopoverClose asChild>
             <Button asChild className="mt-4">
                <Link href="/products">Continue Shopping</Link>
             </Button>
           </PopoverClose>
        </div>
      )}
    </div>
  );
}
