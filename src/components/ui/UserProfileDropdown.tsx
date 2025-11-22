import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

interface UserProfileDropdownProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  subscriptionStatus?: string;
}

const UserProfileDropdown = ({
  userName = 'John Doe',
  userEmail = 'john.doe@example.com',
  userAvatar,
  subscriptionStatus = 'Pro Plan',
}: UserProfileDropdownProps) => {
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

  const handleProfileClick = () => {
    navigate('/user-profile-settings');
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors duration-150"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {getInitials(userName)}
          </div>
        )}
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          className="text-muted-foreground hidden sm:block"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-base font-medium">
                  {getInitials(userName)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-medium rounded">
                  <Icon name="Crown" size={12} />
                  {subscriptionStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors duration-150"
            >
              <Icon name="User" size={18} />
              <span>Profile Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-150"
            >
              <Icon name="LogOut" size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;