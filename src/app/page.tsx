import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const newArrivals = products.slice(0, 5);
  const bestSellers = products.slice(1, 6);

  const collections = [
    { id: 'collection-banarasi', name: 'Banarasi', href: '/products?category=Banarasi' },
    { id: 'collection-work', name: 'Work Sarees', href: '/products?category=Apparel' },
    { id: 'collection-georgette', name: 'Georgette', href: '/products?category=Apparel' },
    { id: 'collection-kancheepuram-2', name: 'Kancheepuram', href: '/products?category=Apparel' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] bg-gray-200">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Pay day sale on sarees"
            fill
            className="object-cover object-center"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
          <div className="max-w-md space-y-4">
             <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight text-white drop-shadow-lg">
                Pay Day Sale
              </h1>
              <p className="text-lg md:text-xl">From 31st Oct to 2nd Nov</p>
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href="/products">Shop Now</Link>
              </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Collection Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
            Shop By Collection
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.map((collection) => {
              const image = PlaceHolderImages.find(img => img.id === collection.id);
              return (
              <Link href={collection.href} key={collection.name} className="group relative block h-64 md:h-96 overflow-hidden rounded-lg">
                {image && 
                    <Image src={image.imageUrl} alt={collection.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={image.imageHint} />
                }
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end p-4 text-center">
                    <h3 className="text-xl font-bold text-white font-headline">{collection.name}</h3>
                    <span className="mt-2 text-sm font-semibold text-white underline">SHOP NOW</span>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </section>
      
      {/* Legacy Section */}
      <section className="py-12 md:py-16">
          <div className="container">
              <div className="grid md:grid-cols-2 gap-8 items-center bg-card p-8 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                      <Image src="https://picsum.photos/seed/legacy-1/400/500" alt="Woman in a white saree" width={400} height={500} className="rounded-lg object-cover w-full h-full aspect-[4/5]" data-ai-hint="woman saree"/>
                      <div className="grid gap-4">
                           <Image src="https://picsum.photos/seed/legacy-2/200/245" alt="Close up of a floral saree" width={200} height={245} className="rounded-lg object-cover w-full h-full" data-ai-hint="floral saree"/>
                           <Image src="https://picsum.photos/seed/legacy-3/200/245" alt="Woman smiling in a saree" width={200} height={245} className="rounded-lg object-cover w-full h-full" data-ai-hint="woman smiling"/>
                      </div>
                  </div>
                  <div className="text-center md:text-left">
                      <h2 className="text-3xl font-headline text-primary italic">Celebrating</h2>
                      <h3 className="text-2xl font-bold mt-2">Kalamandir Over 20 Years Of Legacy Redefined</h3>
                      <p className="mt-4 text-muted-foreground max-w-lg mx-auto md:mx-0">A journey of artistic excellence and cultural preservation. For two decades, Kalamandir has been a platform for traditional and contemporary arts, fostering talent and inspiring creativity. Here's to two decades of dedication, innovation, and artistic pride!</p>
                      <Button variant="link" asChild className="mt-4 text-primary px-0">
                          <Link href="/about">Know More</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8">
            Best Selling Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
