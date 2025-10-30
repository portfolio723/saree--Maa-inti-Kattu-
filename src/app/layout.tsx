import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Open_Sans, Corinthia } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const corinthia = Corinthia({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-corinthia' 
});


export const metadata: Metadata = {
  title: 'Maa Inti Kattu - Traditional Wares',
  description: 'Authentic traditions, delivered to your doorstep.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("font-body antialiased flex flex-col min-h-screen bg-white", openSans.variable, corinthia.variable)}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
