import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center h-64">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                    <h3 className="mt-4 text-xl font-semibold">Your cart is empty</h3>
                    <p className="mt-2 text-muted-foreground">Add items to your cart to see them here.</p>
                    <Button asChild className="mt-4">
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹0.00</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled>Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
