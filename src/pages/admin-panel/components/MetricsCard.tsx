import Icon from '../../../components/AppIcon';

interface MetricsCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

const MetricsCard = ({ label, value, change, trend, icon, color }: MetricsCardProps) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-150">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          <div className="flex items-center gap-1">
            <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-muted-foreground ml-1">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;