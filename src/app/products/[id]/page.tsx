
import { notFound } from 'next/navigation';
import { products, reviews } from '@/lib/mock-data';
import { Separator } from '@/components/ui/separator';
import { ReviewCard } from '@/components/review-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { ProductDetailsClient } from './product-details-client';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      
      <ProductDetailsClient product={product} />

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
              <CardTitle className="font-headline text-xl md:text-2xl">Write a Review</CardTitle>
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
