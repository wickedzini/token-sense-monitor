
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// This is a simplified auth context - in a real app, you would integrate with Supabase
type User = {
  id: string;
  email: string;
  name?: string;
  company?: string;
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
      
      // Very simple auth simulation - in a real app use Supabase Auth
      if (password === 'password') {
        const mockUser = { 
          id: 'user-123', 
          email, 
          name: email.split('@')[0],
          company: 'Acme Inc'
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
      
      const mockUser = { 
        id: 'user-' + Math.floor(Math.random() * 1000), 
        email,
        name,
        company: 'New Company'
      };
      setUser(mockUser);
      localStorage.setItem('tokenmeter_user', JSON.stringify(mockUser));
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
    navigate('/login');
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
