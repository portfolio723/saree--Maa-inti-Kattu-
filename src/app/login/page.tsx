'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { PhoneSignIn } from '@/components/auth/phone-signin';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);


  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome</CardTitle>
          <CardDescription>Sign in or create an account with your phone number.</CardDescription>
        </CardHeader>
        <CardContent>
           <PhoneSignIn />
        </CardContent>
      </Card>
    </div>
  );
}
