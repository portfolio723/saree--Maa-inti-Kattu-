'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    // In a real app, you would send an OTP here.
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    // In a real app, you would verify the OTP here.
    // For this mock, any 6-digit OTP is considered valid.
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setError('');
    // Simulate successful login
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
    }
    router.push('/account');
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome</CardTitle>
          <CardDescription>
            {step === 'phone'
              ? 'Enter your phone number to sign in or create an account.'
              : 'Enter the OTP sent to your phone.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                type="tel"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
               <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setStep('phone')}>
                Change number?
              </Button>
            </div>
          )}

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <Button className="w-full" onClick={step === 'phone' ? handleSendOtp : handleVerifyOtp}>
            {step === 'phone' ? 'Send OTP' : 'Verify & Continue'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
              This is a demo. No real OTP will be sent.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
