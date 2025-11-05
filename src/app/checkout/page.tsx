
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShippingForm } from '@/components/checkout/shipping-form';
import type { Address } from '@/lib/types';
import { AddressCard } from '@/components/checkout/address-card';
import { DeliveryOptions, type DeliveryOption } from '@/components/checkout/delivery-options';
import { CouponInput } from '@/components/checkout/coupon-input';
import { PaymentOptions } from '@/components/checkout/payment-options';
import { deliveryOptions as allDeliveryOptions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';


const shippingSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  mobileNumber: z.string().length(10, { message: 'Please enter a valid 10-digit mobile number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  pincode: z.string().length(6, { message: 'Please enter a valid 6-digit pincode.' }),
  addressLine1: z.string().min(5, { message: 'Please enter a valid address.' }),
  addressLine2: z.string().optional().default(''),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  state: z.string().min(2, { message: 'Please enter a valid state.' }),
  addressType: z.enum(['home', 'work', 'other']).default('home'),
  saveAddress: z.boolean().default(false),
  gstin: z.string().optional().default(''),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

const mockUser = {
  isLoggedIn: true,
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  savedAddresses: [
    {
      id: 'addr1',
      fullName: 'Jane Doe',
      mobileNumber: '9876543210',
      pincode: '500081',
      addressLine1: '123 Tech Park',
      addressLine2: 'Hitech City',
      city: 'Hyderabad',
      state: 'Telangana',
      addressType: 'work',
    } as Address,
  ],
};

const checkoutSteps = [
  { id: 'address', name: 'Shipping' },
  { id: 'delivery', name: 'Delivery' },
  { id: 'payment', name: 'Payment' },
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(!mockUser.isLoggedIn || mockUser.savedAddresses.length === 0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(mockUser.savedAddresses.length > 0 ? mockUser.savedAddresses[0] : null);
  const [currentStep, setCurrentStep] = useState<'address' | 'delivery' | 'payment'>('address');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption>(allDeliveryOptions[0]);
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
  const deliveryFee = selectedDeliveryOption?.cost ?? 0;
  const taxes = useMemo(() => (subtotal - discountAmount) * 0.05, [subtotal, discountAmount]); // 5% GST mock
  const total = useMemo(() => subtotal + deliveryFee - discountAmount + taxes, [subtotal, deliveryFee, discountAmount, taxes]);

  const defaultFormValues = selectedAddress || {
    fullName: mockUser.isLoggedIn ? mockUser.name : '',
    email: mockUser.isLoggedIn ? mockUser.email : '',
    mobileNumber: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    addressType: 'home',
    saveAddress: false,
    gstin: '',
  };

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if(mockUser.isLoggedIn && showNewAddressForm) {
      form.reset({
        fullName: mockUser.name,
        email: mockUser.email,
        mobileNumber: '',
        pincode: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        addressType: 'home',
        saveAddress: true,
        gstin: '',
      });
      setSelectedAddress(null);
    } else if (mockUser.isLoggedIn && mockUser.savedAddresses.length > 0 && !showNewAddressForm) {
      const defaultAddr = mockUser.savedAddresses[0];
      setSelectedAddress(defaultAddr);
      form.reset(defaultAddr);
    }
  }, [showNewAddressForm, form, mockUser.isLoggedIn, mockUser.name, mockUser.email, mockUser.savedAddresses]);
  
   useEffect(() => {
    if (cart.length === 0 && !isProcessing) {
      router.replace('/cart');
    }
  }, [cart, router, isProcessing]);

  const handleAddressSubmit = (data: ShippingFormValues) => {
    console.log('Shipping Data:', data);
    
    // In a real app, you would save the new address here.
    // For this mock, we'll just set it as the selected address.
    if(showNewAddressForm){
      setSelectedAddress({ ...data, id: `new-${Date.now()}` });
    }

    if (!selectedAddress && !showNewAddressForm && mockUser.savedAddresses.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Please select an address',
        description: 'You must select a shipping address to continue.',
      });
      return;
    }
    setCurrentStep('delivery');
  };
  
  const handleDeliverySubmit = () => {
    setCurrentStep('payment');
  }

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    console.log('Finalizing order...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate a random payment failure (e.g., 25% chance)
    if (Math.random() < 0.25) {
        toast({
            variant: "destructive",
            title: 'Payment Failed',
            description: 'Your payment could not be processed. Please try again.',
        });
        setIsProcessing(false);
        return;
    }

    const mockOrderId = `ORD-${Date.now()}`;
    const orderDetails = {
      orderId: mockOrderId,
      items: cart,
      shippingAddress: selectedAddress,
      total: total.toFixed(2),
    };

    // Save order details to localStorage to be read by the confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase.',
    });

    clearCart();
    router.push(`/orders/confirmation`);
    setIsProcessing(false);
  };
  
  const handleApplyCoupon = (coupon: string) => {
    if (coupon.toUpperCase() === 'SALE50') {
        const discount = subtotal * 0.5;
        setDiscountAmount(discount);
        toast({
            title: 'Coupon Applied!',
            description: '50% discount has been applied to your order.',
        });
    } else {
        setDiscountAmount(0);
        toast({
            variant: 'destructive',
            title: 'Invalid Coupon',
            description: 'The coupon code you entered is not valid.',
        });
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(currentStep === 'address') {
      form.handleSubmit(handleAddressSubmit)();
    } else if (currentStep === 'delivery') {
      handleDeliverySubmit();
    } else {
      handlePaymentSubmit();
    }
  }

  if (cart.length === 0) {
      return <div className="container flex justify-center items-center h-screen"><p>Loading...</p></div>
  }
  
  const getButtonText = () => {
    switch (currentStep) {
      case 'address': return 'Continue to Delivery';
      case 'delivery': return 'Continue to Payment';
      case 'payment': return isProcessing ? 'Processing...' : 'Place Order';
      default: return 'Continue';
    }
  }
  
  const renderAddressSummary = () => selectedAddress && (
    <p className="text-sm text-muted-foreground">
      {selectedAddress.addressLine1}, {selectedAddress.city} - {selectedAddress.pincode}
    </p>
  );

  const renderDeliverySummary = () => (
    <p className="text-sm text-muted-foreground">
      {selectedDeliveryOption.name} - {selectedDeliveryOption.date}
    </p>
  );

  const currentStepIndex = checkoutSteps.findIndex(step => step.id === currentStep);

  return (
    <div className="container py-24 md:py-28">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2 text-center">Checkout</h1>
        <p className="text-muted-foreground text-center mb-8">Securely complete your purchase.</p>
        
        <div className="flex items-center justify-between relative max-w-xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300" 
            style={{ width: `${(currentStepIndex / (checkoutSteps.length - 1)) * 100}%`}}
          />
          {checkoutSteps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center">
              <div 
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300",
                  index <= currentStepIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <p className={cn(
                "mt-2 text-xs font-semibold text-center",
                index <= currentStepIndex ? "text-primary" : "text-muted-foreground"
              )}>
                {step.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {!mockUser.isLoggedIn && (
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
                <CardHeader className='flex-row items-center justify-between'>
                  <CardTitle className="font-headline text-xl md:text-2xl">
                    Shipping Address
                  </CardTitle>
                   {currentStep !== 'address' && (
                    <Button variant="link" onClick={() => setCurrentStep('address')}>Edit</Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentStep === 'address' ? (
                    <>
                      {mockUser.isLoggedIn && mockUser.savedAddresses.length > 0 ? (
                        <div className="space-y-4">
                          {mockUser.savedAddresses.map(address => (
                            <AddressCard 
                              key={address.id} 
                              address={address} 
                              isSelected={selectedAddress?.id === address.id && !showNewAddressForm}
                              onSelect={() => {
                                setSelectedAddress(address);
                                form.reset(address);
                                setShowNewAddressForm(false);
                              }}
                            />
                          ))}
                          <Button variant="outline" className="w-full" onClick={() => setShowNewAddressForm(!showNewAddressForm)}>
                            {showNewAddressForm ? 'Cancel' : 'Add a New Address'}
                          </Button>
                          {showNewAddressForm && <Separator className="my-4"/>}
                        </div>
                      ) : null}

                      {(showNewAddressForm || !mockUser.isLoggedIn) && (
                        <ShippingForm />
                      )}
                    </>
                  ) : (
                    renderAddressSummary()
                  )}
                </CardContent>
              </Card>

              {currentStep !== 'address' && (
                 <Card>
                  <CardHeader className='flex-row items-center justify-between'>
                    <CardTitle className="font-headline text-xl md:text-2xl">
                      Delivery Options
                    </CardTitle>
                     {currentStep === 'payment' && (
                      <Button variant="link" onClick={() => setCurrentStep('delivery')}>Edit</Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {currentStep === 'delivery' ? (
                       <DeliveryOptions onDeliveryChange={setSelectedDeliveryOption}/>
                     ) : (
                       renderDeliverySummary()
                     )}
                  </CardContent>
                </Card>
              )}
              
               {currentStep === 'payment' && (
                 <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl md:text-2xl">
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <PaymentOptions />
                  </CardContent>
                </Card>
              )}
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
                  <CouponInput onApply={handleApplyCoupon} />
                  <Separator />
                   <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                        </div>
                        {discountAmount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Taxes (GST)</span>
                            <span>₹{taxes.toFixed(2)}</span>
                        </div>
                    </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Button type="submit" size="lg" className="w-full" disabled={isProcessing || (currentStep === 'address' && !selectedAddress && !showNewAddressForm)}>
                  {getButtonText()}
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span>Secure payments via Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
