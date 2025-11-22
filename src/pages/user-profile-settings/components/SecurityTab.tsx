import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { SecuritySettings, ActiveSession } from '../types';

interface SecurityTabProps {
  settings: SecuritySettings;
  onUpdate: (settings: SecuritySettings) => void;
}

const SecurityTab = ({ settings, onUpdate }: SecurityTabProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(settings.twoFactorEnabled);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    setIsChangingPassword(true);

    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(''), 3000);
    }, 1000);
  };

  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    onUpdate({ ...settings, twoFactorEnabled: checked });
  };

  const handleLogoutSession = (sessionId: string) => {
    const updatedSessions = settings.activeSessions.filter((s) => s.id !== sessionId);
    onUpdate({ ...settings, activeSessions: updatedSessions });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            description="Must be at least 8 characters long"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordError}
            required
          />
          {passwordSuccess && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3 flex items-center gap-2">
              <Icon name="CheckCircle" size={18} className="text-success" />
              <p className="text-sm text-success font-medium">{passwordSuccess}</p>
            </div>
          )}
          <Button
            variant="default"
            onClick={handlePasswordChange}
            loading={isChangingPassword}
            iconName="Lock"
            iconPosition="left"
          >
            Update Password
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Last changed: {settings.lastPasswordChange}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
        <Checkbox
          label="Enable Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          checked={twoFactorEnabled}
          onChange={(e) => handleTwoFactorToggle(e.target.checked)}
        />
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex gap-3">
              <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">2FA Enabled</p>
                <p className="text-xs text-muted-foreground">
                  Your account is protected with two-factor authentication. You'll need to enter a code from your authenticator app when signing in.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Sessions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage devices where you're currently signed in
        </p>
        <div className="space-y-3">
          {settings.activeSessions.map((session: ActiveSession) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Monitor" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 text-xs text-success">(Current)</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} • {session.ipAddress}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last active: {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLogoutSession(session.id)}
                >
                  Logout
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;