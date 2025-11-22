import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Document } from '../types';

interface DocumentCardProps {
  document: Document;
  onShare: (documentId: string) => void;
  onComment: (documentId: string) => void;
}

const DocumentCard = ({ document, onShare, onComment }: DocumentCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'draft':
        return 'bg-warning/10 text-warning';
      case 'archived':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const onlineCollaborators = document.collaborators.filter(c => c.status === 'online');

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate('/text-analysis-workspace')}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={document.thumbnail}
            alt={document.thumbnailAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground truncate mb-1">
                {document.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {document.description}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(
                document.status
              )}`}
            >
              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="FileText" size={16} />
              <span>{document.wordCount.toLocaleString()} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="BarChart3" size={16} />
              <span className={getReadabilityColor(document.readabilityScore)}>
                {document.readabilityScore}% readable
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageSquare" size={16} />
              <span>{document.comments.length} comments</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {document.collaborators.slice(0, 3).map((member) => (
                  <div
                    key={member.id}
                    className="relative w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                    title={member.name}
                  >
                    <Image
                      src={member.avatar}
                      alt={`${member.name} profile picture`}
                      className="w-full h-full object-cover"
                    />
                    {member.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                ))}
                {document.collaborators.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground">
                    +{document.collaborators.length - 3}
                  </div>
                )}
              </div>
              {onlineCollaborators.length > 0 && (
                <span className="text-xs text-success flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  {onlineCollaborators.length} active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatDate(document.lastModified)}
              </span>
              {isHovered && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onComment(document.id);
                    }}
                    iconName="MessageSquare"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(document.id);
                    }}
                    iconName="Share2"
                    iconSize={16}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;