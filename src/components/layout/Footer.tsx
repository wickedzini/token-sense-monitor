
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link></li>
              <li><Link to="/suggestions" className="text-sm text-gray-600 hover:text-gray-900">Suggestions</Link></li>
              <li><Link to="/status" className="text-sm text-gray-600 hover:text-gray-900">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm text-gray-600 hover:text-gray-900">Documentation</Link></li>
              <li><Link to="/help" className="text-sm text-gray-600 hover:text-gray-900">API Reference</Link></li>
              <li><a href="https://tokenmeter.ai/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="https://tokenmeter.ai/about" className="text-sm text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="https://tokenmeter.ai/careers" className="text-sm text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><a href="https://tokenmeter.ai/security" className="text-sm text-gray-600 hover:text-gray-900">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="font-display font-bold text-lg text-gray-900">TokenMeter.AI</span>
          </div>
          
          <div className="text-sm text-gray-600">
            © 2025 TokenMeter, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
