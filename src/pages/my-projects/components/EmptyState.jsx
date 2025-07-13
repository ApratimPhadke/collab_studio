import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction }) => {
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'active':
        return {
          icon: 'FolderOpen',
          title: 'No Active Projects',
          description: 'You are not currently part of any active projects. Start by exploring available projects or create your own.',
          actionText: 'Explore Projects',
          actionLink: '/explore-projects',
          secondaryActionText: 'Create Project',
          secondaryActionLink: '/create-project',
          tips: [
            'Browse projects in your department',
            'Check professor-led research opportunities',
            'Look for projects matching your skills'
          ]
        };
      case 'applications':
        return {
          icon: 'Clock',
          title: 'No Pending Applications',
          description: 'You have not applied to any projects yet. Explore available projects and submit applications to join teams.',
          actionText: 'Find Projects',
          actionLink: '/explore-projects',
          secondaryActionText: 'View Profile',
          secondaryActionLink: '/profile-management',
          tips: [
            'Complete your profile to increase acceptance chances',
            'Apply to projects matching your skills',
            'Read project requirements carefully before applying'
          ]
        };
      case 'past':
        return {
          icon: 'Archive',
          title: 'No Completed Projects',
          description: 'You have not completed any projects yet. Join active projects to start building your collaboration portfolio.',
          actionText: 'Join Projects',
          actionLink: '/explore-projects',
          secondaryActionText: 'Create Project',
          secondaryActionLink: '/create-project',
          tips: [
            'Complete projects to earn ratings and certificates',
            'Build a strong portfolio for future opportunities',
            'Collaborate with peers to gain experience'
          ]
        };
      default:
        return {
          icon: 'Folder',
          title: 'No Projects Found',
          description: 'No projects match your current filters. Try adjusting your search criteria.',
          actionText: 'Clear Filters',
          actionLink: '#',
          tips: []
        };
    }
  };

  const config = getEmptyStateConfig();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={config.icon} size={48} className="text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="max-w-md">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
          {config.title}
        </h3>
        <p className="text-muted-foreground font-body mb-6">
          {config.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          {config.actionLink === '#' ? (
            <Button variant="default" onClick={onAction}>
              {config.actionText}
            </Button>
          ) : (
            <Link to={config.actionLink}>
              <Button variant="default" className="w-full sm:w-auto">
                {config.actionText}
              </Button>
            </Link>
          )}
          
          {config.secondaryActionText && (
            <Link to={config.secondaryActionLink}>
              <Button variant="outline" className="w-full sm:w-auto">
                {config.secondaryActionText}
              </Button>
            </Link>
          )}
        </div>

        {/* Tips */}
        {config.tips.length > 0 && (
          <div className="bg-muted rounded-lg p-4 text-left">
            <h4 className="font-body font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              Tips to get started:
            </h4>
            <ul className="space-y-2">
              {config.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground font-caption">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;