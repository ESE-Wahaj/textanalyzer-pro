import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import { AnalysisPreferences } from '../types';

interface PreferencesTabProps {
  preferences: AnalysisPreferences;
  onUpdate: (preferences: AnalysisPreferences) => void;
}

const PreferencesTab = ({ preferences, onUpdate }: PreferencesTabProps) => {
  const [formData, setFormData] = useState<AnalysisPreferences>(preferences);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const readabilityTargetOptions = [
    { value: 'grade-6', label: 'Grade 6 (Simple)' },
    { value: 'grade-8', label: 'Grade 8 (Standard)' },
    { value: 'grade-10', label: 'Grade 10 (Intermediate)' },
    { value: 'grade-12', label: 'Grade 12 (Advanced)' },
    { value: 'college', label: 'College Level' },
  ];

  const simplificationModelOptions = [
    { value: 'standard', label: 'Standard Model' },
    { value: 'advanced', label: 'Advanced Model' },
    { value: 'custom', label: 'Custom Model' },
  ];

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Word Document' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'html', label: 'HTML' },
  ];

  const handleSelectChange = (field: keyof AnalysisPreferences, value: string) => {
    setFormData({ ...formData, [field]: value });
    setIsEditing(true);
  };

  const handleCheckboxChange = (field: keyof AnalysisPreferences, checked: boolean) => {
    setFormData({ ...formData, [field]: checked });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setIsEditing(false);
      setSaveMessage('Preferences updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(preferences);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Analysis Settings</h3>
        <div className="space-y-4">
          <Select
            label="Default Readability Target"
            description="Set your preferred reading level for text simplification"
            options={readabilityTargetOptions}
            value={formData.defaultReadabilityTarget}
            onChange={(value) => handleSelectChange('defaultReadabilityTarget', value as string)}
          />
          <Select
            label="Simplification Model"
            description="Choose the AI model for text simplification"
            options={simplificationModelOptions}
            value={formData.simplificationModel}
            onChange={(value) => handleSelectChange('simplificationModel', value as string)}
          />
          <Checkbox
            label="Enable Language Detection"
            description="Automatically detect the language of input text"
            checked={formData.languageDetection}
            onChange={(e) => handleCheckboxChange('languageDetection', e.target.checked)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export & Display</h3>
        <div className="space-y-4">
          <Select
            label="Default Export Format"
            description="Choose your preferred format for exporting analysis results"
            options={exportFormatOptions}
            value={formData.exportFormat}
            onChange={(value) => handleSelectChange('exportFormat', value as string)}
          />
          <Checkbox
            label="Auto-save Analysis"
            description="Automatically save your analysis results"
            checked={formData.autoSaveEnabled}
            onChange={(e) => handleCheckboxChange('autoSaveEnabled', e.target.checked)}
          />
          <Checkbox
            label="Highlight Difficult Sentences"
            description="Automatically highlight complex sentences in the editor"
            checked={formData.highlightDifficultSentences}
            onChange={(e) => handleCheckboxChange('highlightDifficultSentences', e.target.checked)}
          />
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Preview Your Settings</p>
            <p className="text-xs text-muted-foreground">
              These preferences will be applied to all new analysis sessions. You can override them for individual documents.
            </p>
          </div>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center gap-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <p className="text-sm text-success font-medium">{saveMessage}</p>
        </div>
      )}

      {isEditing && (
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Preferences
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default PreferencesTab;