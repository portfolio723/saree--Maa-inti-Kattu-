'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, you would handle login logic here.
    // For this static version, we'll just redirect to the account page.
    router.push('/account');
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome</CardTitle>
          <CardDescription>Sign in or create an account to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
             <Label htmlFor="email">Email Address</Label>
             <Input id="email" type="email" placeholder="you@example.com" />
           </div>
           <div className="space-y-2">
             <Label htmlFor="password">Password</Label>
             <Input id="password" type="password" />
           </div>
           <Button className="w-full" onClick={handleLogin}>
             Sign In
           </Button>
            <p className="text-center text-sm text-muted-foreground">
              This is a demo. Click Sign In to continue.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
