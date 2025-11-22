import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import { NotificationSettings } from '../types';

interface NotificationsTabProps {
  settings: NotificationSettings;
  onUpdate: (settings: NotificationSettings) => void;
}

const NotificationsTab = ({ settings, onUpdate }: NotificationsTabProps) => {
  const [formData, setFormData] = useState<NotificationSettings>(settings);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const frequencyOptions = [
    { value: 'instant', label: 'Instant' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' },
  ];

  const handleCheckboxChange = (field: keyof NotificationSettings, checked: boolean) => {
    setFormData({ ...formData, [field]: checked });
    setIsEditing(true);
  };

  const handleFrequencyChange = (value: string) => {
    setFormData({ ...formData, notificationFrequency: value });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setIsEditing(false);
      setSaveMessage('Notification settings updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(settings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="Email Notifications"
            description="Receive notifications via email"
            checked={formData.emailNotifications}
            onChange={(e) => handleCheckboxChange('emailNotifications', e.target.checked)}
          />
          <Checkbox
            label="Collaboration Updates"
            description="Get notified when team members comment or share documents"
            checked={formData.collaborationUpdates}
            onChange={(e) => handleCheckboxChange('collaborationUpdates', e.target.checked)}
          />
          <Checkbox
            label="System Notifications"
            description="Receive updates about system maintenance and new features"
            checked={formData.systemNotifications}
            onChange={(e) => handleCheckboxChange('systemNotifications', e.target.checked)}
          />
          <Checkbox
            label="Weekly Digest"
            description="Get a weekly summary of your analysis activity"
            checked={formData.weeklyDigest}
            onChange={(e) => handleCheckboxChange('weeklyDigest', e.target.checked)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Frequency</h3>
        <Select
          label="Delivery Frequency"
          description="Choose how often you want to receive notifications"
          options={frequencyOptions}
          value={formData.notificationFrequency}
          onChange={(value) => handleFrequencyChange(value as string)}
        />
      </div>

      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex gap-3">
          <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Important Notifications</p>
            <p className="text-xs text-muted-foreground">
              Critical security alerts and billing notifications will always be sent regardless of your preferences.
            </p>
          </div>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center gap-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <p className="text-sm text-success font-medium">{saveMessage}</p>
        </div>
      )}

      {isEditing && (
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Settings
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;