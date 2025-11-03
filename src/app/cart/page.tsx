'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-1">
                          <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary text-sm md:text-base">{item.name}</Link>
                          <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-semibold text-sm md:text-base">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <p className="font-semibold text-sm md:text-base text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
               <CardFooter className="p-4 justify-between">
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center h-64">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                  <h3 className="mt-4 text-lg md:text-xl font-semibold">Your cart is empty</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">Add items to your cart to see them here.</p>
                  <Button asChild className="mt-4">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-lg md:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span>Shipping</span>
                <span className="text-sm text-muted-foreground">Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base md:text-lg">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={cart.length === 0}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
