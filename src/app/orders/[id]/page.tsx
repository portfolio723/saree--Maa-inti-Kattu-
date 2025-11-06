import OrderTrackingClient from './OrderTrackingClient';
import { products } from '@/lib/mock-data';

// This function generates the static pages for each order at build time.
// In a real app, you would fetch this from your database.
export async function generateStaticParams() {
  // For demonstration, we'll create pages for a few mock order IDs.
  // In a real application, you might pre-render recent or important orders.
  return [
    { id: 'mock-ord-1' },
    { id: 'mock-ord-2' },
    // You can add more mock order IDs here if needed
  ];
}


export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  return <OrderTrackingClient id={params.id} />;
}
