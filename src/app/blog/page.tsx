'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Link from "next/link";
import SimpleHeader from "@/components/layout/SimpleHeader";

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Optimizing GPT-4 Usage: Balance Cost and Performance",
    excerpt: "Learn how to reduce your GPT-4 costs by up to 40% without compromising on output quality by strategically selecting endpoints and optimizing prompts.",
    date: new Date(2025, 4, 15),
    category: "cost-optimization",
    imageUrl: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Claude vs. GPT-4: Performance Benchmarks for Enterprise Use Cases",
    excerpt: "Our detailed analysis compares Anthropic's Claude models against OpenAI's GPT-4 across 12 enterprise tasks, revealing surprising strengths and weaknesses.",
    date: new Date(2025, 4, 10),
    category: "benchmarks",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "5 Ways to Reduce Token Usage with Embeddings",
    excerpt: "Implement these five techniques to use embeddings more effectively, reducing your token consumption and API costs while improving performance.",
    date: new Date(2025, 4, 5),
    category: "technical",
    imageUrl: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "The True Cost of Self-Hosting LLMs in 2025",
    excerpt: "We break down the hardware, maintenance, and operational costs of self-hosting LLMs versus using API services, with recommendations for different scales.",
    date: new Date(2025, 3, 28),
    category: "infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    title: "Case Study: How BigTech Corp Reduced LLM Spend by 60%",
    excerpt: "Learn how a Fortune 500 company implemented TokenMeter and strategic optimizations to dramatically reduce their monthly AI API spending.",
    date: new Date(2025, 3, 20),
    category: "case-study",
    imageUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    title: "Understanding Token Counting Across Different LLMs",
    excerpt: "An in-depth guide to how different LLM providers count tokens and the implications for your applications and budget planning.",
    date: new Date(2025, 3, 15),
    category: "technical",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// Blog post card component
const BlogPostCard = ({ post }: { post: typeof blogPosts[0] }) => (
  <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
    <div className="aspect-video w-full overflow-hidden">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center mb-1">
        <Badge variant="secondary" className="bg-brand-light/30 text-brand-primary hover:bg-brand-light/50">
          {post.category.replace('-', ' ')}
        </Badge>
        <div className="text-xs text-gray-500 flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          <span>{format(post.date, 'MMM d, yyyy')}</span>
        </div>
      </div>
      <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
    </CardHeader>
    <CardContent className="pb-4 flex-grow">
      <CardDescription className="text-gray-600">
        {post.excerpt}
      </CardDescription>
    </CardContent>
    <div className="px-6 pb-6 mt-auto">
      <Button variant="link" className="p-0 h-auto font-medium text-brand-primary flex items-center gap-1">
        Read more <ArrowRight size={14} />
      </Button>
    </div>
  </Card>
);

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'cost-optimization', name: 'Cost Optimization' },
    { id: 'technical', name: 'Technical' },
    { id: 'benchmarks', name: 'Benchmarks' },
    { id: 'case-study', name: 'Case Studies' },
    { id: 'infrastructure', name: 'Infrastructure' }
  ];

  return (
    <div>
      <SimpleHeader title="Blog & Resources" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-4">TokenMeter Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and best practices for optimizing your LLM usage and costs.
            </p>
          </div>
          
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Tabs value={filterCategory} onValueChange={setFilterCategory} className="w-full">
                <TabsList className="w-full sm:w-auto overflow-x-auto">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium mb-2">No articles found</h2>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Link href={`/blog/${post.id}`} key={post.id} className="text-inherit no-underline">
                  <BlogPostCard post={post} />
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button>Load More Articles</Button>
          </div>
          
          <div className="mt-16 bg-brand-light/20 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-display font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-gray-600 max-w-lg mx-auto">
              Get the latest articles, case studies, and LLM optimization tips delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-grow" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
