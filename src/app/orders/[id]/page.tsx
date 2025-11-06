// src/app/orders/[id]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
// Import your order data/components as needed
// import { orders } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{ 
    id: string; 
  }>;
}

export default async function OrderTrackingPage({ params }: PageProps) {
  // IMPORTANT: Await the params Promise
  const { id } = await params;

  // Your logic here - example:
  // const order = orders.find(o => o.id === id);
  // if (!order) {
  //   notFound();
  // }

  return (
    <div className="container pt-24 md:pt-28 pb-8 md:pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Order Tracking</h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">Track your order #{id}</p>
      </div>
      
      {/* Your order tracking content here */}
    </div>
  );
}
