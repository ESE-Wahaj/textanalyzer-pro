import { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import UserManagementTable from './components/UserManagementTable';
import ApiMonitoringPanel from './components/ApiMonitoringPanel';
import SystemConfigPanel from './components/SystemConfigPanel';
import AuditLogViewer from './components/AuditLogViewer';
import UsageAnalyticsChart from './components/UsageAnalyticsChart';
import { SystemMetric, User, ApiUsage, SystemConfig, AuditLog, UsageAnalytics } from './types';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const systemMetrics: SystemMetric[] = [
  {
    id: '1',
    label: 'Active Users',
    value: '2,847',
    change: 12.5,
    trend: 'up',
    icon: 'Users',
    color: 'bg-primary'
  },
  {
    id: '2',
    label: 'Total Analyses',
    value: '45,231',
    change: 8.3,
    trend: 'up',
    icon: 'FileText',
    color: 'bg-secondary'
  },
  {
    id: '3',
    label: 'API Requests',
    value: '128.5K',
    change: -2.4,
    trend: 'down',
    icon: 'Zap',
    color: 'bg-warning'
  },
  {
    id: '4',
    label: 'System Uptime',
    value: '99.98%',
    change: 0.02,
    trend: 'stable',
    icon: 'Activity',
    color: 'bg-success'
  }];


  const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: "https://images.unsplash.com/photo-1592831383329-23d79a212006",
    role: 'admin',
    subscription: 'enterprise',
    status: 'active',
    lastActive: new Date(Date.now() - 3600000),
    analysisCount: 342,
    joinedDate: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'user',
    subscription: 'pro',
    status: 'active',
    lastActive: new Date(Date.now() - 7200000),
    analysisCount: 156,
    joinedDate: new Date('2023-03-22')
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11c1cacc8-1763301010996.png",
    role: 'user',
    subscription: 'free',
    status: 'active',
    lastActive: new Date(Date.now() - 86400000),
    analysisCount: 45,
    joinedDate: new Date('2023-06-10')
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'user',
    subscription: 'pro',
    status: 'inactive',
    lastActive: new Date(Date.now() - 604800000),
    analysisCount: 89,
    joinedDate: new Date('2023-02-28')
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@example.com',
    avatar: "https://images.unsplash.com/photo-1575443998916-e40f48347a68",
    role: 'user',
    subscription: 'enterprise',
    status: 'suspended',
    lastActive: new Date(Date.now() - 1209600000),
    analysisCount: 234,
    joinedDate: new Date('2023-04-05')
  }];


  const apiUsage: ApiUsage[] = [
  {
    endpoint: '/api/v1/analyze',
    requests: 45231,
    avgResponseTime: 245,
    errorRate: 0.8,
    lastCalled: new Date(Date.now() - 300000)
  },
  {
    endpoint: '/api/v1/simplify',
    requests: 32156,
    avgResponseTime: 312,
    errorRate: 1.2,
    lastCalled: new Date(Date.now() - 600000)
  },
  {
    endpoint: '/api/v1/readability',
    requests: 28943,
    avgResponseTime: 189,
    errorRate: 0.5,
    lastCalled: new Date(Date.now() - 900000)
  },
  {
    endpoint: '/api/v1/sentiment',
    requests: 19847,
    avgResponseTime: 267,
    errorRate: 1.8,
    lastCalled: new Date(Date.now() - 1200000)
  },
  {
    endpoint: '/api/v1/export',
    requests: 12456,
    avgResponseTime: 423,
    errorRate: 2.3,
    lastCalled: new Date(Date.now() - 1800000)
  }];


  const systemConfigs: SystemConfig[] = [
  {
    id: '1',
    category: 'security',
    setting: 'Max Login Attempts',
    value: 5,
    description: 'Maximum number of failed login attempts before account lockout',
    lastModified: new Date(Date.now() - 86400000),
    modifiedBy: 'Admin'
  },
  {
    id: '2',
    category: 'security',
    setting: 'Session Timeout',
    value: 3600,
    description: 'Session timeout duration in seconds',
    lastModified: new Date(Date.now() - 172800000),
    modifiedBy: 'Admin'
  },
  {
    id: '3',
    category: 'features',
    setting: 'Enable Collaboration',
    value: true,
    description: 'Allow users to share and collaborate on documents',
    lastModified: new Date(Date.now() - 259200000),
    modifiedBy: 'Sarah Johnson'
  },
  {
    id: '4',
    category: 'features',
    setting: 'Max Document Size',
    value: 10485760,
    description: 'Maximum document size in bytes (10MB)',
    lastModified: new Date(Date.now() - 345600000),
    modifiedBy: 'Admin'
  },
  {
    id: '5',
    category: 'performance',
    setting: 'API Rate Limit',
    value: 1000,
    description: 'Maximum API requests per hour per user',
    lastModified: new Date(Date.now() - 432000000),
    modifiedBy: 'Admin'
  },
  {
    id: '6',
    category: 'performance',
    setting: 'Cache Duration',
    value: 300,
    description: 'Cache duration in seconds for analysis results',
    lastModified: new Date(Date.now() - 518400000),
    modifiedBy: 'Sarah Johnson'
  }];


  const auditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1800000),
    user: 'Sarah Johnson',
    action: 'User Created',
    resource: '/users/new-user-123',
    status: 'success',
    details: 'Created new user account with pro subscription'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000),
    user: 'Admin',
    action: 'Config Updated',
    resource: '/config/api-rate-limit',
    status: 'success',
    details: 'Updated API rate limit from 500 to 1000 requests per hour'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 5400000),
    user: 'Michael Chen',
    action: 'Login Failed',
    resource: '/auth/login',
    status: 'failed',
    details: 'Invalid credentials provided'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 7200000),
    user: 'Sarah Johnson',
    action: 'User Suspended',
    resource: '/users/user-456',
    status: 'success',
    details: 'Suspended user account due to policy violation'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 9000000),
    user: 'Admin',
    action: 'System Backup',
    resource: '/system/backup',
    status: 'success',
    details: 'Completed scheduled system backup'
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 10800000),
    user: 'Emily Rodriguez',
    action: 'Document Deleted',
    resource: '/documents/doc-789',
    status: 'success',
    details: 'Permanently deleted document from system'
  }];


  const usageAnalytics: UsageAnalytics[] = [
  { date: 'Jan 1', analyses: 1234, users: 456, apiCalls: 5678 },
  { date: 'Jan 8', analyses: 1456, users: 489, apiCalls: 6234 },
  { date: 'Jan 15', analyses: 1678, users: 512, apiCalls: 6789 },
  { date: 'Jan 22', analyses: 1890, users: 534, apiCalls: 7234 },
  { date: 'Jan 29', analyses: 2012, users: 567, apiCalls: 7890 },
  { date: 'Feb 5', analyses: 2234, users: 589, apiCalls: 8456 },
  { date: 'Feb 12', analyses: 2456, users: 612, apiCalls: 9012 }];


  const handleUserAction = (userId: string, action: string) => {
    console.log(`User action: ${action} for user ${userId}`);
  };

  const handleBulkAction = (userIds: string[], action: string) => {
    console.log(`Bulk action: ${action} for users`, userIds);
  };

  const handleConfigUpdate = (configId: string, newValue: string | boolean | number) => {
    console.log(`Config update: ${configId} to ${newValue}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole="admin" />

      <Header
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen} />


      <main className="lg:ml-60 pt-16">
        <div className="p-6 max-w-[1920px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage users, monitor system performance, and configure platform settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemMetrics.map((metric) =>
            <MetricsCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={metric.icon}
              color={metric.color} />

            )}
          </div>

          <div className="space-y-8">
            <UsageAnalyticsChart data={usageAnalytics} />
            
            <UserManagementTable
              users={users}
              onUserAction={handleUserAction}
              onBulkAction={handleBulkAction} />


            <ApiMonitoringPanel apiUsage={apiUsage} />

            <SystemConfigPanel
              configs={systemConfigs}
              onConfigUpdate={handleConfigUpdate} />


            <AuditLogViewer logs={auditLogs} />
          </div>
        </div>
      </main>
    </div>);

};

export default AdminPanel;