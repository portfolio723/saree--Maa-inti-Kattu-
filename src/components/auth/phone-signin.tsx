'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, useFirestore, setupRecaptcha, initiatePhoneNumberSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ConfirmationResult } from 'firebase/auth';
import { createUserProfile } from '@/lib/user-profile';
import { useRouter } from 'next/navigation';
import { CardContent } from '../ui/card';

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number with country code.' }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits.' }),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export function PhoneSignIn() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: '' },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const handleSignInError = (error: any) => {
    console.error('Phone sign-in error:', error);
    let title = 'An unknown error occurred';
    let description = 'Please try again later.';

    if (error.code === 'auth/operation-not-allowed') {
        title = 'Sign-in Method Disabled';
        description = 'Phone Number sign-in is not enabled for this app. Please contact support or enable it in your Firebase console under Authentication > Sign-in method.';
    } else if (error.code === 'auth/invalid-phone-number') {
        title = 'Invalid Phone Number';
        description = 'The phone number you entered is not valid.';
    } else if (error.code === 'auth/too-many-requests') {
        title = 'Too Many Requests';
        description = 'You have sent too many requests. Please try again later.';
    }
    
    toast({
        variant: 'destructive',
        title: title,
        description: description,
        duration: 9000,
    });
    setIsSending(false);
    setIsVerifying(false);
  };

  const onPhoneSubmit = (data: PhoneFormValues) => {
    phoneForm.clearErrors();
    setIsSending(true);
    
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (!recaptchaContainer) {
        handleSignInError({code: 'auth/internal-error', message: 'reCAPTCHA container not found'});
        return;
    }
    
    const appVerifier = setupRecaptcha(auth, 'recaptcha-container');

    initiatePhoneNumberSignIn(auth, data.phoneNumber, appVerifier, (confirmation) => {
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: `An OTP has been sent to ${data.phoneNumber}.`,
      });
      setIsSending(false);
    }, handleSignInError);
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    otpForm.clearErrors();
    if (!confirmationResult) {
      toast({ variant: 'destructive', title: 'Something went wrong. Please try again.' });
      return;
    }
    setIsVerifying(true);
    try {
      const result = await confirmationResult.confirm(data.otp);
      const user = result.user;

      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        await createUserProfile(auth, firestore, user.displayName, user.email, user.phoneNumber);
         toast({
            title: 'Account Created!',
            description: 'You have been successfully signed up.',
        });
      } else {
         toast({
            title: 'Signed In!',
            description: 'You have been successfully signed in.',
        });
      }
      
      router.push('/account');

    } catch (error: any) {
      console.error('OTP confirmation error:', error);
       toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: error.message || 'The OTP you entered is incorrect. Please try again.',
      });
    } finally {
        setIsVerifying(false);
    }
  };

  return (
    <>
      {!isOtpSent ? (
        <FormProvider {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}>
            <CardContent className="grid gap-4 pt-6">
              <FormField
                control={phoneForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </CardContent>
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)}>
            <CardContent className="grid gap-4 pt-6">
              <p className="text-sm text-center text-muted-foreground">
                Enter the 6-digit code sent to your phone.
              </p>
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Verify OTP & Sign In'}
              </Button>
               <Button variant="link" size="sm" onClick={() => {setIsOtpSent(false); setConfirmationResult(null);}}>
                Change phone number
              </Button>
            </CardContent>
          </form>
        </FormProvider>
      )}
      <div id="recaptcha-container" className="my-4 flex justify-center"></div>
    </>
  );
}
