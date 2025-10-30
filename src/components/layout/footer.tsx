import Link from "next/link";
import { Logo } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-lg">Maa Inti Kattu</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Authentic traditions, delivered to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold font-headline mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Apparel</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Jewelry</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Home Decor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-headline mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Maa Inti Kattu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
