import { useState } from 'react';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileTab from './components/ProfileTab';
import PreferencesTab from './components/PreferencesTab';
import NotificationsTab from './components/NotificationsTab';
import SecurityTab from './components/SecurityTab';
import SubscriptionTab from './components/SubscriptionTab';
import ApiTab from './components/ApiTab';
import {
  UserProfile,
  AnalysisPreferences,
  NotificationSettings,
  SecuritySettings,
  SubscriptionInfo,
  ApiAccess,
  SettingsTab,
} from './types';

const UserProfileSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isMobileAccordion, setIsMobileAccordion] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    organization: 'Tech Solutions Inc.',
    role: 'Content Manager',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    phoneNumber: '+1 (555) 123-4567',
    timezone: 'UTC-5',
    language: 'en',
  });

  const [analysisPreferences, setAnalysisPreferences] = useState<AnalysisPreferences>({
    defaultReadabilityTarget: 'grade-8',
    simplificationModel: 'standard',
    languageDetection: true,
    exportFormat: 'pdf',
    autoSaveEnabled: true,
    highlightDifficultSentences: true,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    collaborationUpdates: true,
    systemNotifications: false,
    weeklyDigest: true,
    notificationFrequency: 'instant',
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: 'March 15, 2024',
    activeSessions: [
      {
        id: '1',
        device: 'Chrome on Windows',
        location: 'New York, USA',
        ipAddress: '192.168.1.1',
        lastActive: '2 minutes ago',
        current: true,
      },
      {
        id: '2',
        device: 'Safari on iPhone',
        location: 'New York, USA',
        ipAddress: '192.168.1.2',
        lastActive: '1 hour ago',
        current: false,
      },
    ],
  });

  const subscriptionInfo: SubscriptionInfo = {
    plan: 'Pro',
    status: 'Active',
    billingCycle: 'Monthly',
    nextBillingDate: 'April 15, 2024',
    analysisCount: 450,
    analysisLimit: 1000,
    storageUsed: 3.5,
    storageLimit: 10,
  };

  const apiAccess: ApiAccess = {
    apiKey: 'sk_live_51234567890abcdefghijklmnopqrstuvwxyz',
    requestsUsed: 2500,
    requestsLimit: 10000,
    lastUsed: '2 hours ago',
    status: 'Active',
  };

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: 'User' },
    { id: 'preferences' as SettingsTab, label: 'Preferences', icon: 'Settings' },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: 'Bell' },
    { id: 'security' as SettingsTab, label: 'Security', icon: 'Shield' },
    { id: 'subscription' as SettingsTab, label: 'Subscription', icon: 'CreditCard' },
    { id: 'api' as SettingsTab, label: 'API Access', icon: 'Code' },
  ];

  const handleTabClick = (tabId: SettingsTab) => {
    if (window.innerWidth < 768) {
      setIsMobileAccordion(activeTab === tabId ? !isMobileAccordion : true);
    }
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab profile={userProfile} onUpdate={setUserProfile} />;
      case 'preferences':
        return (
          <PreferencesTab preferences={analysisPreferences} onUpdate={setAnalysisPreferences} />
        );
      case 'notifications':
        return (
          <NotificationsTab settings={notificationSettings} onUpdate={setNotificationSettings} />
        );
      case 'security':
        return <SecurityTab settings={securitySettings} onUpdate={setSecuritySettings} />;
      case 'subscription':
        return <SubscriptionTab subscription={subscriptionInfo} />;
      case 'api':
        return <ApiTab apiAccess={apiAccess} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

      <main className="lg:ml-60 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-2 hidden md:block">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="md:hidden space-y-2">
                {tabs.map((tab) => (
                  <div key={tab.id} className="bg-card border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={tab.icon} size={18} />
                        <span>{tab.label}</span>
                      </div>
                      <Icon
                        name={activeTab === tab.id && isMobileAccordion ? 'ChevronUp' : 'ChevronDown'}
                        size={18}
                      />
                    </button>
                    {activeTab === tab.id && isMobileAccordion && (
                      <div className="p-4 border-t border-border">{renderTabContent()}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 hidden md:block">{renderTabContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileSettings;