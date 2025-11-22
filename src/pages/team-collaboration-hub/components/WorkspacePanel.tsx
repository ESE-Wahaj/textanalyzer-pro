import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Workspace } from '../types';

interface WorkspacePanelProps {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  onWorkspaceChange: (workspaceId: string) => void;
  onCreateWorkspace: () => void;
}

const WorkspacePanel = ({
  workspaces,
  activeWorkspaceId,
  onWorkspaceChange,
  onCreateWorkspace,
}: WorkspacePanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={16} />
          <span>Workspaces</span>
          <span className="text-xs text-muted-foreground">({workspaces.length})</span>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCreateWorkspace}
          iconName="Plus"
          iconSize={16}
        />
      </div>

      {isExpanded && (
        <div className="p-2">
          {workspaces.map((workspace) => {
            const isActive = workspace.id === activeWorkspaceId;
            return (
              <button
                key={workspace.id}
                onClick={() => onWorkspaceChange(workspace.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-primary/20' : 'bg-muted'
                  }`}
                >
                  <Icon name={workspace.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{workspace.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {workspace.documents.length} documents · {workspace.members.length}{' '}
                    members
                  </p>
                </div>
                {isActive && <Icon name="Check" size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkspacePanel;