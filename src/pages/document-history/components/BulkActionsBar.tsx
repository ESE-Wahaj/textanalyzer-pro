import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface BulkActionsBarProps {
  selectedCount: number;
  onExport: () => void;
  onShare: () => void;
  onDelete: () => void;
  onClearSelection: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onExport,
  onShare,
  onDelete,
  onClearSelection
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-lg shadow-elevation-3 px-6 py-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Icon name="CheckSquare" size={20} color="var(--color-primary-foreground)" />
        <span className="font-medium">
          {selectedCount} document{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="h-6 w-px bg-primary-foreground/20" />

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onExport}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Icon name="Download" size={18} color="var(--color-primary-foreground)" />
          <span className="hidden sm:inline ml-2">Export</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Icon name="Share2" size={18} color="var(--color-primary-foreground)" />
          <span className="hidden sm:inline ml-2">Share</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-error hover:bg-error/10"
        >
          <Icon name="Trash2" size={18} color="var(--color-error)" />
          <span className="hidden sm:inline ml-2">Delete</span>
        </Button>

        <div className="h-6 w-px bg-primary-foreground/20" />

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Icon name="X" size={18} color="var(--color-primary-foreground)" />
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;