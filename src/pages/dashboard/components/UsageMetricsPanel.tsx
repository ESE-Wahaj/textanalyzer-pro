import Icon from '../../../components/AppIcon';
import type { UsageMetrics } from '../types';

interface UsageMetricsPanelProps {
  metrics: UsageMetrics;
}

const UsageMetricsPanel = ({ metrics }: UsageMetricsPanelProps) => {
  const metricCards = [
    {
      id: 'analyses',
      label: 'Monthly Analyses',
      value: metrics.monthlyAnalysisCount,
      icon: 'FileSearch',
      color: 'text-primary bg-primary/10',
      trend: '+12%',
      trendUp: true,
    },
    {
      id: 'improvement',
      label: 'Avg. Improvement',
      value: `${metrics.readabilityImprovement}%`,
      icon: 'TrendingUp',
      color: 'text-success bg-success/10',
      trend: '+8%',
      trendUp: true,
    },
    {
      id: 'collaboration',
      label: 'Team Activity',
      value: metrics.collaborationActivity,
      icon: 'Users',
      color: 'text-secondary bg-secondary/10',
      trend: '+15%',
      trendUp: true,
    },
    {
      id: 'documents',
      label: 'Total Documents',
      value: metrics.totalDocuments,
      icon: 'FileText',
      color: 'text-warning bg-warning/10',
      trend: '+23',
      trendUp: true,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Usage Analytics</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metricCards.map((metric) => (
          <div
            key={metric.id}
            className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors duration-150"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric.color} flex items-center justify-center`}>
                <Icon name={metric.icon} size={20} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  metric.trendUp ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10'
                }`}
              >
                {metric.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Monthly Progress</span>
          <span className="text-sm text-muted-foreground">75% of goal</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
};

export default UsageMetricsPanel;