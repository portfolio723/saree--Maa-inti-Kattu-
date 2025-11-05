'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import type { CartItem, Address } from '@/lib/types';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface OrderDetails {
  orderId: string;
  items: CartItem[];
  shippingAddress: Address;
  total: string;
}

function ConfirmationContent() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
      // Optional: Clean up localStorage after reading to prevent re-showing old order details.
      // localStorage.removeItem('lastOrder'); 
    } else {
      // If no order details are found, redirect to home.
      router.replace('/');
    }
  }, [router]);

  if (!orderDetails) {
    return <div className="container flex justify-center items-center h-screen"><p>Loading Confirmation...</p></div>;
  }

  const { orderId, items, shippingAddress, total } = orderDetails;

  return (
    <div className="container py-24 md:py-28">
      <Card className="w-full max-w-2xl mx-auto p-4 md:p-8">
        <CardHeader className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl md:text-3xl font-bold font-headline text-primary">Thank you for your order!</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">Your order has been placed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
             <p className="text-lg font-semibold">
                Order ID: <span className="text-primary">#{orderId}</span>
             </p>
             <p className="text-sm text-muted-foreground">An email confirmation will be sent to {shippingAddress.email}.</p>
          </div>
          
          <Separator />

          <div>
             <h3 className="font-semibold mb-2">Items Ordered</h3>
             <div className="space-y-4">
                {items.map(item => (
                     <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                             <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
             </div>
          </div>
          
          <Separator />
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping To</h3>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{shippingAddress.fullName}</p>
                <p>{shippingAddress.addressLine1}</p>
                {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                <p>Mobile: {shippingAddress.mobileNumber}</p>
              </div>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Order Total</h3>
              <p className="text-2xl font-bold">₹{total}</p>
              <p className="text-sm text-muted-foreground mt-1">
                You will receive an invoice via email shortly. For support, contact <a href="mailto:visit@maaintikattu.com" className="text-primary hover:underline">visit@maaintikattu.com</a>.
              </p>
            </div>
          </div>
          
          <Separator />

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild>
              <Link href={`/orders/${orderId}`}>Track Your Order</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationContent />
        </Suspense>
    )
}
