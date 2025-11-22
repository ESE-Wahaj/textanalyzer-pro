import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { UserProfile } from '../types';

interface ProfileTabProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileTab = ({ profile, onUpdate }: ProfileTabProps) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const timezoneOptions = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC+0', label: 'UTC (UTC+0)' },
    { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
    { value: 'UTC+5:30', label: 'India Standard Time (UTC+5:30)' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData({ ...formData, [field]: value });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handlePhotoUpload = () => {
    setSaveMessage('Photo upload functionality would be implemented here');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Image
              src={formData.avatar}
              alt="Professional headshot of user in business attire"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              onClick={handlePhotoUpload}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-150"
              aria-label="Upload new photo"
            >
              <Icon name="Camera" size={16} />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium mb-1">Upload a new photo</p>
            <p className="text-xs text-muted-foreground mb-3">
              JPG, PNG or GIF. Max size 2MB. Recommended 400x400px.
            </p>
            <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
              Choose File
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          <Input
            label="Organization"
            type="text"
            value={formData.organization}
            onChange={(e) => handleInputChange('organization', e.target.value)}
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          />
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={formData.timezone}
            onChange={(value) => handleInputChange('timezone', value as string)}
          />
          <Select
            label="Language"
            options={languageOptions}
            value={formData.language}
            onChange={(value) => handleInputChange('language', value as string)}
          />
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
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;