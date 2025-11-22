import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import type { ExportFormat } from '../types';

interface ExportPanelProps {
  onExport: (format: ExportFormat['type'], options: ExportOptions) => void;
}

interface ExportOptions {
  includeMetrics: boolean;
  includeSentences: boolean;
  includeSentiment: boolean;
  includeKeywords: boolean;
}

const ExportPanel = ({ onExport }: ExportPanelProps) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat['type']>('pdf');
  const [options, setOptions] = useState<ExportOptions>({
    includeMetrics: true,
    includeSentences: true,
    includeSentiment: true,
    includeKeywords: true,
  });

  const formats: ExportFormat[] = [
    { type: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { type: 'docx', label: 'Word Document', icon: 'FileType' },
    { type: 'txt', label: 'Plain Text', icon: 'File' },
    { type: 'json', label: 'JSON Data', icon: 'Code' },
  ];

  const handleExport = () => {
    onExport(selectedFormat, options);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Export Analysis</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">Export Format</label>
          <div className="grid grid-cols-2 gap-2">
            {formats.map((format) => (
              <button
                key={format.type}
                onClick={() => setSelectedFormat(format.type)}
                className={`p-3 rounded-lg border transition-all duration-150 ${
                  selectedFormat === format.type
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <Icon name={format.icon} size={20} className="mx-auto mb-1" />
                <p className="text-xs font-medium">{format.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">Include in Export</label>
          <div className="space-y-2">
            <Checkbox
              label="Readability Metrics"
              checked={options.includeMetrics}
              onChange={(e) => setOptions({ ...options, includeMetrics: e.target.checked })}
            />
            <Checkbox
              label="Sentence Analysis"
              checked={options.includeSentences}
              onChange={(e) => setOptions({ ...options, includeSentences: e.target.checked })}
            />
            <Checkbox
              label="Sentiment Analysis"
              checked={options.includeSentiment}
              onChange={(e) => setOptions({ ...options, includeSentiment: e.target.checked })}
            />
            <Checkbox
              label="Keywords"
              checked={options.includeKeywords}
              onChange={(e) => setOptions({ ...options, includeKeywords: e.target.checked })}
            />
          </div>
        </div>
      </div>

      <Button
        variant="default"
        fullWidth
        iconName="Download"
        onClick={handleExport}
      >
        Export Analysis
      </Button>
    </div>
  );
};

export default ExportPanel;