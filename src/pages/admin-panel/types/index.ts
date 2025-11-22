export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  subscription: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  lastActive: Date;
  analysisCount: number;
  joinedDate: Date;
}

export interface SystemMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

export interface ApiUsage {
  endpoint: string;
  requests: number;
  avgResponseTime: number;
  errorRate: number;
  lastCalled: Date;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failed';
  details: string;
}

export interface SystemConfig {
  id: string;
  category: string;
  setting: string;
  value: string | boolean | number;
  description: string;
  lastModified: Date;
  modifiedBy: string;
}

export interface UsageAnalytics {
  date: string;
  analyses: number;
  users: number;
  apiCalls: number;
}

export interface FilterOptions {
  role?: string;
  subscription?: string;
  status?: string;
  dateRange?: string;
  searchQuery?: string;
}

export interface BulkAction {
  type: 'activate' | 'suspend' | 'delete' | 'upgrade' | 'downgrade';
  userIds: string[];
}