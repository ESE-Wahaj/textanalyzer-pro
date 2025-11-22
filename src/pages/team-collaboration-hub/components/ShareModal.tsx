import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import { ShareSettings } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  currentSettings: ShareSettings;
  onSave: (settings: ShareSettings) => void;
}

const ShareModal = ({
  isOpen,
  onClose,
  documentTitle,
  currentSettings,
  onSave,
}: ShareModalProps) => {
  const [settings, setSettings] = useState<ShareSettings>(currentSettings);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const publicLink = `https://textanalyzer.pro/share/${Math.random().toString(36).substring(7)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const expiryOptions = [
    { value: 'never', label: 'Never' },
    { value: '1day', label: '1 Day' },
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Share Document</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">{documentTitle}</h3>
            <p className="text-xs text-muted-foreground">
              Share this document with your team or create a public link
            </p>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Make document public"
              description="Anyone with the link can view this document"
              checked={settings.isPublic}
              onChange={(e) =>
                setSettings({ ...settings, isPublic: e.target.checked })
              }
            />

            {settings.isPublic && (
              <div className="ml-6 space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Public Link
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={publicLink}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={handleCopyLink}
                      iconName={copied ? 'Check' : 'Copy'}
                      iconSize={16}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                <Select
                  label="Link expires"
                  options={expiryOptions}
                  value="never"
                  onChange={() => {}}
                />

                <Checkbox
                  label="Allow comments"
                  checked={settings.allowComments}
                  onChange={(e) =>
                    setSettings({ ...settings, allowComments: e.target.checked })
                  }
                />

                <Checkbox
                  label="Allow downloads"
                  checked={settings.allowDownload}
                  onChange={(e) =>
                    setSettings({ ...settings, allowDownload: e.target.checked })
                  }
                />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Invite Team Members</h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter email address"
                className="flex-1"
              />
              <Select
                options={[
                  { value: 'viewer', label: 'Viewer' },
                  { value: 'editor', label: 'Editor' },
                  { value: 'owner', label: 'Owner' },
                ]}
                value="viewer"
                onChange={() => {}}
                className="w-32"
              />
              <Button variant="default" iconName="Send" iconSize={16}>
                Invite
              </Button>
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex gap-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Security Notice</p>
              <p className="text-xs text-muted-foreground">
                Public links can be accessed by anyone. Consider setting an expiration date
                or password protection for sensitive documents.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onSave(settings);
              onClose();
            }}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;