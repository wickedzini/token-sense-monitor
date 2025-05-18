
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Plus } from "lucide-react";

const Header = () => {
  const [notifications, setNotifications] = useState(2);

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-display font-bold text-gray-900">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Plus size={16} />
          <span>Connect API</span>
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                {notifications}
              </span>
            )}
          </Button>
        </div>
        
        <div className="border-l pl-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AI</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">Acme Inc</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
