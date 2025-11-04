'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier,
  FirebaseError
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth, onError: (error: FirebaseError) => void): void {
  signInAnonymously(authInstance).catch(onError);
}

/**
 * Initiates phone number sign-in (non-blocking).
 * @returns A promise that resolves with the ConfirmationResult on success.
 */
export function initiatePhoneNumberSignIn(
  auth: Auth,
  phoneNumber: string,
  appVerifier: RecaptchaVerifier,
  onSuccess: (confirmationResult: ConfirmationResult) => void,
  onError: (error: FirebaseError) => void
): void {
   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(onSuccess)
    .catch(onError);
}


/**
 * Sets up the reCAPTCHA verifier.
 */
export function setupRecaptcha(auth: Auth, containerId: string): RecaptchaVerifier {
    // Ensure this function is only called on the client side.
    if (typeof window === 'undefined') {
        throw new Error("reCAPTCHA can only be set up in the browser.");
    }
    
    // To avoid re-rendering issues, we might need to ensure the container is empty
    // or the verifier is only created once.
    if (!(window as any).recaptchaVerifier) {
         (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
            }
        });
    }
    return (window as any).recaptchaVerifier;
}
