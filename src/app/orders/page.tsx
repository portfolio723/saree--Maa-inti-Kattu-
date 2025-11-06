export default function OrdersPage() {
  return (
    <div className="container pt-24 md:pt-28 pb-8 md:pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Your Orders
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Track and manage your orders
        </p>
      </div>

      <div className="bg-slate-50 p-8 rounded-lg text-center">
        <p className="text-muted-foreground">
          No orders placed yet
        </p>
      </div>
    </div>
  );
}
