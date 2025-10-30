import Link from 'next/link';
import Image from 'next/image';

import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Assuming a discount for demonstration. In a real app, this would come from the product data.
  const discountPercentage = 49;
  const discountedPrice = product.price * (1 - discountPercentage / 100);

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow hover:shadow-lg group border-none rounded-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-[4/5] relative rounded-lg">
          <Image
            src={product.images[0].imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.images[0].imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-3 flex-grow flex flex-col items-center text-center">
        <CardTitle className="text-xs font-medium leading-tight flex-grow uppercase text-muted-foreground">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
        <div className="flex items-baseline gap-2 mt-2">
            <p className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(2)}</p>
            <p className="text-sm font-semibold text-foreground">₹{discountedPrice.toFixed(2)}</p>
            <Badge variant="destructive" className="bg-red-500 text-white">-{discountPercentage}%</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
