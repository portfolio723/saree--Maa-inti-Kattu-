import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden">
          <Image
            src={product.images[0].imageUrl}
            alt={product.name}
            width={400}
            height={500}
            className="aspect-[4/5] w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={product.images[0].imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
          <span>({product.reviewCount})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
        <Button asChild>
          <Link href={`/products/${product.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
