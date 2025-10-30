import { Package } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">My Orders</h1>
       <div className="border rounded-lg bg-card">
          <div className="flex flex-col items-center justify-center text-center h-96">
              <Package className="h-20 w-20 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No orders yet</h3>
              <p className="mt-2 text-muted-foreground">You haven't placed any orders with us yet. Start shopping to see your orders here.</p>
          </div>
      </div>
    </div>
  );
}
