import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

interface Notification {
  id: string;
  type: 'comment' | 'mention' | 'share';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationIndicatorProps {
  count?: number;
  notifications?: Notification[];
}

const NotificationIndicator = ({
  count = 0,
  notifications = [
    {
      id: '1',
      type: 'comment',
      title: 'New Comment',
      message: 'Sarah commented on "Marketing Analysis"',
      timestamp: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned',
      message: 'Mike mentioned you in "Q4 Report"',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'share',
      title: 'Document Shared',
      message: 'Alex shared "Product Specs" with you',
      timestamp: '2 hours ago',
      read: false,
    },
  ],
}: NotificationIndicatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return 'MessageSquare';
      case 'mention':
        return 'AtSign';
      case 'share':
        return 'Share2';
      default:
        return 'Bell';
    }
  };

  const handleViewAll = () => {
    navigate('/team-collaboration-hub');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-150"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="Bell" size={20} className="text-muted-foreground" />
        {count > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            {count > 0 && (
              <span className="text-xs text-muted-foreground">{count} new</span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted transition-colors duration-150 cursor-pointer ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'comment' ?'bg-primary/10 text-primary'
                            : notification.type === 'mention' ?'bg-warning/10 text-warning' :'bg-secondary/10 text-secondary'
                        }`}
                      >
                        <Icon name={getNotificationIcon(notification.type)} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <button
                onClick={handleViewAll}
                className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIndicator;