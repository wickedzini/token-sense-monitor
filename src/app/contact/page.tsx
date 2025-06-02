'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-medium mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about our service or need assistance? 
            Our team is here to help you maximize your AI model efficiency.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-brand-primary">support@tokenmeter.ai</p>
            </div>
            
            <div>
              <h3 className="font-medium">Office</h3>
              <p className="text-gray-600">
                123 AI Avenue<br />
                San Francisco, CA 94103<br />
                United States
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Hours</h3>
              <p className="text-gray-600">
                Monday-Friday: 9AM - 5PM PST<br />
                Weekend: Closed
              </p>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
