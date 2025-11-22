import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { TeamMember } from '../types';

interface TeamMemberListProps {
  members: TeamMember[];
  onInviteMember: () => void;
  onRemoveMember: (memberId: string) => void;
  onChangeRole: (memberId: string, role: 'owner' | 'editor' | 'viewer') => void;
}

const TeamMemberList = ({
  members,
  onInviteMember,
  onRemoveMember,
  onChangeRole,
}: TeamMemberListProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-primary/10 text-primary';
      case 'editor':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const roleOptions = [
    { value: 'owner', label: 'Owner' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={16} />
          <span>Team Members</span>
          <span className="text-xs text-muted-foreground">({members.length})</span>
        </button>
        <Button
          variant="default"
          size="sm"
          onClick={onInviteMember}
          iconName="UserPlus"
          iconPosition="left"
          iconSize={16}
        >
          Invite
        </Button>
      </div>

      {isExpanded && (
        <div className="divide-y divide-border">
          {members.map((member) => (
            <div key={member.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <Image
                    src={member.avatar}
                    alt={`${member.name} profile picture`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                      member.status
                    )}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {member.name}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(
                        member.role
                      )}`}
                    >
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                  {member.status !== 'online' && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Last active:{' '}
                      {member.lastActive.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {member.role !== 'owner' && (
                    <>
                      <Select
                        options={roleOptions}
                        value={member.role}
                        onChange={(value) =>
                          onChangeRole(member.id, value as 'owner' | 'editor' | 'viewer')
                        }
                        className="w-28"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveMember(member.id)}
                        iconName="UserMinus"
                        iconSize={16}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMemberList;