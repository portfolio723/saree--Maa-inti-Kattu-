
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Headset, Truck, Award, ShieldCheck } from 'lucide-react';

const PriceCard = ({ bgColor, title, price, href }: { bgColor: string; title: string; price: string, href: string }) => (
  <Link href={href} className="block group">
    <div className="relative overflow-hidden rounded-lg bg-gray-100/50 p-4 aspect-[3/4] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Sprinkles and Stars */}
      <div className="absolute inset-0">
        {/* Stars */}
        <svg className="absolute w-4 h-4 top-5 left-5 text-teal-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="absolute w-3 h-3 top-20 right-8 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <svg className="absolute w-4 h-4 bottom-16 left-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
         <svg className="absolute w-3 h-3 bottom-8 right-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>

        {/* Dots */}
        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
        <div className="absolute top-4 right-10 w-1 h-1 bg-purple-400 rounded-full"></div>
        <div className="absolute top-16 left-6 w-1 h-1 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-6 left-10 w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
        <div className="absolute bottom-20 right-4 w-1 h-1 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-12 left-20 w-1 h-1 bg-green-400 rounded-full"></div>
      </div>
      
      {/* Arch shape */}
      <div className={`absolute bottom-0 left-0 right-0 h-[90%] rounded-t-full ${bgColor} flex items-center justify-center`}>
        <div className="text-center text-white">
          <p className="text-xl md:text-2xl lg:text-3xl font-headline">{title}</p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold font-headline">{price}</p>
        </div>
      </div>
    </div>
  </Link>
);


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

  const priceRanges = [
    { title: 'Below', price: '₹2000', bgColor: 'bg-green-900', href: '/products?price=2000' },
    { title: 'Below', price: '₹5,000', bgColor: 'bg-purple-900', href: '/products?price=5000' },
    { title: 'Below', price: '₹10,000', bgColor: 'bg-teal-700', href: '/products?price=10000' },
    { title: 'Below', price: '₹15,000', bgColor: 'bg-red-800', href: '/products?price=15000' },
  ];

  const features = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M12 11.13a2.13 2.13 0 1 0-2.66 2.66"/>
          <path d="M15.63 7.5a6.5 6.5 0 1 0-8.13 8.13"/>
        </svg>
      ), 
      text: 'Weavers from across India' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="24" r="19.8"/>
          <circle cx="24" cy="24" r="8"/>
          <path d="m29.8,18.2 2-2c0.2-0.2 0.2-0.5 0-0.7l-1.4-1.4c-0.2-0.2-0.5-0.2-0.7,0l-2,2c-0.2,0.2-0.2,0.5,0,0.7l1.4,1.4c0.2,0.2 0.5,0.2 0.7,0z"/>
          <path d="m18.2,29.8-2,2c-0.2-0.2-0.2-0.5,0,0.7l1.4,1.4c0.2,0.2,0.5,0.2,0.7,0l2-2c0.2-0.2,0.2-0.5,0-0.7l-1.4-1.4c-0.2-0.2-0.5-0.2-0.7,0z"/>
          <path d="m18.2,18.2-2-2c-0.2-0.2-0.5-0.2-0.7,0l-1.4,1.4c-0.2,0.2-0.2,0.5,0,0.7l2,2c0.2,0.2,0.5,0.2,0.7,0l1.4-1.4c0.2-0.2 0.2-0.5,0-0.7z"/>
          <path d="m29.8,29.8 2-2c0.2-0.2,0.5-0.2,0.7,0l1.4,1.4c0.2,0.2,0.2,0.5,0,0.7l-2,2c-0.2,0.2-0.5,0.2-0.7,0l-1.4-1.4c-0.2-0.2-0.2-0.5,0-0.7z"/>
        </svg>
      ),
      text: 'Certified with Silk Mark' 
    },
    { icon: <Headset className="h-10 w-10 text-gray-700" />, text: 'Expert customer support' },
    { icon: <Truck className="h-10 w-10 text-gray-700" />, text: 'Free shipping within India' },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2,2v20h20V2H2z M12,12H4V4h8V12z M20,12h-6V4h6V12z M4,14h8v6H4V14z M14,14h6v6h-6V14z"/>
        </svg>
      ), 
      text: 'Authentic Heritage Looms' 
    },
  ];

  return (
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] bg-gray-200">
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
        <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-background w-full">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {feature.icon}
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Shop by Price Section */}
      <section className="py-12 md:py-16 bg-background w-full">
        <div className="container mx-auto px-4">
           <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8 font-headline">
            Shop by Price
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {priceRanges.map((range) => (
              <PriceCard key={range.price} {...range} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 md:py-16 w-full bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8 font-headline">
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
      <section className="py-12 md:py-16 bg-background w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8 font-headline">
            Shop By Collection
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.map((collection) => {
              const image = PlaceHolderImages.find(img => img.id === collection.id);
              return (
              <Link href={collection.href} key={collection.name} className="group relative block h-64 md:h-96 overflow-hidden">
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
      <section className="py-12 md:py-16 w-full">
          <div className="container mx-auto px-4">
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
                      <h3 className="text-2xl font-bold mt-2 font-headline">Kalamandir Over 20 Years Of Legacy Redefined</h3>
                      <p className="mt-4 text-muted-foreground max-w-lg mx-auto md:mx-0">A journey of artistic excellence and cultural preservation. For two decades, Kalamandir has been a platform for traditional and contemporary arts, fostering talent and inspiring creativity. Here's to two decades of dedication, innovation, and artistic pride!</p>
                      <Button variant="link" asChild className="mt-4 text-primary px-0">
                          <Link href="/about">Know More</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="py-12 md:py-16 w-full bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-8 font-headline">
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
