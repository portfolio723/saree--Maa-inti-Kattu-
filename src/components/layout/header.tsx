"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, Heart, User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MiniCart } from "@/components/mini-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { SearchOverlay } from "@/components/search-overlay";
import { cn } from "@/lib/utils";
import { useAuth } from "@/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user } = useUser();
  const auth = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Sarees" },
    { href: "/products", label: "New Arrivals" },
    { href: "/combos", label: "Combo Offers" },
    { href: "/blouses", label: "Blouses" },
    { href: "/exclusive", label: "Exclusive collections" },
  ];
  
  const handleLogout = () => {
    auth.signOut();
  };
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <>
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 transition-all duration-300",
          isScrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      )}>
        <div className="flex items-center flex-1 md:flex-initial">
          <Link href="/" className="flex items-center">
            <Image src="https://miro.medium.com/v2/resize:fit:246/format:webp/1*pHF5KzQmHRkpZQ7-ntgZ8w.png" alt="Lazywear India - online store for comfortable and affordable casual wear" width={100} height={40} className={cn("object-contain", !isScrolled && "brightness-0 invert")} />
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6 flex-1">
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
                    isScrolled ? "bg-destructive text-destructive-foreground" : "bg-white text-black"
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
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
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
                        isScrolled ? "bg-black text-white" : "bg-white text-black"
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
                   <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                      <Image src="https://miro.medium.com/v2/resize:fit:246/format:webp/1*pHF5KzQmHRkpZQ7-ntgZ8w.png" alt="Lazywear India - Comfortable Clothing Store Logo" width={100} height={40} className="object-contain" />
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
                    <Link key={link.label} href={link.href} className="text-lg font-semibold tracking-wider uppercase hover:text-primary/70 transition-colors" onClick={() => setMenuOpen(false)}>
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
