
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import type { AnalysisDepth } from '../types';

interface AnalysisControlsProps {
  selectedDepth: AnalysisDepth['value'];
  onDepthChange: (depth: AnalysisDepth['value']) => void;
  enableSentiment: boolean;
  onSentimentToggle: (enabled: boolean) => void;
  enableKeywords: boolean;
  onKeywordsToggle: (enabled: boolean) => void;
}

const AnalysisControls = ({
  selectedDepth,
  onDepthChange,
  enableSentiment,
  onSentimentToggle,
  enableKeywords,
  onKeywordsToggle,
}: AnalysisControlsProps) => {
  const depthOptions = [
    {
      value: 'quick',
      label: 'Quick Analysis',
      description: 'Basic readability metrics (30 seconds)',
    },
    {
      value: 'standard',
      label: 'Standard Analysis',
      description: 'Comprehensive metrics with sentence analysis (1-2 minutes)',
    },
    {
      value: 'comprehensive',
      label: 'Comprehensive Analysis',
      description: 'Full NLP analysis with detailed insights (2-3 minutes)',
    },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Analysis Settings</h3>
        <Select
          label="Analysis Depth"
          description="Choose the level of detail for text analysis"
          options={depthOptions}
          value={selectedDepth}
          onChange={(value) => onDepthChange(value as AnalysisDepth['value'])}
        />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Additional Features</h4>
        <Checkbox
          label="Sentiment Analysis"
          description="Analyze emotional tone and sentiment"
          checked={enableSentiment}
          onChange={(e) => onSentimentToggle(e.target.checked)}
        />
        <Checkbox
          label="Keyword Extraction"
          description="Identify key terms and phrases"
          checked={enableKeywords}
          onChange={(e) => onKeywordsToggle(e.target.checked)}
        />
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-primary">i</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Processing time varies based on text length and selected depth. Comprehensive analysis provides the most detailed insights but takes longer to complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisControls;