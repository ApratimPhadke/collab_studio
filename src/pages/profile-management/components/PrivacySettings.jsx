import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySettings = ({ settings, onSettingsUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key, value) => {
    const updatedSettings = { ...localSettings, [key]: value };
    setLocalSettings(updatedSettings);
    onSettingsUpdate(updatedSettings);
  };

  const privacyOptions = [
    {
      key: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Who can view your complete profile',
      options: [
        { value: 'public', label: 'Everyone' },
        { value: 'college', label: 'College Members Only' },
        { value: 'connections', label: 'Connections Only' },
        { value: 'private', label: 'Private' }
      ]
    },
    {
      key: 'contactVisibility',
      title: 'Contact Information',
      description: 'Who can see your email and contact details',
      options: [
        { value: 'public', label: 'Everyone' },
        { value: 'college', label: 'College Members Only' },
        { value: 'connections', label: 'Connections Only' },
        { value: 'private', label: 'Hidden' }
      ]
    },
    {
      key: 'projectVisibility',
      title: 'Project Portfolio',
      description: 'Who can view your completed projects',
      options: [
        { value: 'public', label: 'Everyone' },
        { value: 'college', label: 'College Members Only' },
        { value: 'connections', label: 'Connections Only' },
        { value: 'private', label: 'Private' }
      ]
    }
  ];

  const notificationSettings = [
    {
      key: 'projectInvitations',
      title: 'Project Invitations',
      description: 'Receive notifications when invited to join projects'
    },
    {
      key: 'skillEndorsements',
      title: 'Skill Endorsements',
      description: 'Get notified when someone endorses your skills'
    },
    {
      key: 'profileViews',
      title: 'Profile Views',
      description: 'Weekly summary of who viewed your profile'
    },
    {
      key: 'projectUpdates',
      title: 'Project Updates',
      description: 'Updates from projects you\'re involved in'
    },
    {
      key: 'marketingEmails',
      title: 'Platform Updates',
      description: 'News and updates about Collab Studio features'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Privacy & Settings</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-8">
          {/* Privacy Settings */}
          <div>
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-primary" />
              Privacy Controls
            </h3>
            <div className="space-y-6">
              {privacyOptions.map((option) => (
                <div key={option.key} className="bg-muted rounded-lg p-4">
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {option.options.map((choice) => (
                      <label
                        key={choice.value}
                        className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors duration-200 ${
                          localSettings[option.key] === choice.value
                            ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-foreground hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={option.key}
                          value={choice.value}
                          checked={localSettings[option.key] === choice.value}
                          onChange={(e) => handleSettingChange(option.key, e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{choice.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Icon name="Bell" size={16} className="text-primary" />
              Notification Preferences
            </h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.key} className="flex items-start gap-3">
                    <Checkbox
                      checked={localSettings[setting.key] || false}
                      onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{setting.title}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data & Security */}
          <div>
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Icon name="Lock" size={16} className="text-primary" />
              Data & Security
            </h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {localSettings.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Download My Data</h4>
                    <p className="text-sm text-muted-foreground">Get a copy of all your profile and project data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} className="mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Verification */}
          <div>
            <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              Account Verification
            </h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={16} className="text-success" />
                    <div>
                      <h4 className="font-medium text-foreground">Email Verified</h4>
                      <p className="text-sm text-muted-foreground">john.doe@university.edu</p>
                    </div>
                  </div>
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="GraduationCap" size={16} className="text-success" />
                    <div>
                      <h4 className="font-medium text-foreground">Student Status Verified</h4>
                      <p className="text-sm text-muted-foreground">Computer Science, 3rd Year</p>
                    </div>
                  </div>
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Github" size={16} className="text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">GitHub Connected</h4>
                      <p className="text-sm text-muted-foreground">Link your GitHub for project integration</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;