
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface GuideContentProps {
  guidePath: string;
}

const GuideContent = ({ guidePath }: GuideContentProps) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return content;
};

export default GuideContent;
