
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

  const getToKnowUsLinks = [
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/awards", label: "Awards" },
    { href: "/media", label: "Media" },
    { href: "/stores", label: "Stores" },
    { href: "/virtual-tour", label: "Virtual Tour" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-1 flex flex-col items-start space-y-4 text-left">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="https://miro.medium.com/v2/resize:fit:246/format:webp/1*pHF5KzQmHRkpZQ7-ntgZ8w.png" alt="Kalamandir Logo" width={120} height={48} className="object-contain"/>
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
              <h3 className="font-semibold font-headline mb-4 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-primary">GET TO KNOW US</h3>
              <ul className="space-y-2">
                {getToKnowUsLinks.map(link => (
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
                      <Button type="submit" className="bg-gray-800 text-white hover:bg-gray-700">Subscribe</Button>
                    </div>
                </div>
                <div>
                   <h3 className="font-semibold font-headline mb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-10 after:h-0.5 after:bg-primary">We Accept</h3>
                   <div className="flex items-center gap-2 mt-4">
                     <Image src="https://img.icons8.com/color/48/visa.png" alt="Visa" width={48} height={30} className="object-contain" />
                     <Image src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" width={48} height={30} className="object-contain" />
                     <Image src="https://img.icons8.com/color/48/bhim-upi.png" alt="UPI" width={48} height={30} className="object-contain" />
                   </div>
                </div>
             </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t text-center">
           <div className="flex items-center justify-center gap-4">
               <Image src="https://img.icons8.com/?size=100&id=aR9x0jE45v2C&format=png&color=000000" alt="SSKL Logo" width={60} height={20} className="object-contain" />
               <p className="text-sm text-muted-foreground">
                  © Copyright {new Date().getFullYear()} Kalamandir. All Rights Reserved
               </p>
           </div>
        </div>
      </div>
    </footer>
  );
}
