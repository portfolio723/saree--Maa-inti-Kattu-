// src/app/orders/[id]/page.tsx
import OrderTrackingPage from './OrderTrackingClient';

export default function Page({ params }: { params: { id: string } }) {
  return <OrderTrackingPage id={params.id} />;
}
