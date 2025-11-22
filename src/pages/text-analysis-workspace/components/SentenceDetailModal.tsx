import { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import type { SentenceAnalysis } from '../types';

interface SentenceDetailModalProps {
  sentence: SentenceAnalysis | null;
  onClose: () => void;
  onSimplify: (sentence: SentenceAnalysis) => void;
}

const SentenceDetailModal = ({ sentence, onClose, onSimplify }: SentenceDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (sentence) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [sentence, onClose]);

  if (!sentence) return null;

  const getDifficultyColor = (level: SentenceAnalysis['difficultyLevel']) => {
    switch (level) {
      case 'easy':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-destructive';
      case 'very-hard':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Sentence Analysis Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Original Sentence</label>
            <p className="text-sm text-foreground p-4 bg-muted/50 rounded-lg">{sentence.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Difficulty Score</p>
              <p className={`text-2xl font-bold ${getDifficultyColor(sentence.difficultyLevel)}`}>
                {sentence.difficultyScore.toFixed(1)}/10
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Difficulty Level</p>
              <p className={`text-2xl font-bold capitalize ${getDifficultyColor(sentence.difficultyLevel)}`}>
                {sentence.difficultyLevel.replace('-', ' ')}
              </p>
            </div>
          </div>

          {sentence.explanation && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Why is this difficult?</label>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-foreground">{sentence.explanation}</p>
              </div>
            </div>
          )}

          {sentence.suggestions && sentence.suggestions.length > 0 && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Simplification Suggestions</label>
              <div className="space-y-2">
                {sentence.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="default"
              fullWidth
              iconName="Wand2"
              onClick={() => {
                onSimplify(sentence);
                onClose();
              }}
            >
              Simplify This Sentence
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceDetailModal;