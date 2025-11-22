import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { SubscriptionInfo } from '../types';

interface SubscriptionTabProps {
  subscription: SubscriptionInfo;
}

const SubscriptionTab = ({ subscription }: SubscriptionTabProps) => {
  const usagePercentage = (subscription.analysisCount / subscription.analysisLimit) * 100;
  const storagePercentage = (subscription.storageUsed / subscription.storageLimit) * 100;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '100 analyses per month',
        '1 GB storage',
        'Basic readability metrics',
        'Email support',
      ],
      current: subscription.plan === 'Free',
    },
    {
      name: 'Pro',
      price: '$29',
      features: [
        '1,000 analyses per month',
        '10 GB storage',
        'Advanced NLP features',
        'Priority support',
        'Team collaboration',
        'API access',
      ],
      current: subscription.plan === 'Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      features: [
        'Unlimited analyses',
        '100 GB storage',
        'Custom models',
        'Dedicated support',
        'Advanced security',
        'SLA guarantee',
      ],
      current: subscription.plan === 'Enterprise',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              subscription.status === 'Active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
            }`}
          >
            {subscription.status}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Plan</p>
            <p className="text-base font-semibold text-foreground">{subscription.plan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
            <p className="text-base font-semibold text-foreground">{subscription.billingCycle}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
            <p className="text-base font-semibold text-foreground">
              {subscription.nextBillingDate}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Usage Statistics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Analysis Usage</p>
              <p className="text-sm font-medium text-foreground">
                {subscription.analysisCount} / {subscription.analysisLimit}
              </p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <p className="text-sm font-medium text-foreground">
                {subscription.storageUsed} GB / {subscription.storageLimit} GB
              </p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-lg border-2 transition-all duration-150 ${
                plan.current
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h4>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? 'outline' : 'default'}
                fullWidth
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Need a Custom Plan?</p>
            <p className="text-xs text-muted-foreground mb-3">
              Contact our sales team for enterprise solutions tailored to your organization's needs.
            </p>
            <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;