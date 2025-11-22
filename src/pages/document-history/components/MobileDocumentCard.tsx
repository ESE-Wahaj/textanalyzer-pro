import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Document } from '../types';

interface MobileDocumentCardProps {
  document: Document;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onView: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onShare: () => void;
  onDelete: () => void;
}

const MobileDocumentCard = ({
  document,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDuplicate,
  onShare,
  onDelete
}: MobileDocumentCardProps) => {
  const getCollaborationStatusColor = (status: Document['collaborationStatus']) => {
    switch (status) {
      case 'solo':
        return 'bg-muted text-muted-foreground';
      case 'active':
        return 'bg-success/10 text-success';
      case 'completed':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCollaborationStatusLabel = (status: Document['collaborationStatus']) => {
    switch (status) {
      case 'solo':
        return 'Solo';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 mb-4">
      <div className="flex items-start gap-3 mb-3">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          aria-label={`Select ${document.title}`}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground mb-1 truncate">
            {document.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {document.wordCount.toLocaleString()} words · {document.documentType}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Readability Score</span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  document.readabilityScore >= 70
                    ? 'bg-success'
                    : document.readabilityScore >= 40
                    ? 'bg-warning' :'bg-error'
                }`}
                style={{ width: `${document.readabilityScore}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {document.readabilityScore}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Collaboration</span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCollaborationStatusColor(
              document.collaborationStatus
            )}`}
          >
            {getCollaborationStatusLabel(document.collaborationStatus)}
            {document.collaborators && document.collaborators > 0 && (
              <span className="ml-1">({document.collaborators})</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Modified</span>
          <span className="text-sm text-foreground">{formatDate(document.lastModified)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Button variant="outline" size="sm" onClick={onView} className="flex-1">
          <Icon name="Eye" size={16} color="var(--color-foreground)" />
        </Button>
        <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
          <Icon name="Edit" size={16} color="var(--color-foreground)" />
        </Button>
        <Button variant="outline" size="sm" onClick={onDuplicate} className="flex-1">
          <Icon name="Copy" size={16} color="var(--color-foreground)" />
        </Button>
        <Button variant="outline" size="sm" onClick={onShare} className="flex-1">
          <Icon name="Share2" size={16} color="var(--color-foreground)" />
        </Button>
        <Button variant="outline" size="sm" onClick={onDelete} className="flex-1">
          <Icon name="Trash2" size={16} color="var(--color-error)" />
        </Button>
      </div>
    </div>
  );
};

export default MobileDocumentCard;