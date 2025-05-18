
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clipboard, Check, Info, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

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

  const components = {
    h1: ({ children }: {children: React.ReactNode}) => (
      <h1 className="text-3xl font-display font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: {children: React.ReactNode}) => (
      <h2 className="text-2xl font-display font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: {children: React.ReactNode}) => (
      <h3 className="text-xl font-display font-semibold mt-5 mb-2">{children}</h3>
    ),
    ul: ({ children }: {children: React.ReactNode}) => (
      <ul className="pl-6 my-4 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }: {children: React.ReactNode}) => (
      <ol className="pl-6 my-4 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }: {children: React.ReactNode}) => (
      <li className="mb-1">{children}</li>
    ),
    p: ({ children }: {children: React.ReactNode}) => (
      <p className="my-3 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }: {href?: string, children: React.ReactNode}) => (
      <a href={href} className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    blockquote: ({ children }: {children: React.ReactNode}) => (
      <Alert className="my-4 bg-brand-light/20 border-brand-primary/30">
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
