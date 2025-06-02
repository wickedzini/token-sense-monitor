import SimpleHeader from "@/components/layout/SimpleHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SecurityPage = () => {
  return (
    <div>
      <SimpleHeader title="Security" />
      <div className="container py-12 px-4 mx-auto">
        <div className="mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-6">Security at TokenMeter</h1>
          <p className="text-xl text-gray-700 mb-4">
            We take the security and privacy of your data seriously. TokenMeter is built with security-first principles 
            to ensure your sensitive information remains protected.
          </p>
          <p className="text-gray-600">
            Our team brings experience from leading technology companies with robust security practices, 
            and we continuously monitor and improve our security posture.
          </p>
        </div>
        
        {/* Main security sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Encryption at Rest and in Transit</h3>
              <p>
                All data stored in TokenMeter is encrypted at rest using AES-256 encryption. 
                Additionally, all data in transit is protected with TLS 1.3, ensuring secure communication 
                between your systems and our platform.
              </p>
              
              <h3>Access Controls</h3>
              <p>
                We implement role-based access controls (RBAC) to ensure that only authorized personnel 
                can access specific data. Our team members only have access to the minimum data necessary 
                to perform their job functions.
              </p>
              
              <h3>Data Segregation</h3>
              <p>
                Customer data is logically separated within our systems, preventing any potential data leakage 
                between different customer accounts.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Cloud Security</h3>
              <p>
                TokenMeter is hosted on AWS, leveraging their comprehensive security features including 
                VPC isolation, security groups, and network ACLs. We follow AWS best practices for secure 
                infrastructure design.
              </p>
              
              <h3>Regular Scanning and Patching</h3>
              <p>
                Our infrastructure undergoes regular vulnerability scanning, and we maintain a rigorous 
                patching schedule to address any identified security issues promptly.
              </p>
              
              <h3>Monitoring and Alerting</h3>
              <p>
                We employ continuous monitoring with automated alerts for any suspicious activity or 
                potential security incidents, allowing for rapid response.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>API Authentication</h3>
              <p>
                TokenMeter APIs use token-based authentication with short-lived access tokens and longer-lived 
                refresh tokens. All API requests must be authenticated with valid tokens.
              </p>
              
              <h3>Rate Limiting</h3>
              <p>
                We implement rate limiting to protect against brute force attacks and API abuse, helping to 
                ensure the stability and security of the platform.
              </p>
              
              <h3>Input Validation</h3>
              <p>
                All API endpoints implement strict input validation to protect against injection attacks and 
                other common API vulnerabilities.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Secure Development Practices</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Security Review Process</h3>
              <p>
                Our development process includes security reviews at multiple stages, including design reviews, 
                code reviews, and pre-deployment security checks.
              </p>
              
              <h3>Dependency Management</h3>
              <p>
                We maintain a thorough process for managing and updating dependencies, with automated scanning 
                for known vulnerabilities.
              </p>
              
              <h3>Secure Coding Guidelines</h3>
              <p>
                Our engineering team follows OWASP secure coding guidelines to prevent common security issues 
                during development.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Compliance Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-6">Compliance & Certifications</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium mb-3">Current Compliance</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>GDPR Compliant</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>CCPA Compliant</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">On Our Roadmap</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>SOC 2 Type II (Q3 2025)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>HIPAA Compliance (Q4 2025)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Security Assessments</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Annual penetration testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Quarterly vulnerability assessments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Data Retention Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold mb-6">Data Retention</h2>
          <Card>
            <CardContent className="p-6">
              <p className="mb-6">
                TokenMeter's data retention policies are designed to balance analytical needs with privacy and security concerns.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Data Type</th>
                      <th className="text-left py-3 px-4">Starter Plan</th>
                      <th className="text-left py-3 px-4">Growth Plan</th>
                      <th className="text-left py-3 px-4">Enterprise Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">Usage Data</td>
                      <td className="py-4 px-4">30 days</td>
                      <td className="py-4 px-4">90 days</td>
                      <td className="py-4 px-4">12+ months</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">Cost Data</td>
                      <td className="py-4 px-4">30 days</td>
                      <td className="py-4 px-4">90 days</td>
                      <td className="py-4 px-4">12+ months</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium">Metadata</td>
                      <td className="py-4 px-4">30 days</td>
                      <td className="py-4 px-4">90 days</td>
                      <td className="py-4 px-4">12+ months</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Audit Logs</td>
                      <td className="py-4 px-4">30 days</td>
                      <td className="py-4 px-4">90 days</td>
                      <td className="py-4 px-4">24+ months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="mt-6 text-gray-600 text-sm">
                Enterprise customers can configure custom retention periods to meet specific compliance requirements.
                Content data (prompts/completions) is not stored by default unless explicitly enabled by the customer.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Security FAQ */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-6">Security FAQ</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Does TokenMeter store the content of my LLM prompts or completions?</h3>
                <p className="text-gray-600">
                  No. By default, TokenMeter does not store the content of prompts or completions. We only 
                  collect metadata such as token counts, model used, latency, and cost information. For customers 
                  who explicitly opt-in to content logging for debugging or analysis purposes, that data is 
                  encrypted and stored separately with additional access controls.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">How do you handle API keys for LLM providers?</h3>
                <p className="text-gray-600">
                  API keys for LLM providers are encrypted at rest using AES-256 encryption. Keys are never 
                  stored in plaintext and are only decrypted in memory when needed to make API calls to collect 
                  usage data. We recommend using restricted API keys with read-only permissions when integrating 
                  with TokenMeter.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Can I delete my data from TokenMeter?</h3>
                <p className="text-gray-600">
                  Yes. You can request the deletion of your data at any time through your account settings or 
                  by contacting our support team. Upon account closure, all your data is permanently deleted 
                  within 30 days in accordance with our data retention policy.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Does TokenMeter offer Single Sign-On (SSO)?</h3>
                <p className="text-gray-600">
                  Yes, TokenMeter offers SSO integration with major identity providers including Google Workspace, 
                  Okta, Auth0, and Microsoft Entra ID (formerly Azure AD). SSO is available on our Growth and 
                  Enterprise plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Security Contact */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-medium mb-4">Security Contact</h2>
          <p className="text-gray-600 mb-4">
            For security inquiries or to report vulnerabilities, please contact our security team.
          </p>
          <a href="mailto:security@tokenmeter.ai" className="text-brand-primary hover:underline">
            security@tokenmeter.ai
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
