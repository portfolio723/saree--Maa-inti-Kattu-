'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore, updateDocumentNonBlocking, useAuth } from '@/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { User as FirebaseUser, updateProfile } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  userProfile: any;
}

export function ProfileForm({ userProfile }: ProfileFormProps) {
  const firestore = useFirestore();
  const auth = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.profileImageUrl || '');


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name || '',
      email: userProfile.email || '',
      phoneNumber: userProfile.phoneNumber || '',
      address: userProfile.address || '',
    },
  });
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userProfile?.id || !auth.currentUser) return;

    setIsUploading(true);

    const storage = getStorage();
    const filePath = `profile-images/${userProfile.id}/${file.name}`;
    const storageRef = ref(storage, filePath);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      const userDocRef = doc(firestore, 'users', userProfile.id);
      updateDocumentNonBlocking(userDocRef, { profileImageUrl: downloadURL });
      
      setAvatarUrl(downloadURL);

      toast({
        title: 'Profile Picture Updated',
        description: 'Your new profile picture has been saved.',
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was a problem uploading your profile picture.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    if (!userProfile?.id || !auth.currentUser) return;
    const userDocRef = doc(firestore, 'users', userProfile.id);
    
    // Update firestore
    updateDocumentNonBlocking(userDocRef, data);

    // Update auth profile
    if(auth.currentUser.displayName !== data.name) {
        updateProfile(auth.currentUser, { displayName: data.name });
    }

    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl">Personal Information</CardTitle>
        <CardDescription>Update your profile details here.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 cursor-pointer" onClick={handleAvatarClick}>
                    <AvatarImage src={avatarUrl} alt={userProfile.name} />
                    <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                    {userProfile.name?.charAt(0).toUpperCase() || <User className="h-8 w-8" />}
                    </AvatarFallback>
                </Avatar>
                <div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleAvatarClick}
                >
                    <Camera className="h-8 w-8 text-white" />
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                    disabled={isUploading}
                />
              </div>
              <div className="space-y-1">
                 <h3 className="text-lg md:text-xl font-bold">{userProfile.name || 'User'}</h3>
                 <p className="text-sm md:text-base text-muted-foreground">{userProfile.phoneNumber || userProfile.email}</p>
                 <Button type="button" variant="outline" size="sm" onClick={handleAvatarClick} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Change Picture'}
                 </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Name" />
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
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="you@example.com"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Your shipping address"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={form.formState.isSubmitting || isUploading}>
              Save Changes
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
