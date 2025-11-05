'use client';
import {
  Auth,
  signInAnonymously,
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier,
  FirebaseError
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth, onError: (error: FirebaseError) => void): void {
  signInAnonymously(authInstance).catch(onError);
}

/**
 * Initiates phone number sign-in (non-blocking).
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
 * Sets up the reCAPTCHA verifier. This function should only be called on the client side.
 * It ensures the reCAPTCHA container is ready and initializes the verifier instance,
 * attaching it to the window object to prevent re-initialization on re-renders.
 */
export function setupRecaptcha(auth: Auth, containerId: string): RecaptchaVerifier {
    if (typeof window === 'undefined') {
        throw new Error("reCAPTCHA can only be set up in the browser.");
    }
    
    // Clean up previous instance if it exists
    if ((window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier.clear();
    }
    const recaptchaContainer = document.getElementById(containerId);
    if (recaptchaContainer) {
        recaptchaContainer.innerHTML = '';
    }

    const verifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': (response: any) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // This callback is usually for the button's onClick handler.
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
        }
    });

    (window as any).recaptchaVerifier = verifier;
    
    return verifier;
}