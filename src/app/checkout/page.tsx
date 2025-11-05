'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const shippingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  state: z.string().min(2, { message: 'Please enter a valid state.' }),
  zip: z.string().min(5, { message: 'Please enter a valid ZIP code.' }),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const userProfile = {
      name: 'John Doe',
      address: '123 Test Street',
  };

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || '',
        address: userProfile.address || '',
        city: '',
        state: '',
        zip: '',
      });
    }
  }, [userProfile, form]);
  
   useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0) {
      router.replace('/cart');
    }
  }, [cart, router]);

  const onSubmit = async (data: ShippingFormValues) => {
    setIsProcessing(true);
    
    // In a real app, you would integrate with a payment provider here.
    // For this demo, we'll simulate a successful payment.
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockOrderId = `ORD-${Date.now()}`;

    toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase.',
    });

    clearCart();
    router.push(`/orders/confirmation?orderId=${mockOrderId}`);
    setIsProcessing(false);
  };
  
  if (cart.length === 0) {
      return <div className="container flex justify-center items-center h-screen"><p>Loading...</p></div>
  }

  return (
    <div className="container py-24 md:py-28">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Checkout</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl md:text-2xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-3 gap-4">
                     <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State / Province</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP / Postal Code</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl md:text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                             <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Separator />
                   <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-semibold">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
               <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Place Order & Pay ₹${subtotal.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
