import Icon from '../../../components/AppIcon';
import type { SentimentAnalysis } from '../types';

interface SentimentAnalysisCardProps {
  sentiment: SentimentAnalysis;
}

const SentimentAnalysisCard = ({ sentiment }: SentimentAnalysisCardProps) => {
  const getSentimentColor = (overall: SentimentAnalysis['overall']) => {
    switch (overall) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSentimentBg = (overall: SentimentAnalysis['overall']) => {
    switch (overall) {
      case 'positive':
        return 'bg-success/10';
      case 'negative':
        return 'bg-destructive/10';
      default:
        return 'bg-muted/50';
    }
  };

  const getSentimentIcon = (overall: SentimentAnalysis['overall']) => {
    switch (overall) {
      case 'positive':
        return 'ThumbsUp';
      case 'negative':
        return 'ThumbsDown';
      default:
        return 'Minus';
    }
  };

  const emotions = [
    { name: 'Joy', value: sentiment.emotions.joy, icon: 'Smile', color: 'text-success' },
    { name: 'Sadness', value: sentiment.emotions.sadness, icon: 'Frown', color: 'text-primary' },
    { name: 'Anger', value: sentiment.emotions.anger, icon: 'Angry', color: 'text-destructive' },
    { name: 'Fear', value: sentiment.emotions.fear, icon: 'AlertTriangle', color: 'text-warning' },
    { name: 'Surprise', value: sentiment.emotions.surprise, icon: 'Zap', color: 'text-secondary' },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Heart" size={20} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Sentiment Analysis</h3>
        </div>
        <div className={`px-3 py-1 rounded-full ${getSentimentBg(sentiment.overall)}`}>
          <div className="flex items-center gap-1.5">
            <Icon name={getSentimentIcon(sentiment.overall)} size={14} className={getSentimentColor(sentiment.overall)} />
            <span className={`text-sm font-medium capitalize ${getSentimentColor(sentiment.overall)}`}>
              {sentiment.overall}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Overall Sentiment Score</span>
          <span className={`text-sm font-medium ${getSentimentColor(sentiment.overall)}`}>
            {sentiment.score.toFixed(2)}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${sentiment.overall === 'positive' ? 'bg-success' : sentiment.overall === 'negative' ? 'bg-destructive' : 'bg-muted-foreground'}`}
            style={{ width: `${Math.abs(sentiment.score) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">Confidence: {(sentiment.confidence * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium text-foreground mb-3">Emotional Breakdown</h4>
        <div className="space-y-3">
          {emotions.map((emotion) => (
            <div key={emotion.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon name={emotion.icon} size={14} className={emotion.color} />
                  <span className="text-xs text-foreground">{emotion.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">
                  {(emotion.value * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${emotion.color.replace('text-', 'bg-')}`}
                  style={{ width: `${emotion.value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisCard;