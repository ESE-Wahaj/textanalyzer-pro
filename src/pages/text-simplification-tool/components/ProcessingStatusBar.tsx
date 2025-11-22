import Icon from '../../../components/AppIcon';
import { ProcessingStatus } from '../types';

interface ProcessingStatusBarProps {
  status: ProcessingStatus;
}

const ProcessingStatusBar = ({ status }: ProcessingStatusBarProps) => {
  if (!status.isProcessing && !status.error) return null;

  return (
    <div className="bg-card border-b border-border p-4">
      {status.isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium flex items-center gap-2">
              <Icon name="Loader2" size={16} className="animate-spin" />
              {status.currentStep}
            </span>
            <span className="text-muted-foreground">{status.progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${status.progress}%` }}
            />
          </div>
        </div>
      )}

      {status.error && (
        <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive rounded-lg">
          <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-destructive mb-1">Processing Error</p>
            <p className="text-xs text-muted-foreground">{status.error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatusBar;