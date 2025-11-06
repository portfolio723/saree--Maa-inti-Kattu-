
// src/app/orders/[id]/page.tsx
import OrderTrackingClient from './OrderTrackingClient';

export default function Page({ params }: { params: { id: string } }) {
  return <OrderTrackingClient id={params.id} />;
}
