
// src/app/orders/[id]/page.tsx
import OrderTrackingClient from './OrderTrackingClient';

// This function generates a few static pages at build time for demonstration.
export async function generateStaticParams() {
  return [
    { id: 'mock-ord-1' },
    { id: 'mock-ord-2' },
    { id: `ORD-${Date.now()}` }, // Example for confirmation page link
  ];
}


interface PageProps {
  params: { 
    id: string; 
  };
}

export default function OrderPage({ params }: PageProps) {
  const { id } = params;
  return <OrderTrackingClient id={id} />;
}
