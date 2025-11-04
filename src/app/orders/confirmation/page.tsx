'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    // Redirect to home if orderId is missing
    if(typeof window !== 'undefined') {
        router.replace('/');
    }
    return null;
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-lg text-center p-8">
        <CardContent>
          <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-2">Thank you for your order!</h1>
          <p className="text-muted-foreground mb-4">Your order has been placed successfully.</p>
          <p className="text-lg font-semibold mb-6">
            Order ID: <span className="text-primary">#{orderId}</span>
          </p>
          <div className="flex justify-center gap-4">
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
