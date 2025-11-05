
'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ProductImageGalleryProps {
  images: ImagePlaceholder[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <Card className="aspect-[4/5] w-full flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">No image available</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4">
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <div
            key={image.id + index}
            className={cn(
              'aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-md border-2',
              selectedImage.imageUrl === image.imageUrl ? 'border-primary' : 'border-transparent'
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.imageUrl}
              alt={`${image.description} - thumbnail ${index + 1}`}
              width={80}
              height={100}
              className="h-full w-full object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        ))}
      </div>
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
        <Image
          src={selectedImage.imageUrl}
          alt={selectedImage.description}
          width={600}
          height={750}
          className="h-full w-full object-cover transition-opacity duration-300"
          data-ai-hint={selectedImage.imageHint}
          priority
        />
      </div>
    </div>
  );
}
