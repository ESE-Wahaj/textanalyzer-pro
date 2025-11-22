import Icon from '../../../components/AppIcon';

interface KeywordsCloudProps {
  keywords: string[];
}

const KeywordsCloud = ({ keywords }: KeywordsCloudProps) => {
  const getRandomSize = (index: number) => {
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'];
    return sizes[index % sizes.length];
  };

  const getRandomColor = (index: number) => {
    const colors = [
      'text-primary',
      'text-secondary',
      'text-accent',
      'text-success',
      'text-warning',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Tag" size={20} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Key Terms</h3>
        <span className="text-xs text-muted-foreground">({keywords.length} keywords)</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={`${keyword}-${index}`}
            className={`px-3 py-1.5 bg-muted/50 rounded-full font-medium transition-all duration-150 hover:bg-primary/10 hover:scale-105 cursor-pointer ${getRandomSize(index)} ${getRandomColor(index)}`}
          >
            {keyword}
          </span>
        ))}
      </div>

      {keywords.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Tag" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No keywords extracted yet</p>
        </div>
      )}
    </div>
  );
};

export default KeywordsCloud;