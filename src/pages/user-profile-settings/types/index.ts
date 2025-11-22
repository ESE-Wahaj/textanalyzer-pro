export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  avatar: string;
  phoneNumber: string;
  timezone: string;
  language: string;
}

export interface AnalysisPreferences {
  defaultReadabilityTarget: string;
  simplificationModel: string;
  languageDetection: boolean;
  exportFormat: string;
  autoSaveEnabled: boolean;
  highlightDifficultSentences: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  collaborationUpdates: boolean;
  systemNotifications: boolean;
  weeklyDigest: boolean;
  notificationFrequency: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: ActiveSession[];
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  current: boolean;
}

export interface SubscriptionInfo {
  plan: string;
  status: string;
  billingCycle: string;
  nextBillingDate: string;
  analysisCount: number;
  analysisLimit: number;
  storageUsed: number;
  storageLimit: number;
}

export interface ApiAccess {
  apiKey: string;
  requestsUsed: number;
  requestsLimit: number;
  lastUsed: string;
  status: string;
}

export type SettingsTab = 'profile' | 'preferences' | 'notifications' | 'security' | 'subscription' | 'api';