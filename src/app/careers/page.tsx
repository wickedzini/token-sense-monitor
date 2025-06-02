'use client';
import SimpleHeader from "@/components/layout/SimpleHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Careers = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for your interest! We'll notify you about future openings.");
      setEmail("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <SimpleHeader title="Careers" />
      <div className="container py-12 px-4 mx-auto">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-display font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-700 mb-8">
            We're building tools to make AI more accessible, affordable, and effective. While we're not actively hiring right now, we'd love to connect with talented individuals for future opportunities.
          </p>
          <div className="inline-flex justify-center items-center px-4 py-2 rounded-md bg-amber-100 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>We're not actively hiring at the moment</span>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Build for Impact</h3>
              <p className="text-gray-600">
                We focus on solving real problems that drive meaningful results. Every feature we build has a clear purpose aimed at helping our customers succeed.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Global Perspective</h3>
              <p className="text-gray-600">
                We're a remote-first company with team members across different continents. We embrace diverse viewpoints and believe they lead to better products.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Excellence in Execution</h3>
              <p className="text-gray-600">
                We hold ourselves to high standards. From code quality to customer interactions, we strive for excellence in everything we do.
              </p>
            </div>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-6 text-center">Why Work With Us</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex gap-4">
              <div className="text-brand-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Remote-First Culture</h3>
                <p className="text-gray-600">Work from anywhere in the world with flexible hours.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-brand-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Competitive Compensation</h3>
                <p className="text-gray-600">Salary, equity, and benefits packages designed to attract top talent.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-brand-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Growth Opportunities</h3>
                <p className="text-gray-600">Join a fast-growing startup where your impact is visible and valued.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-brand-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Learning Budget</h3>
                <p className="text-gray-600">Annual allowance for conferences, courses, books, and other learning resources.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-brand-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Home Office Setup</h3>
                <p className="text-gray-600">Budget for creating a comfortable and productive work environment.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-brand-primary mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Team Retreats</h3>
                <p className="text-gray-600">Regular in-person gatherings to connect, collaborate, and celebrate.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Form */}
        <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-display font-bold mb-4 text-center">Get Notified About Future Openings</h2>
          <p className="text-gray-600 mb-6 text-center">
            Join our talent community to be the first to hear about new roles.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button type="submit" disabled={submitting} className="bg-brand-primary hover:bg-brand-dark text-white">
              {submitting ? "Submitting..." : "Notify Me"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;
