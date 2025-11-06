import React from 'react';
import { notFound } from 'next/navigation';
// Import your order-related components and data as needed
// import { orders } from '@/lib/mock-data';
// import { OrderDetailsClient } from './order-details-client';

export default async function OrderTrackingPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // ✅ CORRECT: Await the params
  const { id } = await params;

  // Your order logic here
  // const order = orders.find(o => o.id === id);
  // if (!order) {
  //   notFound();
  // }

  return (
    <div className="container pt-24 md:pt-28 pb-8 md:pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Order Tracking
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Track your order #{id}
        </p>
      </div>

      {/* Your order tracking content here */}
      <div className="bg-slate-50 p-8 rounded-lg">
        <p className="text-center text-muted-foreground">
          Order details for ID: {id}
        </p>
      </div>
    </div>
  );
}
