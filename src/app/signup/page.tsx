'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This page is no longer in use and redirects to the login page.
export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return null;
}
