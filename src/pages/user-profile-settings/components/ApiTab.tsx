import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ApiAccess } from '../types';

interface ApiTabProps {
  apiAccess: ApiAccess;
}

const ApiTab = ({ apiAccess }: ApiTabProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const usagePercentage = (apiAccess.requestsUsed / apiAccess.requestsLimit) * 100;

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiAccess.apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleRegenerateKey = () => {
    // Mock regeneration
    alert('API key regeneration would be implemented here');
  };

  const maskedApiKey = apiAccess.apiKey.slice(0, 8) + '••••••••••••••••' + apiAccess.apiKey.slice(-4);

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">API Key</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm text-foreground">
              {showApiKey ? apiAccess.apiKey : maskedApiKey}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKey(!showApiKey)}
              iconName={showApiKey ? 'EyeOff' : 'Eye'}
            >
              {showApiKey ? 'Hide' : 'Show'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyApiKey}
              iconName={copySuccess ? 'Check' : 'Copy'}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRegenerateKey}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Regenerate Key
            </Button>
            <p className="text-xs text-muted-foreground">
              Last used: {apiAccess.lastUsed}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">API Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Requests This Month</p>
              <p className="text-sm font-medium text-foreground">
                {apiAccess.requestsUsed.toLocaleString()} / {apiAccess.requestsLimit.toLocaleString()}
              </p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">API Status</p>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              {apiAccess.status}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">API Documentation</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-150 cursor-pointer">
            <Icon name="Book" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Getting Started Guide</p>
              <p className="text-xs text-muted-foreground">
                Learn how to integrate TextAnalyzer Pro API into your applications
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-150 cursor-pointer">
            <Icon name="Code" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">API Reference</p>
              <p className="text-xs text-muted-foreground">
                Complete documentation of all available endpoints and parameters
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-150 cursor-pointer">
            <Icon name="FileCode" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Code Examples</p>
              <p className="text-xs text-muted-foreground">
                Sample code in Python, JavaScript, and other popular languages
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Keep Your API Key Secure</p>
            <p className="text-xs text-muted-foreground">
              Never share your API key publicly or commit it to version control. Regenerate immediately if compromised.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTab;