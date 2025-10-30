import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={cn("font-body antialiased flex flex-col min-h-screen bg-white", inter.variable)}>
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
