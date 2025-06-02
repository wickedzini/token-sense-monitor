import { useState, useEffect, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown, { Components } from "react-markdown";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clipboard, Check, Info, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import React from 'react';

interface GuideContentProps {
  guidePath: string;
}

const GuideContent = ({ guidePath }: GuideContentProps) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuideContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(guidePath);
        if (!response.ok) {
          throw new Error(`Failed to load guide: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error("Error loading guide:", err);
        setError("Failed to load guide content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (guidePath) {
      fetchGuideContent();
    }
  }, [guidePath]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(code);
    toast.success("Code copied to clipboard");
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-3/4 mt-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-display font-bold mt-8 mb-4" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-display font-bold mt-6 mb-3" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-display font-semibold mt-5 mb-2" {...props}>{children}</h3>
    ),
    ul: ({ children, ...props }) => (
      <ul className="pl-6 my-4 list-disc space-y-2" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="pl-6 my-4 list-decimal space-y-2" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1" {...props}>{children}</li>
    ),
    p: ({ children, ...props }) => (
      <p className="my-3 leading-relaxed" {...props}>{children}</p>
    ),
    a: ({ href, children, ...props }) => (
      <a href={href} className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: {children?: ReactNode} & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <Alert className="my-4 bg-brand-light/20 border-brand-primary/30" {...props as React.HTMLAttributes<HTMLDivElement>}>
        <Info className="h-5 w-5" />
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const code = String(children).replace(/\n$/, '');
      
      if (inline) {
        return (
          <code className="bg-gray-100 text-brand-dark px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
      
      if (match) {
        return (
          <div className="relative my-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-300"
                onClick={() => handleCopyCode(code)}
              >
                {copiedSnippet === code ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          </div>
        );
      }
      
      return (
        <div className="relative my-4">
          <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => handleCopyCode(code)}
            >
              {copiedSnippet === code ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </Button>
            <pre>
              <code className="text-gray-800" {...props}>
                {children}
              </code>
            </pre>
          </div>
        </div>
      );
    }
  };

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

export default GuideContent;
