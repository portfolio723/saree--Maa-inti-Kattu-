'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, initiateEmailSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/auth';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhoneSignIn } from '@/components/auth/phone-signin';


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);


  const onSubmit = (data: LoginFormValues) => {
    form.clearErrors();
    initiateEmailSignIn(auth, data.email, data.password, (error: FirebaseError) => {
        let title = 'An unknown error occurred.';
        let description = 'Please try again.';
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            title = 'Invalid Credentials';
            description = 'The email or password you entered is incorrect. Please try again.';
        }
        toast({
            variant: 'destructive',
            title: title,
            description: description,
        });
    });
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                    <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="grid gap-4 pt-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            Sign In
                        </Button>
                        </CardFooter>
                    </form>
                    </FormProvider>
                </TabsContent>
                <TabsContent value="phone">
                   <PhoneSignIn />
                </TabsContent>
            </Tabs>
        </CardContent>
         <CardFooter className="flex flex-col gap-4 items-center justify-center text-center">
             <div className="text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline hover:text-primary">
                  Sign up
                </Link>
              </div>
         </CardFooter>
      </Card>
    </div>
  );
}
