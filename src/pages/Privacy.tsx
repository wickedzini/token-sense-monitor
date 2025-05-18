
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8">Privacy Policy</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>This Privacy Policy describes how TokenMeter.AI ("we", "our", or "us") collects, uses, and shares your personal information when you use our services.</p>
          <p>By using TokenMeter.AI, you agree to the collection and use of information in accordance with this policy.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>When you use our service, we may collect the following types of information:</p>
          <ul>
            <li>Account information (name, email, company)</li>
            <li>API usage data and analytics</li>
            <li>Model usage patterns</li>
            <li>Payment information</li>
          </ul>
          <p>We do not have access to or collect the content of your prompts or completions.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process payments</li>
            <li>Send you service updates and administrative messages</li>
            <li>Respond to your inquiries</li>
            <li>Monitor and analyze usage patterns</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Updates to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          <p>Last updated: May 18, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;
