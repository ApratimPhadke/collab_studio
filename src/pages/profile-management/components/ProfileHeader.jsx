import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, isEditing, onEditToggle, onSave }) => {
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editedProfile);
    onEditToggle();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative">
            <Image
              src={profile.avatar}
              alt={`${profile.name}'s profile`}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            {isEditing && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-card"
              >
                <Icon name="Camera" size={16} />
              </Button>
            )}
          </div>
          <div className="mt-4 text-center lg:text-left">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Eye" size={16} />
              <span>{profile.profileViews} profile views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Icon name="Search" size={16} />
              <span>{profile.searchAppearances} search appearances</span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-heading font-bold bg-transparent border-b border-border focus:border-primary outline-none w-full"
                  />
                  <input
                    type="text"
                    value={editedProfile.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-lg text-muted-foreground bg-transparent border-b border-border focus:border-primary outline-none w-full"
                  />
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="text-foreground bg-transparent border border-border rounded-md p-2 focus:border-primary outline-none w-full resize-none"
                    rows="3"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                    {profile.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">{profile.title}</p>
                  <p className="text-foreground mt-3 leading-relaxed">{profile.bio}</p>
                </>
              )}

              {/* Department & Year */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Icon name="GraduationCap" size={16} className="text-primary" />
                  <span className="text-sm font-medium">{profile.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-sm font-medium">{profile.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm font-medium">{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={onEditToggle}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={onEditToggle}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-primary">
            {profile.stats.projectsCompleted}
          </div>
          <div className="text-sm text-muted-foreground">Projects Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-success">
            {profile.stats.completionRate}%
          </div>
          <div className="text-sm text-muted-foreground">Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-heading font-bold text-accent">
              {profile.stats.averageRating}
            </span>
            <Icon name="Star" size={16} className="text-accent fill-current" />
          </div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-secondary">
            {profile.stats.collaborations}
          </div>
          <div className="text-sm text-muted-foreground">Collaborations</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;