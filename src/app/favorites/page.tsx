import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">My Wishlist</h1>
       <div className="border rounded-lg bg-card">
          <div className="flex flex-col items-center justify-center text-center h-96">
              <Heart className="h-20 w-20 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">Your wishlist is empty</h3>
              <p className="mt-2 text-muted-foreground">Add products to your wishlist to see them here.</p>
          </div>
      </div>
    </div>
  );
}
