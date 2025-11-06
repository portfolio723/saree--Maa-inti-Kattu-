import React from 'react';
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
import { ProductCard } from '@/components/product-card';

export const generateStaticParams = async () => {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
};

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  return (
    <div className="container pt-24 md:pt-28 pb-8 md:pb-12">
      <ProductDetailsClient product={product} />

      <Separator className="my-12" />

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6 text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6">
            Customer Reviews ({product.reviewCount})
          </h2>
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
                    <button key={i}>
                      <Star className="h-6 w-6 text-gray-300 hover:text-accent transition-colors" />
                    </button>
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
