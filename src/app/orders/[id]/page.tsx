
import OrderTrackingClient from './OrderTrackingClient';

// This page remains a server component to handle params.
export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  // We pass the ID to the client component which will handle data fetching.
  return <OrderTrackingClient id={params.id} />;
}
