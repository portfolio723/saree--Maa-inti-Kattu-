
'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Landmark, CreditCard, Wallet, Truck } from 'lucide-react';
import Image from 'next/image';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: <Image src="https://kalamandir.com/pub/media/logo/stores/1/UPI-Logo-vector.png" alt="UPI" width={48} height={24} className="h-6 object-contain" /> },
  { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="h-6 w-6 text-primary" /> },
  { id: 'netbanking', name: 'Net Banking', icon: <Landmark className="h-6 w-6 text-primary" /> },
  { id: 'wallet', name: 'Wallets', icon: <Wallet className="h-6 w-6 text-primary" /> },
  { id: 'cod', name: 'Cash on Delivery', icon: <Truck className="h-6 w-6 text-primary" /> },
];

export function PaymentOptions() {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);

  return (
    <RadioGroup
      value={selectedMethod}
      onValueChange={setSelectedMethod}
      className="space-y-4"
    >
      {paymentMethods.map((method) => (
        <Label
          key={method.id}
          htmlFor={method.id}
          className={cn(
            "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all",
            selectedMethod === method.id ? "border-primary ring-2 ring-primary" : "border-border hover:bg-muted/50"
          )}
        >
          <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
          <div className="flex-shrink-0 w-8 flex justify-center items-center">
            {method.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold">{method.name}</p>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
