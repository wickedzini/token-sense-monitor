import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - TokenMeter',
  description: 'TokenMeter API documentation and guides',
};

export default function DocumentationPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Documentation</h1>
      <div className="max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          {/* Documentation content will be added here */}
        </div>
      </div>
    </div>
  );
} 