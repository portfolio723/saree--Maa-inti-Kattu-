import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from '@/components/icons';

export function Header() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/orders', label: 'My Orders' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Mobile Menu */}
        <div className="flex-1 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="font-bold font-headline text-lg">Maa Inti Kattu</span>
                </Link>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map(({ href, label }) => (
                    <Link key={label} href={href} className="px-2 py-1 rounded-md transition-colors hover:bg-secondary">
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-lg">Maa Inti Kattu</span>
            </Link>
          </div>

          <nav className="flex flex-1 justify-center items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link key={label} href={href} className="transition-colors hover:text-primary">
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="flex-1" />
        </div>

        {/* Mobile Logo (centered) */}
        <div className="flex md:hidden justify-center flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
          </Link>
        </div>
        {/* Empty div for spacing on mobile */}
        <div className="flex-1 md:hidden" />


      </div>
    </header>
  );
}
