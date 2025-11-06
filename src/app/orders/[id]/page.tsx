import React from 'react';
import { notFound } from 'next/navigation';
// Assuming you have an orders array in your mock data
// import { orders } from '@/lib/mock-data';

// ✅ ADD THIS: Generate static params for all orders
export async function generateStaticParams() {
  // If you have mock orders, do this:
  // return orders.map((order) => ({
  //   id: order.id,
  // }));
  
  // If orders are dynamic or not available at build time, use empty array
  return [];
}

export default async function OrderTrackingPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
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
