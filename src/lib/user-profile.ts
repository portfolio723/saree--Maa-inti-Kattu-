'use client';

import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export async function createUserProfile(auth: Auth, firestore: any, name: string | null, email: string | null, phone: string | null) {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                // Check if the user is the one we are waiting for.
                // For email, we can match the email. For phone, we might not have it right away,
                // so we rely on this being the most recent auth change.
                const isEmailUser = email && user.email === email;
                const isPhoneUser = phone && user.phoneNumber === phone;
                
                // Heuristic: If it's a new user without an email/phone set yet, but we expect one.
                const isNewUser = !user.email && !user.displayName;

                if (isEmailUser || isPhoneUser || (isNewUser && (email || phone))) {
                    unsubscribe();
                    const userProfile = {
                        id: user.uid,
                        email: user.email || email || '',
                        name: name || '',
                        address: '',
                        phoneNumber: user.phoneNumber || phone || '',
                        profileImageUrl: user.photoURL || '',
                    };
                    const userDocRef = doc(firestore, 'users', user.uid);
                    setDocumentNonBlocking(userDocRef, userProfile, { merge: true });
                    resolve(user);
                }
            }
        }, reject);

        // Add a timeout to prevent the listener from staying active indefinitely
        setTimeout(() => {
            unsubscribe();
            reject(new Error("User profile creation timed out."));
        }, 10000); // 10 seconds timeout
    });
}
