
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CouponInputProps {
  onApply: (coupon: string) => void;
}

export function CouponInput({ onApply }: CouponInputProps) {
  const [coupon, setCoupon] = useState('');

  const handleApply = () => {
    if (coupon.trim()) {
      onApply(coupon.trim());
    }
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter Coupon Code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="text-sm"
      />
      <Button type="button" variant="outline" onClick={handleApply} className="text-sm">
        Apply
      </Button>
    </div>
  );
}
