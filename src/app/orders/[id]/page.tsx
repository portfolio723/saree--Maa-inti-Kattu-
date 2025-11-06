import React from 'react';
import { notFound } from 'next/navigation';

// ✅ REQUIRED: Generate static params (even if empty for now)
export const generateStaticParams = async () => {
  // If you have mock orders data:
  // import { orders } from '@/lib/mock-data';
  // return orders.map((order) => ({
  //   id: order.id.toString(),
  // }));

  // For now, return empty array (no pre-generated pages)
  return [];
};

export default async function OrderTrackingPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

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

      <div className="bg-slate-50 p-8 rounded-lg">
        <p className="text-center text-muted-foreground">
          Order details for ID: {id}
        </p>
      </div>
    </div>
  );
}
