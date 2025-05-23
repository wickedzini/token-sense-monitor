
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Billing from "./pages/Billing";
import BillingCheckout from "./pages/BillingCheckout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Suggestions from "./pages/Suggestions";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Status from "./pages/Status";
import Documentation from "./pages/Documentation";
import ApiReference from "./pages/ApiReference";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Security from "./pages/Security";
import Demo from "./pages/Demo";
import Blog from "./pages/Blog";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  if (auth.loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

// Auth routes redirect to dashboard if already authenticated
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  if (auth.loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Landing page route - redirects to dashboard if authenticated
const LandingRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  if (auth.loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing/Marketing page (unauthenticated) */}
      <Route path="/landing" element={<LandingRoute><Landing /></LandingRoute>} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/status" element={<Status />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/security" element={<Security />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/api-reference" element={<ApiReference />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/blog" element={<Blog />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="models" element={<Models />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="billing" element={<Billing />} />
        <Route path="billing/checkout" element={<BillingCheckout />} />
        <Route path="suggestions" element={<Suggestions />} />
        <Route path="blog" element={<Blog />} />
        <Route path="suggest/:id" element={<Dashboard />} /> {/* This will be handled by the SuggestionDrawer */}
        <Route path="alerts/:alertId" element={<Alerts />} /> {/* This will be handled by an AlertDetailDrawer */}
      </Route>

      {/* Redirect root for unauthenticated users to landing */}
      <Route path="/" element={<Navigate to="/landing" replace />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
