'use client';

import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, Firestore } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export async function createUserProfile(uid: string, firestore: Firestore, name: string | null, email: string | null, phone: string | null) {
    const userProfile = {
        id: uid,
        email: email || '',
        name: name || '',
        address: '',
        phoneNumber: phone || '',
        profileImageUrl: '',
    };
    const userDocRef = doc(firestore, 'users', uid);
    // Use non-blocking write to Firestore
    setDocumentNonBlocking(userDocRef, userProfile, { merge: true });
}