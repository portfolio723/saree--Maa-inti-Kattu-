
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product-card';

export default function ExclusivePage() {
  const exclusiveProducts = products.filter(p => p.category === 'Exclusive');

  return (
    <div className="container py-24 md:py-28">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Exclusive Collections</h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">Discover our most unique and limited-edition handcrafted sarees.</p>
      </div>

      {exclusiveProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exclusiveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="border rounded-lg bg-card">
          <div className="flex flex-col items-center justify-center text-center h-96">
              <h3 className="mt-4 text-xl font-semibold">Coming Soon</h3>
              <p className="mt-2 text-muted-foreground">Our exclusive collections will be available here shortly.</p>
          </div>
      </div>
      )}
    </div>
  );
}
