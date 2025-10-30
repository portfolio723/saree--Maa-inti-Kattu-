import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, Package, ShieldCheck } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: 'Authentic Quality',
      description: 'Handpicked items that represent the pinnacle of traditional craftsmanship.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-accent" />,
      title: 'Secure Payments',
      description: 'Shop with confidence using our secure and reliable payment gateway.',
    },
    {
      icon: <Package className="h-8 w-8 text-accent" />,
      title: 'Worldwide Shipping',
      description: 'We deliver the essence of tradition to your doorstep, wherever you are.',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Traditional Indian celebration background"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-foreground p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight text-primary shadow-sm">
            Embrace Your Heritage
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
            Discover a curated collection of authentic, handcrafted treasures that tell a story of culture and tradition.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-primary mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center p-6 bg-background">
                <CardContent className="flex flex-col items-center gap-4">
                  {feature.icon}
                  <h3 className="text-xl font-headline font-semibold text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
