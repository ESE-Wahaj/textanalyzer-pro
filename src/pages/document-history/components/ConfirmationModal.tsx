import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getIconConfig = () => {
    switch (variant) {
      case 'danger':
        return { name: 'AlertTriangle', color: 'var(--color-error)' };
      case 'warning':
        return { name: 'AlertCircle', color: 'var(--color-warning)' };
      case 'info':
        return { name: 'Info', color: 'var(--color-primary)' };
      default:
        return { name: 'AlertTriangle', color: 'var(--color-error)' };
    }
  };

  const iconConfig = getIconConfig();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-card rounded-lg shadow-elevation-3 max-w-md w-full p-6">
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              variant === 'danger' ?'bg-error/10'
                : variant === 'warning' ?'bg-warning/10' :'bg-primary/10'
            }`}
          >
            <Icon name={iconConfig.name} size={24} color={iconConfig.color} />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'default'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;