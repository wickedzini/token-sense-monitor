
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Plus, Check, X, User, Settings, LogOut } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [notifications, setNotifications] = useState(2);
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedApis, setConnectedApis] = useState<{name: string, status: 'connected' | 'error'}[]>([]);
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      if (apiKey.trim().length > 10) {
        setConnectedApis([...connectedApis, {name: "OpenAI", status: "connected"}]);
        toast({
          title: "API Connected",
          description: "Successfully connected to OpenAI API",
          variant: "default",
        });
        setApiKey("");
        setApiDialogOpen(false);
      } else {
        toast({
          title: "Connection Failed",
          description: "Invalid API key format. Please check and try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-display font-bold text-gray-900">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <Dialog open={apiDialogOpen} onOpenChange={setApiDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus size={16} />
              <span>Connect API</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect API</DialogTitle>
              <DialogDescription>
                Enter your API key to connect to AI service providers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <select 
                  id="provider" 
                  className="w-full rounded-md border border-gray-300 p-2"
                  defaultValue="openai"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="llama">Self-hosted Llama</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="sk-..."
                  type="password"
                />
                <p className="text-xs text-gray-500">
                  Your API key is encrypted and stored securely. We never share your keys with third parties.
                </p>
              </div>
              
              {connectedApis.length > 0 && (
                <div className="space-y-2 pt-2">
                  <Label>Connected APIs</Label>
                  <div className="space-y-2">
                    {connectedApis.map((api, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-2">
                        <div className="flex items-center gap-2">
                          {api.status === 'connected' ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <X size={16} className="text-red-500" />
                          )}
                          <span>{api.name}</span>
                        </div>
                        <Badge variant="outline" className={api.status === 'connected' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
                          {api.status === 'connected' ? 'Connected' : 'Error'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApiDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConnect} disabled={apiKey.trim().length === 0 || isConnecting}>
                {isConnecting ? "Connecting..." : "Connect"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="border-l pl-4 flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.substring(0, 2).toUpperCase() || "AI"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{user?.company || "Acme Inc"}</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
