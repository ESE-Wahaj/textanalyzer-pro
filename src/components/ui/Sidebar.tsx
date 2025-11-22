import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: 'admin' | 'user';
}

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  tooltip: string;
  adminOnly?: boolean;
}

const Sidebar = ({ isOpen = false, onClose, userRole = 'user' }: SidebarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navigationItems: NavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', tooltip: 'View analytics' },
    { label: 'Analysis Workspace', path: '/text-analysis-workspace', icon: 'FileSearch', tooltip: 'Analyze text' },
    { label: 'Simplification Tool', path: '/text-simplification-tool', icon: 'Wand2', tooltip: 'Simplify text' },
    { label: 'Collaboration Hub', path: '/team-collaboration-hub', icon: 'Users', tooltip: 'Team workspace' },
    { label: 'Profile Settings', path: '/user-profile-settings', icon: 'Settings', tooltip: 'Manage profile' },
    { label: 'Document History', path: '/document-history', icon: 'FileText', tooltip: 'See history' },
    {
      label: 'Admin Panel',
      path: '/admin-panel',
      icon: 'Shield',
      tooltip: 'Administration',
      adminOnly: true,
    },
  ];

  const filteredNavigation = navigationItems.filter(
    (item) => !item.adminOnly || userRole === 'admin'
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-elevation-2"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 ease-smooth z-40
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">

          {/* HEADER */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-foreground">TextAnalyzer Pro</span>
              </div>
            )}

            {isCollapsed && (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} color="white" />
              </div>
            )}

            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-1.5 hover:bg-muted rounded-md transition-colors"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-3">
              {filteredNavigation.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) setIsMobileOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 h-12 px-3 rounded-md transition-all duration-150
                      ${
                        isActive(item.path)
                          ? 'bg-primary text-primary-foreground shadow-elevation-1'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Icon name={item.icon} size={20} />
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* LOGOUT */}
          <div className="p-4 border-t border-border">
            <Link
              to="/login"
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-muted transition-all
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon name="LogOut" size={20} color="var(--color-error)" />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
