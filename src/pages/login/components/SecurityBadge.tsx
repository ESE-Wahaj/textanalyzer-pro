import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Icon name="Shield" size={16} color="var(--color-success)" />
        <span>Secured with 256-bit SSL encryption</span>
      </div>
      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="flex items-center gap-1">
          <Icon name="Lock" size={14} color="var(--color-muted-foreground)" />
          <span className="text-xs text-muted-foreground">GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="CheckCircle2" size={14} color="var(--color-success)" />
          <span className="text-xs text-muted-foreground">SOC 2 Certified</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;