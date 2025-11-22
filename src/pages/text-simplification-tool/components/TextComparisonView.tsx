import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { SentenceAnalysis } from '../types';

interface TextComparisonViewProps {
  sentences: SentenceAnalysis[];
  onSentenceSelect: (sentenceId: string) => void;
  onSentenceAccept: (sentenceId: string) => void;
  onSentenceReject: (sentenceId: string) => void;
  viewMode: 'split' | 'original' | 'simplified';
  onViewModeChange: (mode: 'split' | 'original' | 'simplified') => void;
}

const TextComparisonView = ({
  sentences,
  onSentenceSelect,
  onSentenceAccept,
  onSentenceReject,
  viewMode,
  onViewModeChange,
}: TextComparisonViewProps) => {
  const [hoveredSentence, setHoveredSentence] = useState<string | null>(null);

  const getDifficultyColor = (score: number) => {
    if (score >= 80) return 'bg-destructive/20 border-destructive';
    if (score >= 60) return 'bg-warning/20 border-warning';
    if (score >= 40) return 'bg-secondary/20 border-secondary';
    return 'bg-success/20 border-success';
  };

  const getDifficultyLabel = (score: number) => {
    if (score >= 80) return 'Very Difficult';
    if (score >= 60) return 'Difficult';
    if (score >= 40) return 'Moderate';
    return 'Easy';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('split')}
              iconName="Columns"
            >
              Split View
            </Button>
            <Button
              variant={viewMode === 'original' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('original')}
              iconName="FileText"
            >
              Original
            </Button>
            <Button
              variant={viewMode === 'simplified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('simplified')}
              iconName="Sparkles"
            >
              Simplified
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/20 border border-destructive" />
              <span>Very Difficult</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning/20 border border-warning" />
              <span>Difficult</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary/20 border border-secondary" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success/20 border border-success" />
              <span>Easy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            <div className="p-6 border-r border-border overflow-auto">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Original Text
              </h3>
              <div className="space-y-3">
                {sentences.map((sentence) => (
                  <div
                    key={sentence.id}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${getDifficultyColor(
                      sentence.difficultyScore
                    )} ${sentence.isSelected ? 'ring-2 ring-primary' : ''} ${
                      hoveredSentence === sentence.id ? 'shadow-md' : ''
                    }`}
                    onClick={() => onSentenceSelect(sentence.id)}
                    onMouseEnter={() => setHoveredSentence(sentence.id)}
                    onMouseLeave={() => setHoveredSentence(null)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {getDifficultyLabel(sentence.difficultyScore)}
                      </span>
                      <span className="text-xs font-semibold text-foreground">
                        {sentence.difficultyScore}%
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{sentence.originalText}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-auto bg-muted/30">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                <Icon name="Sparkles" size={16} />
                Simplified Text
              </h3>
              <div className="space-y-3">
                {sentences.map((sentence) => (
                  <div
                    key={sentence.id}
                    className={`p-3 rounded-lg border-2 bg-card transition-all ${
                      sentence.isAccepted
                        ? 'border-success'
                        : sentence.isSelected
                        ? 'border-primary' :'border-border'
                    } ${hoveredSentence === sentence.id ? 'shadow-md' : ''}`}
                    onMouseEnter={() => setHoveredSentence(sentence.id)}
                    onMouseLeave={() => setHoveredSentence(null)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon
                          name="TrendingDown"
                          size={14}
                          className="text-success"
                        />
                        <span className="text-xs font-medium text-success">
                          {sentence.readabilityImprovement}% easier
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {!sentence.isAccepted && (
                          <>
                            <button
                              onClick={() => onSentenceAccept(sentence.id)}
                              className="p-1 hover:bg-success/10 rounded transition-colors"
                              title="Accept suggestion"
                            >
                              <Icon name="Check" size={16} className="text-success" />
                            </button>
                            <button
                              onClick={() => onSentenceReject(sentence.id)}
                              className="p-1 hover:bg-destructive/10 rounded transition-colors"
                              title="Reject suggestion"
                            >
                              <Icon name="X" size={16} className="text-destructive" />
                            </button>
                          </>
                        )}
                        {sentence.isAccepted && (
                          <Icon name="CheckCircle" size={16} className="text-success" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                      {sentence.simplifiedText}
                    </p>
                    {sentence.isSelected && (
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Vocabulary Changes:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {sentence.vocabularyChanges.map((change, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded"
                              >
                                {change}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Structure Changes:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {sentence.structureChanges.map((change, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded"
                              >
                                {change}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-3">
              {sentences.map((sentence) => (
                <div
                  key={sentence.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    viewMode === 'original'
                      ? getDifficultyColor(sentence.difficultyScore)
                      : 'border-border bg-card'
                  } ${sentence.isSelected ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => onSentenceSelect(sentence.id)}
                >
                  <p className="text-sm text-foreground leading-relaxed">
                    {viewMode === 'original' ? sentence.originalText : sentence.simplifiedText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextComparisonView;