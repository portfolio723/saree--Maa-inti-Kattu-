import Image from 'next/image';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import type { Review } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage 
            src={review.avatar.imageUrl} 
            alt={review.author} 
            data-ai-hint={review.avatar.imageHint}
          />
          <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{review.title}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < review.rating ? 'text-accent fill-accent' : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">by {review.author} on {review.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base text-foreground/80">{review.text}</p>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex items-center justify-between p-4">
        <p className="text-sm text-muted-foreground">Was this review helpful?</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{review.upvotes}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ThumbsDown className="h-4 w-4" />
            <span>{review.downvotes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
