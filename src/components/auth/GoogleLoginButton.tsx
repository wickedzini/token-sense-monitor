'use client';

import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  className?: string;
}

export function GoogleLoginButton({ className = '' }: GoogleLoginButtonProps) {
  const { signInWithGoogle } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      className={`flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-2 ${className}`}
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      <span>Continue with Google</span>
    </button>
  );
} 