
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const shippingSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  mobileNumber: z.string().length(10, { message: 'Please enter a valid 10-digit mobile number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  pincode: z.string().length(6, { message: 'Please enter a valid 6-digit pincode.' }),
  addressLine1: z.string().min(5, { message: 'Please enter a valid address.' }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  state: z.string().min(2, { message: 'Please enter a valid state.' }),
  addressType: z.enum(['home', 'work', 'other']).default('home'),
  saveAddress: z.boolean().default(false),
  gstin: z.string().optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

// Mock user data. In a real app, this would come from an auth hook.
const mockUser = {
  isLoggedIn: false, // Set to true to simulate a logged-in user
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  // In a real app, saved addresses would be here
};


export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGuest, setIsGuest] = useState(!mockUser.isLoggedIn); // Default to guest if not logged in

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: mockUser.isLoggedIn ? mockUser.name : '',
      email: mockUser.isLoggedIn ? mockUser.email : '',
      mobileNumber: '',
      pincode: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      saveAddress: false,
      gstin: '',
    },
  });
  
   useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0 && !isProcessing) {
      router.replace('/cart');
    }
  }, [cart, router, isProcessing]);

  const onSubmit = async (data: ShippingFormValues) => {
    setIsProcessing(true);
    console.log('Shipping Data:', data);
    
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
            <div className="space-y-8">
              {isGuest && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl md:text-2xl">Account</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row gap-4">
                     <Button className="w-full" variant="outline">Continue as Guest</Button>
                     <Button asChild className="w-full">
                       <Link href="/login">Sign In or Sign Up</Link>
                     </Button>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl md:text-2xl">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="grid md:grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="fullName"
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
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl><Input {...field} type="tel" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   </div>
                   <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl><Input {...field} placeholder="House No., Building, Street, Area" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl><Input {...field} placeholder="Landmark, Apt. no., etc." /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                            <FormLabel>State</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSTIN (Optional)</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="saveAddress"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            Save this address for future use
                            </FormLabel>
                        </div>
                        </FormItem>
                    )}
                    />

                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="sticky top-24">
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
                {isProcessing ? 'Processing...' : `Continue to Payment`}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
