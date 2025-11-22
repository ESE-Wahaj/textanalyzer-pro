import Icon from '../../../components/AppIcon';
import { ArchiveStats } from '../types';

interface ArchiveStatsPanelProps {
  stats: ArchiveStats;
}

const ArchiveStatsPanel = ({ stats }: ArchiveStatsPanelProps) => {
  const storagePercentage = (stats.storageUsed / stats.storageLimit) * 100;

  const formatStorage = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} MB`;
    return `${(bytes / 1024).toFixed(2)} GB`;
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="BarChart3" size={24} color="var(--color-primary)" />
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Archive Statistics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="FileText" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
            <p className="font-heading font-semibold text-2xl text-foreground">
              {stats.totalDocuments}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={24} color="var(--color-success)" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Avg. Improvement</p>
            <p className="font-heading font-semibold text-2xl text-foreground">
              +{stats.averageImprovement}%
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="HardDrive" size={24} color="var(--color-secondary)" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
            <p className="font-heading font-semibold text-2xl text-foreground mb-2">
              {formatStorage(stats.storageUsed)} / {formatStorage(stats.storageLimit)}
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  storagePercentage > 90
                    ? 'bg-error'
                    : storagePercentage > 70
                    ? 'bg-warning' :'bg-success'
                }`}
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {storagePercentage.toFixed(1)}% used
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveStatsPanel;