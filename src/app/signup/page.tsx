'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, initiateEmailSignUp, setDocumentNonBlocking } from '@/firebase';
import { doc, useFirestore } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Auth, onAuthStateChanged, FirebaseError } from 'firebase/auth';

const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

async function createUserProfile(auth: Auth, firestore: any, name: string, email: string) {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === email) { // Ensure it's the correct user
                unsubscribe();
                const userProfile = {
                    id: user.uid,
                    email: user.email,
                    name: name,
                    address: '',
                    phoneNumber: '',
                    profileImageUrl: '',
                };
                const userDocRef = doc(firestore, 'users', user.uid);
                setDocumentNonBlocking(userDocRef, userProfile, { merge: true });
                resolve(user);
            }
        }, reject);
    });
}


export default function SignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    form.clearErrors();
    const handleSignupError = (error: FirebaseError) => {
        let title = 'Uh oh! Something went wrong.';
        let description = error.message || 'There was a problem with your request.';

        if (error.code === 'auth/email-already-in-use') {
            title = 'Email Already Registered';
            description = 'This email address is already associated with an account. Please sign in instead.';
        }
        
        toast({
            variant: 'destructive',
            title: title,
            description: description,
        });
    };

    initiateEmailSignUp(auth, data.email, data.password, handleSignupError);

    try {
        await createUserProfile(auth, firestore, data.name, data.email);
        toast({
            title: 'Account Created!',
            description: 'You have been successfully signed up.',
        });
        router.push('/account');
    } catch (error) {
        // Errors from createUserProfile are usually from onAuthStateChanged and are less common
        // The signup error handler above will catch most user-facing issues.
        console.error("Error creating user profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join our community to start shopping.</CardDescription>
        </CardHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                Sign Up
              </Button>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline hover:text-primary">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}