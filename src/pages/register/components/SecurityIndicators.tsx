import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const indicators = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      color: 'var(--color-success)',
    },
    {
      icon: 'Lock',
      text: 'GDPR Compliant',
      color: 'var(--color-primary)',
    },
    {
      icon: 'CheckCircle',
      text: 'SOC 2 Certified',
      color: 'var(--color-secondary)',
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {indicators?.map((indicator, index) => (
        <div key={index} className="flex items-center gap-2">
          <Icon name={indicator?.icon} size={16} color={indicator?.color} />
          <span className="text-xs text-muted-foreground">{indicator?.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SecurityIndicators;