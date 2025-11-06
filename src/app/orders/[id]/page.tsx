
import OrderTrackingClient from './OrderTrackingClient';
import { orders } from '@/lib/mock-data';

// Required for static export
export async function generateStaticParams() {
  return orders.map((order) => ({
    id: order.id,
  }));
}

// This page remains a server component to handle params.
export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  // We pass the ID to the client component which will handle data fetching.
  return <OrderTrackingClient id={params.id} />;
}
