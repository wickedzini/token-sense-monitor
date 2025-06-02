'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Settings, LogOut, User, CreditCard, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'sonner';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

export function Header() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { user, signOut: authSignOut } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Reset mobile search on window resize
  useEffect(() => {
    if (!isMobile) setShowMobileSearch(false);
  }, [isMobile]);

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  
  
  const handleSignOut = async () => {
    try {
      await authSignOut();
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.success('Successfully signed out');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-3 min-w-[260px]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-gray-900 whitespace-nowrap">TokenMeter.AI</span>
            <span className="text-xs text-gray-500">Know your prompt costs</span>
          </div>
        </Link>
      </div>
      <div className={`flex items-center gap-3 md:gap-5 ${showMobileSearch ? 'hidden' : 'flex'}`}>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMobileSearch} className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </div>
      
      {/* Show search bar on mobile when clicked */}
      <div className={`flex flex-1 items-center ${showMobileSearch ? 'flex' : 'hidden md:flex'}`}>
        <form className="flex-1 md:max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search APIs, models, prompts..."
              className="w-full bg-background pl-8 md:w-[260px]"
            />
          </div>
        </form>
        {showMobileSearch && (
          <Button variant="ghost" size="sm" onClick={toggleMobileSearch}>
            Cancel
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <Link href="/alerts">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.displayName || "User"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/billing')}>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
    </header>
  );
}
