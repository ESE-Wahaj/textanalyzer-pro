import Icon from '../../../components/AppIcon';
import { ReadabilityMetrics } from '../types';

interface ReadabilityMetricsPanelProps {
  originalMetrics: ReadabilityMetrics;
  simplifiedMetrics: ReadabilityMetrics;
}

const ReadabilityMetricsPanel = ({
  originalMetrics,
  simplifiedMetrics,
}: ReadabilityMetricsPanelProps) => {
  const calculateImprovement = (original: number, simplified: number, higherIsBetter: boolean = true) => {
    const diff = higherIsBetter ? simplified - original : original - simplified;
    const percentage = ((diff / original) * 100).toFixed(1);
    return { diff: diff.toFixed(1), percentage };
  };

  const metrics = [
    {
      label: 'Flesch Reading Ease',
      icon: 'TrendingUp',
      original: originalMetrics.fleschScore,
      simplified: simplifiedMetrics.fleschScore,
      higherIsBetter: true,
      suffix: '',
    },
    {
      label: 'Gunning Fog Index',
      icon: 'Cloud',
      original: originalMetrics.gunningFog,
      simplified: simplifiedMetrics.gunningFog,
      higherIsBetter: false,
      suffix: '',
    },
    {
      label: 'Grade Level',
      icon: 'GraduationCap',
      original: originalMetrics.gradeLevel,
      simplified: simplifiedMetrics.gradeLevel,
      higherIsBetter: false,
      suffix: '',
    },
    {
      label: 'Avg. Sentence Length',
      icon: 'Type',
      original: originalMetrics.averageSentenceLength,
      simplified: simplifiedMetrics.averageSentenceLength,
      higherIsBetter: false,
      suffix: ' words',
    },
    {
      label: 'Complex Words',
      icon: 'AlertTriangle',
      original: originalMetrics.complexWordPercentage,
      simplified: simplifiedMetrics.complexWordPercentage,
      higherIsBetter: false,
      suffix: '%',
    },
  ];

  return (
    <div className="w-80 bg-card border-l border-border overflow-auto">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="BarChart3" size={18} />
          Readability Metrics
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {metrics.map((metric) => {
          const improvement = calculateImprovement(
            metric.original,
            metric.simplified,
            metric.higherIsBetter
          );
          const isImproved = parseFloat(improvement.diff) > 0;

          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Icon name={metric.icon} size={14} />
                  {metric.label}
                </span>
                {isImproved && (
                  <span className="text-xs font-semibold text-success flex items-center gap-1">
                    <Icon name="TrendingUp" size={12} />
                    {improvement.percentage}%
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Original</span>
                  <span className="font-semibold text-foreground">
                    {metric.original.toFixed(1)}
                    {metric.suffix}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-destructive/50 rounded-full"
                    style={{ width: `${Math.min((metric.original / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Simplified</span>
                  <span className="font-semibold text-success">
                    {metric.simplified.toFixed(1)}
                    {metric.suffix}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full"
                    style={{ width: `${Math.min((metric.simplified / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-4 border-t border-border">
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-semibold text-success">Overall Improvement</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your text is now significantly easier to read with improved clarity and reduced
              complexity across all metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadabilityMetricsPanel;