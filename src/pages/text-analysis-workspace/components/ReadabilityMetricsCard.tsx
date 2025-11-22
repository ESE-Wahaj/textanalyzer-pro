import Icon from '../../../components/AppIcon';
import type { ReadabilityMetrics } from '../types';

interface ReadabilityMetricsCardProps {
  metrics: ReadabilityMetrics;
}

const ReadabilityMetricsCard = ({ metrics }: ReadabilityMetricsCardProps) => {
  const getScoreColor = (score: number, isReverse: boolean = false) => {
    if (isReverse) {
      if (score >= 80) return 'text-success';
      if (score >= 60) return 'text-warning';
      return 'text-destructive';
    }
    if (score <= 8) return 'text-success';
    if (score <= 12) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number, isReverse: boolean = false) => {
    if (isReverse) {
      if (score >= 80) return 'bg-success/10';
      if (score >= 60) return 'bg-warning/10';
      return 'bg-destructive/10';
    }
    if (score <= 8) return 'bg-success/10';
    if (score <= 12) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const metricsData = [
    {
      name: 'Flesch Reading Ease',
      value: metrics.fleschReadingEase.toFixed(1),
      description: 'Higher is easier',
      isReverse: true,
    },
    {
      name: 'Flesch-Kincaid Grade',
      value: metrics.fleschKincaidGrade.toFixed(1),
      description: 'Grade level required',
      isReverse: false,
    },
    {
      name: 'Gunning Fog Index',
      value: metrics.gunningFogIndex.toFixed(1),
      description: 'Years of education',
      isReverse: false,
    },
    {
      name: 'SMOG Index',
      value: metrics.smogIndex.toFixed(1),
      description: 'Grade level',
      isReverse: false,
    },
    {
      name: 'Coleman-Liau Index',
      value: metrics.colemanLiauIndex.toFixed(1),
      description: 'Grade level',
      isReverse: false,
    },
    {
      name: 'Automated Readability',
      value: metrics.automatedReadabilityIndex.toFixed(1),
      description: 'Grade level',
      isReverse: false,
    },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Readability Metrics</h3>
        </div>
        <div className={`px-3 py-1 rounded-full ${getScoreBg(metrics.averageGradeLevel)}`}>
          <span className={`text-sm font-medium ${getScoreColor(metrics.averageGradeLevel)}`}>
            Grade {metrics.averageGradeLevel.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsData.map((metric) => (
          <div key={metric.name} className="p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{metric.name}</p>
            <p className={`text-2xl font-bold mb-1 ${getScoreColor(parseFloat(metric.value), metric.isReverse)}`}>
              {metric.value}
            </p>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Understanding Readability Scores</p>
            <p className="text-xs text-muted-foreground">
              Lower grade levels indicate easier-to-read text. Aim for grade 8-10 for general audiences. Higher scores suggest more complex vocabulary and sentence structures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadabilityMetricsCard;