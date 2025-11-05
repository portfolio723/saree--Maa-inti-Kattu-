
'use client';

import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Package, Zap, Gift } from 'lucide-react';
import { deliveryOptions } from '@/lib/mock-data';

export type DeliveryOption = typeof deliveryOptions[number];

interface DeliveryOptionsProps {
  onDeliveryChange: (option: DeliveryOption) => void;
}


export function DeliveryOptions({ onDeliveryChange }: DeliveryOptionsProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(deliveryOptions[0].id);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  useEffect(() => {
    const selected = deliveryOptions.find(opt => opt.id === selectedOptionId);
    if(selected) {
      onDeliveryChange(selected);
    }
  }, [selectedOptionId, onDeliveryChange]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Choose a delivery speed:</h3>
        <RadioGroup
          value={selectedOptionId}
          onValueChange={setSelectedOptionId}
          className="space-y-4"
        >
          {deliveryOptions.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all",
                selectedOptionId === option.id ? "border-primary ring-2 ring-primary" : "border-border hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
              <option.icon className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-semibold">{option.name}</p>
                <p className="text-sm text-muted-foreground">{option.date}</p>
              </div>
              <p className="font-semibold text-sm">
                {option.cost === 0 ? 'FREE' : `₹${option.cost.toFixed(2)}`}
              </p>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center space-x-3">
          <Checkbox id="gift-option" checked={isGift} onCheckedChange={(checked) => setIsGift(!!checked)} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="gift-option" className="flex items-center gap-2 font-semibold cursor-pointer">
              <Gift className="h-5 w-5 text-accent" />
              This is a gift
            </Label>
            <p className="text-sm text-muted-foreground">
              Add a gift message and hide prices on the packing slip.
            </p>
          </div>
        </div>
        {isGift && (
          <div className="pt-2">
            <Input
              placeholder="Enter your gift message here..."
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
