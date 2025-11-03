
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Youtube, Phone } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { href: "/products", label: "Sarees" },
    { href: "/products", label: "New Arrivals" },
    { href: "/combos", label: "Combo Offers" },
    { href: "/blouses", label: "Blouses" },
    { href: "/exclusive", label: "Exclusive collections" },
  ];

  const userPolicyLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/return-policy", label: "Return Policy" },
    { href: "/shipping-policy", label: "Shipping Policy" },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1 flex flex-col items-start space-y-4 text-left">
            <Link href="/" className="flex items-center space-x-2 text-xl md:text-2xl font-bold font-headline">
              Maa Inti Kattu
            </Link>
            <div className="flex items-center gap-3 pt-4">
              <Phone className="h-6 w-6 text-primary"/>
              <span className="font-semibold text-lg">9852 9852 99</span>
            </div>
            <a href="mailto:visit@maaintikattu.com" className="text-sm text-muted-foreground hover:text-primary">visit@maaintikattu.com</a>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hovertext-primary"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div className="text-left">
              <h3 className="font-semibold font-headline mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-primary">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
                ))}
              </ul>
          </div>
          
          <div className="text-left">
            <h3 className="font-semibold font-headline mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-primary">USER POLICY</h3>
            <ul className="space-y-2">
              {userPolicyLinks.map(link => (
                <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="text-left">
             <div className="space-y-6">
                <div>
                   <h3 className="font-semibold font-headline mb-4 relative after:content-[''] after:absolute after_left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-primary">Join Our Newsletter</h3>
                   <p className="text-sm text-muted-foreground mb-3">Sign up for our e-mail to get latest news.</p>
                   <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input type="email" placeholder="Your email letter" className="bg-white" />
                      <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
                    </div>
                </div>
                <div>
                   <h3 className="font-semibold font-headline mb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-primary">We Accept</h3>
                   <div className="flex items-center gap-2 mt-4">
                     <Image src="https://kalamandir.com/pub/media/porto/paypal.png" alt="Paypal" width={120} height={60} className="object-contain" />
                   </div>
                </div>
             </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t text-center">
           <div className="flex items-center justify-center gap-4">
               <p className="text-sm text-muted-foreground">
                  © Copyright {new Date().getFullYear()} Maa Inti Kattu. All Rights Reserved
               </p>
           </div>
        </div>
      </div>
    </footer>
  );
}
