
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/paths';

export default function NewArrivalsPage() {
  const newArrivals = products.slice(0, 12); // Show more products

  const shopByCategoryItems = [
    {
      id: 'category-organza',
      name: 'Organza',
      href: '/products?category=Organza',
    },
    {
      id: 'category-chiffon',
      name: 'Chiffon',
      href: '/products?category=Chiffon',
    },
    {
      id: 'category-cotton',
      name: 'Cotton',
      href: '/products?category=Cotton',
    },
     {
      id: 'collection-banarasi',
      name: 'Banarasi',
      href: '/products?category=Banarasi'
    },
  ];

  return (
    <div className="container py-24 md:py-28">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">New Arrivals</h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">Check out the latest additions to our collection.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="py-12 md:py-16 bg-secondary rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8 font-headline">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {shopByCategoryItems.map((item) => {
              const image = PlaceHolderImages.find(img => img.id === item.id);
              return (
              <Link href={item.href} key={item.id} className="group relative block h-64 md:h-80 overflow-hidden rounded-lg">
                {image && 
                    <Image src={getImagePath(image.imageUrl)} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={image.imageHint ?? ''} />
                }
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-4 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-white font-headline">{item.name}</h3>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <Link href="/products?category=Festive" className="block group">
            <div className="relative overflow-hidden rounded-lg">
                <Image src={getImagePath('/feat-collection.jpg')} alt="Festive Collection" width={1200} height={400} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="indian festival celebration" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline">Festive Collection</h2>
                    <p className="mt-2 md:mt-4 max-w-2xl text-sm md:text-lg">Dazzle this festive season with our exclusive range of handcrafted sarees. Shine bright on every occasion.</p>
                </div>
            </div>
        </Link>
      </section>
    </div>
  );
}
