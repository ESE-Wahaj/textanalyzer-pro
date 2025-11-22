import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { SystemConfig } from '../types';

interface SystemConfigPanelProps {
  configs: SystemConfig[];
  onConfigUpdate: (configId: string, newValue: string | boolean | number) => void;
}

const SystemConfigPanel = ({ configs, onConfigUpdate }: SystemConfigPanelProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(configs.map(c => c.category)))];

  const filteredConfigs = selectedCategory === 'all' 
    ? configs 
    : configs.filter(c => c.category === selectedCategory);

  const handleEdit = (config: SystemConfig) => {
    setEditingId(config.id);
    setEditValue(String(config.value));
  };

  const handleSave = (configId: string) => {
    onConfigUpdate(configId, editValue);
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const renderValueInput = (config: SystemConfig) => {
    if (typeof config.value === 'boolean') {
      return (
        <Checkbox
          checked={config.value}
          onChange={(e) => onConfigUpdate(config.id, e.target.checked)}
        />
      );
    }

    if (editingId === config.id) {
      return (
        <div className="flex items-center gap-2">
          <Input
            type={typeof config.value === 'number' ? 'number' : 'text'}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="max-w-xs"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Check"
            onClick={() => handleSave(config.id)}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-foreground">{String(config.value)}</span>
        <button
          onClick={() => handleEdit(config)}
          className="p-1 hover:bg-muted rounded transition-colors duration-150"
          aria-label="Edit configuration"
        >
          <Icon name="Edit2" size={14} className="text-muted-foreground" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">System Configuration</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Setting
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Modified By
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredConfigs.map((config) => (
              <tr key={config.id} className="hover:bg-muted/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Settings" size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{config.setting}</p>
                      <p className="text-xs text-muted-foreground">{config.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {renderValueInput(config)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground max-w-md">{config.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(config.lastModified)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{config.modifiedBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredConfigs.length} configuration{filteredConfigs.length !== 1 ? 's' : ''} displayed
          </p>
          <Button variant="outline" iconName="Download">
            Export Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigPanel;