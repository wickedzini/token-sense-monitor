
import { useState, useEffect } from "react";
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
import { Bell, Search, Settings, LogOut, User, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  // Reset mobile search on window resize
  useEffect(() => {
    if (!isMobile) setShowMobileSearch(false);
  }, [isMobile]);

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };
  
  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-card px-4 md:px-6">
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
        <Link to="/alerts">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={user?.email || "User"} />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.name || "User"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/billing')}>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
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
    </header>
  );
}
