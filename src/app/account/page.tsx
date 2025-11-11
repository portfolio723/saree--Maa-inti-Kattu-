'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from '@/components/account/profile-form';
import { OrdersList } from '@/components/account/orders-list';

export default function AccountPage() {
  // A more realistic user object after authentication
  const userProfile = {
    id: '123',
    name: 'Shankar',
    email: 'shankar@example.com',
    phoneNumber: '+1234567890',
    address: '123 Main St, Anytown, USA',
    profileImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjE4MDM0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  };

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
          <OrdersList userId="123" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
