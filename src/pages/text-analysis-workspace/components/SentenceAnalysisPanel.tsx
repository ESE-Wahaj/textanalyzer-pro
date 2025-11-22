import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { SentenceAnalysis } from '../types';

interface SentenceAnalysisPanelProps {
  sentences: SentenceAnalysis[];
  onSentenceClick: (sentence: SentenceAnalysis) => void;
}

const SentenceAnalysisPanel = ({ sentences, onSentenceClick }: SentenceAnalysisPanelProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const getDifficultyColor = (level: SentenceAnalysis['difficultyLevel']) => {
    switch (level) {
      case 'easy':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'hard':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'very-hard':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getDifficultyIcon = (level: SentenceAnalysis['difficultyLevel']) => {
    switch (level) {
      case 'easy':
        return 'CheckCircle2';
      case 'medium':
        return 'AlertCircle';
      case 'hard':
        return 'AlertTriangle';
      case 'very-hard':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const filteredSentences = selectedDifficulty === 'all'
    ? sentences
    : sentences.filter(s => s.difficultyLevel === selectedDifficulty);

  const difficultyCounts = {
    easy: sentences.filter(s => s.difficultyLevel === 'easy').length,
    medium: sentences.filter(s => s.difficultyLevel === 'medium').length,
    hard: sentences.filter(s => s.difficultyLevel === 'hard').length,
    'very-hard': sentences.filter(s => s.difficultyLevel === 'very-hard').length,
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="List" size={20} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Sentence Analysis</h3>
        </div>
        <span className="text-xs text-muted-foreground">{sentences.length} sentences</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedDifficulty('all')}
        >
          All ({sentences.length})
        </Button>
        <Button
          variant={selectedDifficulty === 'easy' ? 'success' : 'outline'}
          size="sm"
          onClick={() => setSelectedDifficulty('easy')}
        >
          Easy ({difficultyCounts.easy})
        </Button>
        <Button
          variant={selectedDifficulty === 'medium' ? 'warning' : 'outline'}
          size="sm"
          onClick={() => setSelectedDifficulty('medium')}
        >
          Medium ({difficultyCounts.medium})
        </Button>
        <Button
          variant={selectedDifficulty === 'hard' ? 'danger' : 'outline'}
          size="sm"
          onClick={() => setSelectedDifficulty('hard')}
        >
          Hard ({difficultyCounts.hard})
        </Button>
        <Button
          variant={selectedDifficulty === 'very-hard' ? 'danger' : 'outline'}
          size="sm"
          onClick={() => setSelectedDifficulty('very-hard')}
        >
          Very Hard ({difficultyCounts['very-hard']})
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredSentences.map((sentence) => (
          <div
            key={sentence.id}
            onClick={() => onSentenceClick(sentence)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 hover:shadow-md ${getDifficultyColor(sentence.difficultyLevel)}`}
          >
            <div className="flex items-start gap-3">
              <Icon
                name={getDifficultyIcon(sentence.difficultyLevel)}
                size={20}
                className="flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground mb-2 line-clamp-2">{sentence.text}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium">
                    Difficulty: {sentence.difficultyScore.toFixed(1)}/10
                  </span>
                  <span className="text-xs capitalize">{sentence.difficultyLevel.replace('-', ' ')}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>

      {filteredSentences.length === 0 && (
        <div className="text-center py-8">
          <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No sentences found for this difficulty level</p>
        </div>
      )}
    </div>
  );
};

export default SentenceAnalysisPanel;