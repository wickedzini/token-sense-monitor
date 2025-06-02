'use client';

import SimpleHeader from "@/components/layout/SimpleHeader";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    {
      name: "Jane Smith",
      role: "CEO & Co-founder",
      bio: "Former ML Engineer at OpenAI, passionate about making AI accessible and cost-efficient."
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-founder",
      bio: "Built infrastructure at Scale AI, expert in distributed systems and machine learning operations."
    },
    {
      name: "Alicia Garcia",
      role: "Head of Product",
      bio: "Led product teams at Anthropic and Google, focused on enterprise AI solutions."
    },
    {
      name: "David Johnson",
      role: "Lead Engineer",
      bio: "System architect with experience at AWS and Stripe, specialized in high-throughput data processing."
    }
  ];

  return (
    <div>
      <SimpleHeader title="About Us" />
      <div className="container py-12 px-4 mx-auto">
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-display font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-gray-700 mb-8">
            We're building tools that make AI accessible, affordable, and sustainable for businesses of all sizes. 
            Our mission is to help organizations optimize their AI spend while maximizing the value they get from language models.
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 bg-brand-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-display font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              TokenMeter began in early 2024 when our founders noticed a common challenge: as AI adoption grew within organizations, so did the costs—often unpredictably.
            </p>
            <p className="text-gray-700 mb-4">
              Having worked at leading AI companies, our team understood the technical challenges of optimizing AI usage. We realized that many companies lacked visibility into their AI spending patterns and were missing opportunities for cost efficiency.
            </p>
            <p className="text-gray-700">
              We built TokenMeter to solve this exact problem: a platform that provides real-time visibility into AI usage, automatically identifies optimization opportunities, and helps teams implement best practices for cost-effective AI.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-display font-bold mb-4">Why TokenMeter?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-brand-light rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">AI-Native Analytics</h3>
                  <p className="text-gray-600">Built specifically for the unique challenges of AI model usage and pricing.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-brand-light rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Multi-Provider Support</h3>
                  <p className="text-gray-600">Single dashboard for all your AI providers: OpenAI, Anthropic, Cohere, and more.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-brand-light rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Smart Recommendations</h3>
                  <p className="text-gray-600">AI-powered suggestions to optimize costs without sacrificing quality.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-brand-light rounded-full p-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Enterprise Ready</h3>
                  <p className="text-gray-600">Built for scale with enterprise-grade security, compliance, and support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-10"></div>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                  <p className="text-brand-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Our Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 bg-brand-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                  </svg>
                </div>
              </div>
              <h3 className="font-medium mb-2">Data Collection</h3>
              <p className="text-gray-600 text-sm">
                Built on Rust for performance, with secure collectors for each LLM provider API.
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 bg-brand-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
              </div>
              <h3 className="font-medium mb-2">Analytics Engine</h3>
              <p className="text-gray-600 text-sm">
                Powered by Python and Apache Spark for real-time data processing and analysis.
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 bg-brand-light rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A4CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>
              <h3 className="font-medium mb-2">Suggestion System</h3>
              <p className="text-gray-600 text-sm">
                Uses machine learning to identify optimization opportunities based on usage patterns.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're a remote-first team passionate about AI, data, and building products that make a difference.
          </p>
          <a href="/careers" className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-2 rounded-md text-sm font-medium inline-block">
            View Career Opportunities
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
