import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

interface MainSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  role?: 'user' | 'admin';
}

const MainSidebar = ({ isCollapsed = false, onToggleCollapse }: MainSidebarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', role: 'user' },
    { label: 'Document History', path: '/document-history', icon: 'FileText', role: 'user' },
    { label: 'User Profile', path: '/user-profile', icon: 'User', role: 'user' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="lg:hidden fixed top-4 left-4 z-[150] p-2 bg-card rounded-lg shadow-elevation-2"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
      </button>

      <aside
        className={`
          fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border z-[100]
          transition-all duration-300 ease-smooth
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="var(--color-primary-foreground)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="8"
                    cy="6"
                    r="1.5"
                    fill="var(--color-accent)"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="1.5"
                    fill="var(--color-accent)"
                  />
                  <circle
                    cx="16"
                    cy="18"
                    r="1.5"
                    fill="var(--color-accent)"
                  />
                </svg>
              </div>
              {!isCollapsed && (
                <span className="font-heading font-semibold text-lg text-foreground">
                  TextAnalyzer Pro
                </span>
              )}
            </Link>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:block p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Icon
                  name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                  size={20}
                  color="var(--color-muted-foreground)"
                />
              </button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 ease-smooth
                  ${isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-foreground hover:bg-muted'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  color={isActive(item.path) ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              to="/login"
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                text-error hover:bg-muted transition-all duration-200 ease-smooth
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon name="LogOut" size={20} color="var(--color-error)" />
              {!isCollapsed && (
                <span className="font-medium">Logout</span>
              )}
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-[100] px-4 py-2">
        <nav className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-lg
                transition-all duration-200 ease-smooth
                ${isActive(item.path)
                  ? 'text-primary' :'text-muted-foreground'
                }
              `}
            >
              <Icon
                name={item.icon}
                size={24}
                color={isActive(item.path) ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 z-[90]"
          onClick={handleMobileToggle}
        />
      )}
    </>
  );
};

export default MainSidebar;