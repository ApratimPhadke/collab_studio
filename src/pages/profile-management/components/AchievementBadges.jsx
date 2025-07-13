import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const badgeTypes = {
    'project-master': {
      icon: 'Trophy',
      color: 'text-yellow-600 bg-yellow-100',
      description: 'Completed 10+ projects successfully'
    },
    'team-player': {
      icon: 'Users',
      color: 'text-blue-600 bg-blue-100',
      description: 'Highly rated by teammates'
    },
    'innovator': {
      icon: 'Lightbulb',
      color: 'text-purple-600 bg-purple-100',
      description: 'Created innovative solutions'
    },
    'mentor': {
      icon: 'GraduationCap',
      color: 'text-green-600 bg-green-100',
      description: 'Helped junior students succeed'
    },
    'researcher': {
      icon: 'Search',
      color: 'text-indigo-600 bg-indigo-100',
      description: 'Published research papers'
    },
    'leader': {
      icon: 'Crown',
      color: 'text-orange-600 bg-orange-100',
      description: 'Led multiple successful projects'
    },
    'collaborator': {
      icon: 'Handshake',
      color: 'text-teal-600 bg-teal-100',
      description: 'Excellent cross-department collaboration'
    },
    'early-adopter': {
      icon: 'Zap',
      color: 'text-pink-600 bg-pink-100',
      description: 'Quick to adopt new technologies'
    }
  };

  if (!achievements || achievements.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Achievements</h2>
        <div className="text-center py-8">
          <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No achievements unlocked yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete projects and collaborate with others to earn badges!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Achievements</h2>
        <div className="text-sm text-muted-foreground">
          {achievements.length} badge{achievements.length !== 1 ? 's' : ''} earned
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const badgeConfig = badgeTypes[achievement.type] || {
            icon: 'Award',
            color: 'text-gray-600 bg-gray-100',
            description: achievement.description
          };

          return (
            <div
              key={achievement.id}
              className="group relative bg-muted rounded-lg p-4 border border-border hover:border-primary transition-all duration-200 cursor-pointer"
            >
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full ${badgeConfig.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon name={badgeConfig.icon} size={24} />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {achievement.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(achievement.earnedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-48">
                <p className="text-xs text-popover-foreground text-center">
                  {badgeConfig.description}
                </p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress towards next achievements */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4">Progress Towards Next Badges</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Icon name="Trophy" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Project Master</p>
                <p className="text-xs text-muted-foreground">Complete 10 projects</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">7/10</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Icon name="GraduationCap" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Mentor</p>
                <p className="text-xs text-muted-foreground">Help 5 junior students</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-primary rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">2/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;