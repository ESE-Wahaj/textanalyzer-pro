import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { AnalysisCard as AnalysisCardType } from '../types';

interface AnalysisCardProps {
  analysis: AnalysisCardType;
  onDelete?: (id: string) => void;
}

const AnalysisCard = ({ analysis, onDelete }: AnalysisCardProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const handleView = () => {
    navigate('/text-analysis-workspace', { state: { analysisId: analysis.id } });
  };

  const handleDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      await onDelete(analysis.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate mb-1">
            {analysis.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="FileText" size={14} />
            <span>{analysis.documentType}</span>
            <span>•</span>
            <span>{analysis.wordCount.toLocaleString()} words</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            analysis.status
          )}`}
        >
          {analysis.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Readability Score</span>
          </div>
          <p className={`text-2xl font-bold ${getScoreColor(analysis.readabilityScore)}`}>
            {analysis.readabilityScore}
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Difficulty</span>
          </div>
          <p className={`text-lg font-semibold capitalize ${getDifficultyColor(analysis.difficultyLevel)}`}>
            {analysis.difficultyLevel}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>{formatDate(analysis.lastModified)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            iconSize={16}
            onClick={handleDelete}
            loading={isDeleting}
            disabled={isDeleting}
          >
            Delete
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconSize={16}
            onClick={handleView}
            disabled={analysis.status === 'processing'}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;