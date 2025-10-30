import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Plus, Minus } from 'lucide-react';
import { products, reviews } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { ReviewCard } from '@/components/review-card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <Image
                      src={image.imageUrl}
                      alt={`${product.name} - view ${index + 1}`}
                      width={600}
                      height={750}
                      className="aspect-[4/5] w-full object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-foreground/80">{product.longDescription}</p>
          <p className="text-3xl font-semibold text-primary">₹{product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center text-lg font-semibold">1</span>
              <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">Add to Cart</Button>
          </div>
          <p className="text-sm text-green-600">{product.inventory} in stock</p>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Write a Review</CardTitle>
              <CardDescription>Share your thoughts about this product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Label>Rating:</Label>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button key={i}><Star className="h-6 w-6 text-gray-300 hover:text-accent transition-colors" /></button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-text">Your Review</Label>
                <Textarea id="review-text" placeholder="What did you like or dislike?" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">Submit Review</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
