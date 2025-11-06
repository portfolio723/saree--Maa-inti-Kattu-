
// src/app/orders/[id]/page.tsx
import OrderTrackingClient from './OrderTrackingClient';

interface PageProps {
  params: { 
    id: string; 
  };
}

export default function OrderPage({ params }: PageProps) {
  const { id } = params;
  return <OrderTrackingClient id={id} />;
}
