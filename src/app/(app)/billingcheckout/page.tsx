'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";

const BillingCheckout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Simulate creating a Stripe checkout session
    const timer = setTimeout(() => {
      // In a real implementation, this would be an API call to create a Stripe checkout session
      // and then redirect to the Stripe checkout page
      try {
        // Simulate successful checkout session creation
        const checkoutUrl = "https://checkout.stripe.com/example-session";
        
        // In a real app, this would redirect to Stripe
        setLoading(false);
        
        // Simulate redirecting to Stripe (in a real app, we'd do window.location.href = checkoutUrl)
        console.log("Redirecting to:", checkoutUrl);
      } catch (err) {
        setLoading(false);
        setError("Failed to create checkout session. Please try again later.");
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <Button 
        variant="outline"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to billing
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Complete your purchase</CardTitle>
          <CardDescription>
            You'll be redirected to Stripe to complete your payment securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 text-brand-primary animate-spin mb-4" />
              <p>Creating your checkout session...</p>
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Starter Plan (Monthly)</span>
                  <span>$29.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>$29.00</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!loading && !error && (
            <Button className="w-full bg-brand-primary" onClick={() => {
              // In a real app, we would actually redirect to Stripe here
              window.open("https://checkout.stripe.com/example-session", "_self");
            }}>
              Proceed to payment
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingCheckout;
