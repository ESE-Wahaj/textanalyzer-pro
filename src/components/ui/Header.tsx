import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationIndicator from './NotificationIndicator';

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

const Header = ({ onMenuClick, isSidebarOpen = false }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 lg:left-60">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors duration-150"
            aria-label="Toggle menu"
          >
            <Icon name={isSidebarOpen ? 'X' : 'Menu'} size={24} />
          </button>
          
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground">TextAnalyzer Pro</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationIndicator count={3} />
          <UserProfileDropdown userAvatar="" />
        </div>
      </div>
    </header>
  );
};

export default Header;