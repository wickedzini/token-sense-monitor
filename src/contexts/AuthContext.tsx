
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// This is a simplified auth context - in a real app, you would integrate with Supabase
type User = {
  id: string;
  email: string;
  name?: string;
  company?: string;
  isDemo?: boolean;
  plan?: 'free' | 'starter' | 'growth' | 'scale';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // In a real app, this would check for an existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('tokenmeter_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo account with pre-populated data
      if (email === 'demo@tokenmeter.ai' && password === 'demo') {
        const demoUser = { 
          id: 'user-demo', 
          email: 'demo@tokenmeter.ai', 
          name: 'Demo User',
          company: 'Demo Company',
          isDemo: true,
          plan: 'free' as const
        };
        setUser(demoUser);
        localStorage.setItem('tokenmeter_user', JSON.stringify(demoUser));
        toast.success('Successfully signed in to demo account');
        navigate('/');
        return;
      }
      
      // Regular authentication for other accounts
      if (password === 'password') {
        const mockUser = { 
          id: 'user-' + Math.random().toString(36).substring(2, 10), 
          email, 
          name: email.split('@')[0],
          company: 'New Company',
          isDemo: false,
          plan: 'free' as const
        };
        setUser(mockUser);
        localStorage.setItem('tokenmeter_user', JSON.stringify(mockUser));
        toast.success('Successfully signed in');
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Failed to sign in');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = { 
        id: 'user-' + Math.random().toString(36).substring(2, 10), 
        email,
        name,
        company: '',
        isDemo: false,
        plan: 'free' as const
      };
      setUser(newUser);
      localStorage.setItem('tokenmeter_user', JSON.stringify(newUser));
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create account');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('tokenmeter_user');
    toast.success('Signed out successfully');
    navigate('/landing');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
