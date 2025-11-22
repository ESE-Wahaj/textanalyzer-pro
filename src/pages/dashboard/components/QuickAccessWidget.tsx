import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import type { QuickAccessItem } from '../types';

interface QuickAccessWidgetProps {
  items: QuickAccessItem[];
}

const QuickAccessWidget = ({ items }: QuickAccessWidgetProps) => {
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template':
        return 'text-primary bg-primary/10';
      case 'shared':
        return 'text-secondary bg-secondary/10';
      case 'collaboration':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleItemClick = (item: QuickAccessItem) => {
    if (item.type === 'collaboration') {
      navigate('/team-collaboration-hub');
    } else if (item.type === 'shared') {
      navigate('/team-collaboration-hub');
    } else {
      navigate('/text-analysis-workspace');
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors duration-150 text-left"
          >
            <div className={`w-10 h-10 rounded-lg ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0`}>
              <Icon name={item.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-muted-foreground">{formatDate(item.lastAccessed)}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessWidget;