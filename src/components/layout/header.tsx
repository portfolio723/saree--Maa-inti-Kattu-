"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, Heart, User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MiniCart } from "@/components/mini-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { SearchOverlay } from "@/components/search-overlay";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

// Mock user data for static site
const useUser = () => {
    const [user, setUser] = useState<{
        displayName: string | null;
        email: string | null;
        photoURL: string | null;
    } | null>(null);

    // On mount, check if a "user" is "logged in" via localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn')) {
            setUser({
                displayName: 'Jane Doe',
                email: 'jane.doe@example.com',
                photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjE4MDM0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            });
        }
    }, []);

    // Function to simulate login
    const login = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('isLoggedIn', 'true');
            setUser({
                displayName: 'Jane Doe',
                email: 'jane.doe@example.com',
                photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjE4MDM0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            });
        }
    };

    // Function to simulate logout
    const logout = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('isLoggedIn');
            setUser(null);
        }
    };
    
    return { user, login, logout };
};


export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isHeaderOpaque, setHeaderOpaque] = useState(false);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setHeaderOpaque(window.scrollY > 10);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setHeaderOpaque(true);
    }
  }, [pathname, isHomePage]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { href: "/products", label: "Sarees" },
    { href: "/products", label: "New Arrivals" },
    { href: "/combos", label: "Combo Offers" },
    { href: "/blouses", label: "Blouses" },
    { href: "/exclusive", label: "Exclusive collections" },
  ];

  return (
    <>
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 transition-all duration-300",
          isHeaderOpaque ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      )}>
        <div className="flex items-center flex-1 md:flex-initial">
          <Link href="/" className="flex items-center">
            <Image src="/mik.png" alt="Maa Inti Kattu" width={100} height={40} className="object-contain h-10" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-1">
          {navLinks.map(link => (
             <Link key={link.label} href={link.href} className="text-sm font-semibold tracking-wider uppercase hover:text-primary/70 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1 md:flex-initial">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search products" className="hover:bg-white/20">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-white/20">
            <Link href="/favorites">
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className={cn(
                    "absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs",
                    isHeaderOpaque ? "bg-destructive text-destructive-foreground" : "bg-white text-black"
                  )}>
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/20 rounded-full">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'User'} />
                     <AvatarFallback className={cn("bg-transparent border", isHeaderOpaque ? "border-black text-black": "border-white text-white")}>
                       {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                     </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild className="hover:bg-white/20">
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-white/20">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                     <span className={cn(
                        "absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs",
                        isHeaderOpaque ? "bg-black text-white" : "bg-white text-black"
                      )}>
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <MiniCart />
            </PopoverContent>
          </Popover>

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-white p-0">
                <SheetHeader className="flex flex-row justify-between items-center p-4 border-b">
                   <Link href="/" className="flex items-center text-lg md:text-xl font-bold font-headline" onClick={() => setMenuOpen(false)}>
                      <Image src="/mik.png" alt="Maa Inti Kattu" width={100} height={40} className="object-contain h-10" />
                  </Link>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <nav className="flex flex-col items-start gap-6 p-4">
                  {navLinks.map(link => (
                    <Link key={link.label} href={link.href} className="text-base font-semibold tracking-wider uppercase hover:text-primary/70 transition-colors" onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
