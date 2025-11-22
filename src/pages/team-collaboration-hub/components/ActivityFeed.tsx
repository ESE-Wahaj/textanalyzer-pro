import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Activity } from '../types';

interface ActivityFeedProps {
  activities: Activity[];
  onMarkAsRead: (activityId: string) => void;
  onMarkAllAsRead: () => void;
}

const ActivityFeed = ({ activities, onMarkAsRead, onMarkAllAsRead }: ActivityFeedProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return 'MessageSquare';
      case 'edit':
        return 'Edit3';
      case 'share':
        return 'Share2';
      case 'mention':
        return 'AtSign';
      case 'permission':
        return 'Shield';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'comment':
        return 'bg-primary/10 text-primary';
      case 'edit':
        return 'bg-secondary/10 text-secondary';
      case 'share':
        return 'bg-success/10 text-success';
      case 'mention':
        return 'bg-warning/10 text-warning';
      case 'permission':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const unreadCount = activities.filter((a) => !a.isRead).length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={16} />
            <span>Recent Activity</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          {activities.length > 0 ? (
            <div className="divide-y divide-border">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                    !activity.isRead ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => onMarkAsRead(activity.id)}
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={activity.user.avatar}
                        alt={`${activity.user.name} profile picture`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        <Icon name={getActivityIcon(activity.type)} size={12} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground mb-1">
                        <span className="font-medium">{activity.user.name}</span>{' '}
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {activity.document.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>

                    {!activity.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;