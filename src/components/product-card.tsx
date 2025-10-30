import Link from 'next/link';
import Image from 'next/image';

import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * 0.7;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg group">
      <CardHeader className="p-0 border-b">
        <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-[4/5] relative">
          <Image
            src={product.images[0].imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.images[0].imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-3 flex-grow flex flex-col">
        <CardTitle className="text-sm font-normal leading-tight flex-grow">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
        <div className="flex items-baseline gap-2 mt-2">
            <p className="text-base font-semibold text-primary">${discountedPrice.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
