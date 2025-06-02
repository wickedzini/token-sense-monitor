'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignupPage = () => {
  const router = useRouter();
  const { user, loading, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Sign up for your TokenMeter.AI account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleLoginButton />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-brand-primary hover:text-brand-dark font-medium">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
