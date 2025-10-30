
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
    <div className="relative overflow-hidden rounded-lg bg-white p-4 aspect-[3/4] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Confetti and Fireworks */}
      <div className="absolute inset-0">
        {/* Top-left firework */}
        <div className="absolute top-4 left-4 w-12 h-12">
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-50 blur-sm"></div>
          <svg viewBox="0 0 100 100" className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos(i * 30 * Math.PI / 180)} y2={50 + 45 * Math.sin(i * 30 * Math.PI / 180)} stroke="url(#grad1)" strokeWidth="2" />
            ))}
            <defs>
              <linearGradient id="grad1">
                <stop offset="0%" stopColor="rgba(252, 211, 77, 1)" />
                <stop offset="100%" stopColor="rgba(252, 211, 77, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Bottom-right firework */}
         <div className="absolute bottom-4 right-4 w-16 h-16">
           <div className="absolute inset-0 bg-red-400 rounded-full opacity-50 blur-sm"></div>
          <svg viewBox="0 0 100 100" className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos(i * 30 * Math.PI / 180)} y2={50 + 45 * Math.sin(i * 30 * Math.PI / 180)} stroke="url(#grad2)" strokeWidth="2" />
            ))}
             <defs>
              <linearGradient id="grad2">
                <stop offset="0%" stopColor="rgba(248, 113, 113, 1)" />
                <stop offset="100%" stopColor="rgba(248, 113, 113, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Sprinkles */}
        <div className="absolute top-2 right-8 w-1 h-1 bg-red-400 rounded-full"></div>
        <div className="absolute top-12 right-4 w-1 h-1 bg-green-400 rounded-full"></div>
        <div className="absolute top-20 left-10 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-10 left-4 w-1 h-1 bg-yellow-400 rounded-full"></div>
         <div className="absolute bottom-24 right-12 w-1 h-1 bg-purple-400 rounded-full"></div>
      </div>
      
      {/* Arch shape */}
      <div className={`absolute bottom-0 left-0 right-0 h-[90%] rounded-t-full ${bgColor} flex items-center justify-center`}>
        <div className="text-center text-white">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif">{title}</p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif">{price}</p>
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
    { title: 'Below', price: '2000 Rs', bgColor: 'bg-green-900', href: '/products?price=2000' },
    { title: 'Below', price: '5,000 Rs', bgColor: 'bg-purple-900', href: '/products?price=5000' },
    { title: 'Below', price: '10,000 Rs', bgColor: 'bg-teal-700', href: '/products?price=10000' },
    { title: 'Below', price: '15,000 Rs', bgColor: 'bg-red-800', href: '/products?price=15000' },
  ];

  const features = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.2,2.2c-0.1-0.2-0.3-0.2-0.4,0l-1,1.9c-2.3,0.9-4.1,2.4-5.5,4.4C5.1,8.8,5,9.1,5,9.3c0.2,1.9,1.1,3.7,2.5,5.1 c1.4,1.4,3.2,2.3,5.1,2.5c0.2,0,0.5-0.1,0.7-0.2c2-1.3,3.5-3.2,4.4-5.5l1.9-1C19,9.8,19.1,9.3,19,9c-0.5-2.1-1.6-4-3.2-5.5 C14.3,2,12.2,2.2,12.2,2.2z M12,14c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,14,12,14z" />
        </svg>
      ), 
      text: 'Weavers from across India' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" viewBox="0 0 48 48" fill="none">
          <path d="M24,4.2C13.1,4.2,4.2,13.1,4.2,24S13.1,43.8,24,43.8,43.8,34.9,43.8,24S34.9,4.2,24,4.2z M24,40.2 c-9,0-16.2-7.3-16.2-16.2S15,7.8,24,7.8s16.2,7.3,16.2,16.2S33,40.2,24,40.2z" fill="currentColor"/>
          <path d="M24,11.2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,11.2,24,11.2z M24,24.2c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5 S26.8,24.2,24,24.2z" fill="currentColor"/>
          <path d="M29.8,18.2l2-2c0.2-0.2,0.2-0.5,0-0.7l-1.4-1.4c-0.2-0.2-0.5-0.2-0.7,0l-2,2c-0.2,0.2-0.2,0.5,0,0.7l1.4,1.4 C29.3,18.4,29.6,18.4,29.8,18.2z" fill="currentColor"/>
          <path d="M18.2,29.8l-2,2c-0.2-0.2-0.2-0.5,0,0.7l1.4,1.4c0.2,0.2,0.5,0.2,0.7,0l2-2c0.2-0.2,0.2-0.5,0-0.7l-1.4-1.4 C18.7,29.6,18.4,29.6,18.2,29.8z" fill="currentColor"/>
          <path d="M18.2,18.2l-2-2c-0.2-0.2-0.5-0.2-0.7,0l-1.4,1.4c-0.2,0.2-0.2,0.5,0,0.7l2,2c0.2,0.2,0.5,0.2,0.7,0l1.4-1.4 C18.4,18.7,18.4,18.4,18.2,18.2z" fill="currentColor"/>
          <path d="M29.8,29.8l2-2c0.2-0.2,0.5-0.2,0.7,0l1.4,1.4c0.2,0.2,0.2,0.5,0,0.7l-2,2c-0.2,0.2-0.5,0.2-0.7,0l-1.4-1.4 C29.6,30.3,29.6,30,29.8,29.8z" fill="currentColor"/>
        </svg>
      ),
      text: 'Certified with Silk Mark' 
    },
    { icon: <Headset className="h-10 w-10 text-gray-700" />, text: 'Expert customer support' },
    { icon: <Truck className="h-10 w-10 text-gray-700" />, text: 'Free shipping within India' },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,2v20h20V2H2z M12,12H4V4h8V12z M20,12h-6V4h6V12z M4,14h8v6H4V14z M14,14h6v6h-6V14z"/>
        </svg>
      ), 
      text: 'Authentic Heritage Looms' 
    },
  ];

  return (
    <div className="flex flex-col items-center bg-white">
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
        <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
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

      {/* Features Section */}
      <section className="py-12 bg-white w-full">
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
      <section className="py-12 md:py-16 bg-white w-full">
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
      <section className="py-12 md:py-16 bg-white w-full">
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

    