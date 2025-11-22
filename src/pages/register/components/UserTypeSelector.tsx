import { UserTypeOption } from '../types';
import Icon from '../../../components/AppIcon';

interface UserTypeSelectorProps {
  options: UserTypeOption[];
  selectedType: string;
  onSelect: (type: 'educator' | 'content-creator' | 'business-professional') => void;
  error?: string;
}

const UserTypeSelector = ({ options, selectedType, onSelect, error }: UserTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        I am a <span className="text-error">*</span>
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              hover:shadow-elevation-1 text-left
              ${
                selectedType === option.value
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${selectedType === option.value ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <Icon
                  name={option.icon}
                  size={24}
                  color={
                    selectedType === option.value
                      ? 'var(--color-primary-foreground)'
                      : 'var(--color-muted-foreground)'
                  }
                />
              </div>
              <div>
                <p
                  className={`font-medium text-sm ${
                    selectedType === option.value ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          <Icon name="AlertCircle" size={16} color="var(--color-error)" />
          {error}
        </p>
      )}
    </div>
  );
};

export default UserTypeSelector;