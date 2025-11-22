import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Document, SortConfig } from '../types';

interface DocumentTableProps {
  documents: Document[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onSort: (config: SortConfig) => void;
  sortConfig: SortConfig;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

const DocumentTable = ({
  documents,
  selectedIds,
  onSelectionChange,
  onSort,
  sortConfig,
  onView,
  onEdit,
  onDuplicate,
  onShare,
  onDelete
}: DocumentTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(documents.map(doc => doc.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleSort = (key: keyof Document) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Document }) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ChevronsUpDown" size={16} color="var(--color-muted-foreground)" />;
    }
    return (
      <Icon
        name={sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'}
        size={16}
        color="var(--color-primary)"
      />
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <Checkbox
                  checked={selectedIds.length === documents.length && documents.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all documents"
                />
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Document Title
                  <SortIcon columnKey="title" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('analysisDate')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Analysis Date
                  <SortIcon columnKey="analysisDate" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('readabilityScore')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Readability Score
                  <SortIcon columnKey="readabilityScore" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('collaborationStatus')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Collaboration
                  <SortIcon columnKey="collaborationStatus" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('lastModified')}
                  className="flex items-center gap-2 font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
                >
                  Last Modified
                  <SortIcon columnKey="lastModified" />
                </button>
              </th>
              <th className="px-6 py-4 text-right font-heading font-semibold text-sm text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                onMouseEnter={() => setHoveredRow(doc.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedIds.includes(doc.id)}
                    onChange={(e) => handleSelectOne(doc.id, e.target.checked)}
                    aria-label={`Select ${doc.title}`}
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{doc.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.wordCount.toLocaleString()} words · {doc.documentType}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(doc.analysisDate)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          doc.readabilityScore >= 70
                            ? 'bg-success'
                            : doc.readabilityScore >= 40
                            ? 'bg-warning' :'bg-error'
                        }`}
                        style={{ width: `${doc.readabilityScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {doc.readabilityScore}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCollaborationStatusColor(
                      doc.collaborationStatus
                    )}`}
                  >
                    {getCollaborationStatusLabel(doc.collaborationStatus)}
                    {doc.collaborators && doc.collaborators > 0 && (
                      <span className="ml-1">({doc.collaborators})</span>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(doc.lastModified)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(doc.id)}
                      aria-label="View document"
                    >
                      <Icon name="Eye" size={18} color="var(--color-foreground)" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(doc.id)}
                      aria-label="Edit document"
                    >
                      <Icon name="Edit" size={18} color="var(--color-foreground)" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicate(doc.id)}
                      aria-label="Duplicate document"
                    >
                      <Icon name="Copy" size={18} color="var(--color-foreground)" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onShare(doc.id)}
                      aria-label="Share document"
                    >
                      <Icon name="Share2" size={18} color="var(--color-foreground)" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(doc.id)}
                      aria-label="Delete document"
                    >
                      <Icon name="Trash2" size={18} color="var(--color-error)" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {documents.length === 0 && (
        <div className="py-16 text-center">
          <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">No documents found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or create a new document
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;