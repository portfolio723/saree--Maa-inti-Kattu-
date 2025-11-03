'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from '@/components/account/profile-form';
import { OrdersList } from '@/components/account/orders-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  if (isUserLoading || isProfileLoading) {
    return (
        <div className="container py-12">
            <Skeleton className="h-10 w-1/4 mb-8" />
            <Skeleton className="h-12 w-1/3 mb-8" />
            <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    );
  }

  if (!user || !userProfile) {
    // This state should be brief as the effect will redirect
    return null;
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">My Account</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm userProfile={userProfile} />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersList userId={user.uid} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
