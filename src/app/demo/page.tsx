'use client';

import { useState } from "react";
import SimpleHeader from "@/components/layout/SimpleHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DemoPage = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  
  return (
    <div>
      <SimpleHeader title="Product Demo" />
      <div className="container py-12 px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-display font-bold mb-6">See TokenMeter in Action</h1>
          <p className="text-xl text-gray-700 mb-8">
            Watch our demo to see how TokenMeter helps you optimize your LLM costs without sacrificing quality.
          </p>
          <Button 
            onClick={() => setVideoOpen(true)}
            size="lg"
            className="bg-brand-primary hover:bg-brand-dark text-white"
          >
            Watch Demo
          </Button>
        </div>
        
        <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="TokenMeter Product Demo" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <div className="rounded-full bg-brand-light w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Real-time Visibility</h3>
            <p className="text-gray-600">
              See exactly where your LLM spending is going across models, features, and applications.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="rounded-full bg-brand-light w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Smart Cost Optimization</h3>
            <p className="text-gray-600">
              Receive AI-generated suggestions to reduce costs while maintaining output quality.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="rounded-full bg-brand-light w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Enterprise Security</h3>
            <p className="text-gray-600">
              Built with enterprise-grade security and SOC2 compliance (coming soon).
            </p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-display font-bold mb-6">Ready to start optimizing?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-dark text-white">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>TokenMeter Product Demo</DialogTitle>
            <DialogDescription>
              See how TokenMeter helps you monitor and optimize your LLM costs
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="TokenMeter Product Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoPage;
