
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-display font-bold mb-8">Terms of Service</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>1. Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>By accessing or using TokenMeter.AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          <p>If you do not agree with any of these terms, you are prohibited from using this service.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>2. Use License</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>TokenMeter.AI grants you a personal, non-transferable, non-exclusive license to use the service for monitoring and optimizing your AI model usage.</p>
          <p>This license does not include:</p>
          <ul>
            <li>Modifying or copying our materials</li>
            <li>Using the materials for commercial purposes</li>
            <li>Transferring the materials to another person</li>
            <li>Reverse engineering or attempting to extract the source code</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>3. Subscription and Billing</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>Your subscription will automatically renew unless canceled before the renewal date.</p>
          <p>You are responsible for all charges incurred under your account.</p>
          <p>Refunds are provided in accordance with our Refund Policy.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>4. Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>In no event shall TokenMeter.AI be liable for any damages arising out of the use or inability to use the materials on our service.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>5. Term and Termination</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms of Service.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6. Modifications</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>TokenMeter.AI may revise these Terms of Service at any time without notice. By using this service, you are agreeing to be bound by the current version of these Terms of Service.</p>
          <p>Last updated: May 18, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
