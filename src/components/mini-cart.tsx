"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

export function MiniCart() {
  const { cart, removeFromCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
      </div>
      <Separator />
      {cart.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden">
                     <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="p-4 space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
                <Button asChild className="w-full">
                    <Link href="/cart">View Cart</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                    <Link href="/checkout">Checkout</Link>
                </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <p className="text-muted-foreground">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}