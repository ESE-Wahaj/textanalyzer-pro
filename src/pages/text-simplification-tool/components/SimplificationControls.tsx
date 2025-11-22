import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { SimplificationSettings } from '../types';

interface SimplificationControlsProps {
  settings: SimplificationSettings;
  onSettingsChange: (settings: SimplificationSettings) => void;
  onSimplify: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

const SimplificationControls = ({
  settings,
  onSettingsChange,
  onSimplify,
  onReset,
  isProcessing,
}: SimplificationControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const intensityOptions = [
    { value: 'light', label: 'Light', description: 'Minimal changes, preserve style' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced simplification' },
    { value: 'aggressive', label: 'Aggressive', description: 'Maximum simplification' },
  ];

  const audienceOptions = [
    { value: 'general', label: 'General Audience' },
    { value: 'academic', label: 'Academic' },
    { value: 'business', label: 'Business' },
    { value: 'children', label: 'Children' },
  ];

  const gradeLevelOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `Grade ${i + 1}`,
  }));

  return (
    <div className="bg-card border-b border-border">
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <span className="flex items-center gap-2">
            <Icon name="Settings" size={18} />
            Simplification Settings
          </span>
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={18} />
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Intensity"
                options={intensityOptions}
                value={settings.intensity}
                onChange={(value) =>
                  onSettingsChange({ ...settings, intensity: value as SimplificationSettings['intensity'] })
                }
              />

              <Select
                label="Target Grade Level"
                options={gradeLevelOptions}
                value={settings.targetGradeLevel}
                onChange={(value) =>
                  onSettingsChange({ ...settings, targetGradeLevel: Number(value) })
                }
              />

              <Select
                label="Audience Type"
                options={audienceOptions}
                value={settings.audienceType}
                onChange={(value) =>
                  onSettingsChange({ ...settings, audienceType: value as SimplificationSettings['audienceType'] })
                }
              />
            </div>

            <div className="space-y-2">
              <Checkbox
                label="Preserve Technical Terms"
                description="Keep domain-specific terminology unchanged"
                checked={settings.preserveTechnicalTerms}
                onChange={(e) =>
                  onSettingsChange({ ...settings, preserveTechnicalTerms: e.target.checked })
                }
              />

              <Checkbox
                label="Maintain Original Tone"
                description="Keep the writing style and voice consistent"
                checked={settings.maintainTone}
                onChange={(e) =>
                  onSettingsChange({ ...settings, maintainTone: e.target.checked })
                }
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="default"
                onClick={onSimplify}
                loading={isProcessing}
                iconName="Wand2"
                iconPosition="left"
                className="flex-1"
              >
                {isProcessing ? 'Processing...' : 'Simplify Text'}
              </Button>

              <Button variant="outline" onClick={onReset} iconName="RotateCcw" iconPosition="left">
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimplificationControls;