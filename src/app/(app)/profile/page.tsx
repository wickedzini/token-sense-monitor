'use client';

import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Trash2, Upload, Eye, EyeOff, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [company, setCompany] = useState(user?.company || "");
  const [role, setRole] = useState("Product Manager");
  const [timezone, setTimezone] = useState("America/New_York");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Show/hide password functionality
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock API keys
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "tk_live_xxxxxxxxxxxxxxxxxxxx", createdAt: "May 10, 2025" },
    { id: 2, name: "Development Key", key: "tk_dev_xxxxxxxxxxxxxxxxxxxx", createdAt: "May 15, 2025" }
  ]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error("Only JPG and PNG files are allowed");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
        toast.success("Avatar updated successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would call an API to save the profile
    toast.success("Profile updated successfully");
  };

  const regenerateKey = (id: number) => {
    // In a real app, this would call an API to regenerate the key
    setApiKeys(keys => keys.map(key => 
      key.id === id 
        ? { ...key, key: `tk_${key.key.split('_')[1]}_${Math.random().toString(36).substring(2, 10)}`, createdAt: "May 18, 2025" } 
        : key
    ));
    toast.success("API key regenerated");
  };

  const revokeKey = (id: number) => {
    // In a real app, this would call an API to revoke the key
    setApiKeys(keys => keys.filter(key => key.id !== id));
    toast.success("API key revoked");
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast.success("Account deleted successfully");
    signOut();
  };
  
  const handleUpgradePlan = () => {
    setIsUpgrading(true);
    
    // Simulate API call to create Stripe checkout session
    setTimeout(() => {
      setIsUpgrading(false);
      // In a real app, this would redirect to the Stripe checkout
      window.location.href = "/billing/checkout";
      toast.success("Redirecting to checkout...");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarSrc || undefined} alt={name} />
                <AvatarFallback className="text-xl">{name?.charAt(0) || user?.email?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload size={16} />
                  Upload photo
                </Button>
                <Input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/png, image/jpeg" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                />
                <p className="text-xs text-gray-500 mt-1">PNG, JPG (max 2MB)</p>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} disabled />
              </div>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineer">Engineer</SelectItem>
                      <SelectItem value="Product Manager">Product Manager</SelectItem>
                      <SelectItem value="Designer">Designer</SelectItem>
                      <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value="currentpassword123"
                    disabled
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                <div className="mt-2">
                  <Button variant="outline" size="sm">Change password</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile}>Save changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for programmatic access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md gap-4">
                <div>
                  <p className="font-medium">{apiKey.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 font-mono">
                      {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey.key);
                        toast.success("API key copied to clipboard");
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">Created on {apiKey.createdAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => regenerateKey(apiKey.id)}
                    className="flex items-center gap-1"
                  >
                    <RefreshCcw size={14} />
                    <span>Regenerate</span>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => revokeKey(apiKey.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    <span>Revoke</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => {
            const newId = Math.max(0, ...apiKeys.map(k => k.id)) + 1;
            setApiKeys([...apiKeys, { 
              id: newId, 
              name: "New Key", 
              key: `tk_dev_${Math.random().toString(36).substring(2, 10)}`,
              createdAt: "May 18, 2025"
            }]);
            toast.success("New API key created");
          }}>
            Create new key
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Current Plan:</h3>
                <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary">Free Trial</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">25 days remaining</p>
            </div>
            <Button 
              className="bg-gradient-to-r from-brand-primary to-brand-secondary"
              onClick={handleUpgradePlan}
              disabled={isUpgrading}
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating checkout...
                </>
              ) : (
                "Upgrade plan"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 size={16} />
                <span>Delete my account</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. It will permanently delete your account
                  and remove all of your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

// Copy Icon Component
const Copy = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

export default ProfilePage;
