import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { User, FilterOptions } from '../types';

interface UserManagementTableProps {
  users: User[];
  onUserAction: (userId: string, action: string) => void;
  onBulkAction: (userIds: string[], action: string) => void;
}

const UserManagementTable = ({ users, onUserAction, onBulkAction }: UserManagementTableProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showBulkActions, setShowBulkActions] = useState(false);

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

  const subscriptionOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-success/10 text-success',
      inactive: 'bg-muted text-muted-foreground',
      suspended: 'bg-destructive/10 text-destructive'
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  const getSubscriptionBadge = (subscription: string) => {
    const styles = {
      free: 'bg-muted text-muted-foreground',
      pro: 'bg-primary/10 text-primary',
      enterprise: 'bg-secondary/10 text-secondary'
    };
    return styles[subscription as keyof typeof styles] || styles.free;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-foreground">User Management</h2>
          {selectedUsers.length > 0 && (
            <Button
              variant="outline"
              iconName="MoreVertical"
              onClick={() => setShowBulkActions(!showBulkActions)}
            >
              Bulk Actions ({selectedUsers.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={filters.searchQuery || ''}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          />
          <Select
            options={roleOptions}
            value={filters.role || 'all'}
            onChange={(value) => setFilters({ ...filters, role: value as string })}
            placeholder="Filter by role"
          />
          <Select
            options={subscriptionOptions}
            value={filters.subscription || 'all'}
            onChange={(value) => setFilters({ ...filters, subscription: value as string })}
            placeholder="Filter by plan"
          />
          <Select
            options={statusOptions}
            value={filters.status || 'all'}
            onChange={(value) => setFilters({ ...filters, status: value as string })}
            placeholder="Filter by status"
          />
        </div>

        {showBulkActions && selectedUsers.length > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-lg flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="CheckCircle"
              onClick={() => onBulkAction(selectedUsers, 'activate')}
            >
              Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="XCircle"
              onClick={() => onBulkAction(selectedUsers, 'suspend')}
            >
              Suspend
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Crown"
              onClick={() => onBulkAction(selectedUsers, 'upgrade')}
            >
              Upgrade
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={() => onBulkAction(selectedUsers, 'delete')}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Analyses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={`${user.name} profile picture`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-foreground text-xs font-medium rounded">
                    <Icon name={user.role === 'admin' ? 'Shield' : 'User'} size={12} />
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${getSubscriptionBadge(user.subscription)}`}>
                    <Icon name="Crown" size={12} />
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${getStatusBadge(user.status)}`}>
                    <Icon name="Circle" size={8} />
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground font-medium">{user.analysisCount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{formatDate(user.lastActive)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUserAction(user.id, 'edit')}
                      className="p-1.5 hover:bg-muted rounded transition-colors duration-150"
                      aria-label="Edit user"
                    >
                      <Icon name="Edit2" size={16} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => onUserAction(user.id, 'view')}
                      className="p-1.5 hover:bg-muted rounded transition-colors duration-150"
                      aria-label="View user details"
                    >
                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => onUserAction(user.id, 'delete')}
                      className="p-1.5 hover:bg-destructive/10 rounded transition-colors duration-150"
                      aria-label="Delete user"
                    >
                      <Icon name="Trash2" size={16} className="text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {users.length} of {users.length} users
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

export default UserManagementTable;