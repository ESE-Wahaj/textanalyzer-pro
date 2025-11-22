import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { SimplificationModel, ExportOptions } from '../types';

interface SimplificationHeaderProps {
  documentTitle: string;
  onTitleChange: (title: string) => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  models: SimplificationModel[];
  onExport: (options: ExportOptions) => void;
  onSave: () => void;
  hasUnsavedChanges: boolean;
}

const SimplificationHeader = ({
  documentTitle,
  onTitleChange,
  selectedModel,
  onModelChange,
  models,
  onExport,
  onSave,
  hasUnsavedChanges,
}: SimplificationHeaderProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: ExportOptions['format']) => {
    onExport({
      format,
      includeComparison: true,
      includeMetrics: true,
      includeHighlighting: true,
    });
    setShowExportMenu(false);
  };

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.name,
    description: model.description,
  }));

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {isEditingTitle ? (
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              className="text-xl font-semibold bg-transparent border-b-2 border-primary focus:outline-none flex-1 min-w-0"
              autoFocus
            />
          ) : (
            <h1
              className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors truncate"
              onClick={() => setIsEditingTitle(true)}
            >
              {documentTitle}
            </h1>
          )}
          {hasUnsavedChanges && (
            <span className="text-xs text-warning flex items-center gap-1 flex-shrink-0">
              <Icon name="AlertCircle" size={14} />
              Unsaved
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-64">
            <Select
              options={modelOptions}
              value={selectedModel}
              onChange={onModelChange}
              placeholder="Select model"
            />
          </div>

          <Button variant="outline" onClick={onSave} iconName="Save" iconPosition="left">
            Save
          </Button>

          <div className="relative">
            <Button
              variant="default"
              onClick={() => setShowExportMenu(!showExportMenu)}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="FileText" size={18} />
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport('docx')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="FileText" size={18} />
                  Export as DOCX
                </button>
                <button
                  onClick={() => handleExport('txt')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="FileType" size={18} />
                  Export as TXT
                </button>
                <button
                  onClick={() => handleExport('html')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="Code" size={18} />
                  Export as HTML
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplificationHeader;