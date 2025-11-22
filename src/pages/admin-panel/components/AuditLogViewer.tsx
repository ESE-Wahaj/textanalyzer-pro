import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { AuditLog } from '../types';

interface AuditLogViewerProps {
  logs: AuditLog[];
}

const AuditLogViewer = ({ logs }: AuditLogViewerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'failed', label: 'Failed' }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'success') {
      return 'bg-success/10 text-success';
    }
    return 'bg-destructive/10 text-destructive';
  };

  const getActionIcon = (action: string) => {
    if (action.includes('create')) return 'Plus';
    if (action.includes('update')) return 'Edit2';
    if (action.includes('delete')) return 'Trash2';
    if (action.includes('login')) return 'LogIn';
    if (action.includes('logout')) return 'LogOut';
    return 'Activity';
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-foreground">Audit Logs</h2>
          <Button variant="outline" iconName="Download">
            Export Logs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="search"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as string)}
            placeholder="Filter by status"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Resource
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{log.user}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name={getActionIcon(log.action)} size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{log.action}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-muted-foreground">{log.resource}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${getStatusBadge(log.status)}`}>
                    <Icon name={log.status === 'success' ? 'CheckCircle' : 'XCircle'} size={12} />
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground max-w-md truncate">{log.details}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} logs
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogViewer;