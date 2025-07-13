import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onCreateProject, onExploreProjects, onViewProfile }) => {
  const actions = [
    {
      title: 'Create New Project',
      description: 'Start a new collaboration project',
      icon: 'Plus',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      action: onCreateProject,
      link: '/create-project'
    },
    {
      title: 'Explore Projects',
      description: 'Find projects to join',
      icon: 'Search',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      action: onExploreProjects,
      link: '/explore-projects'
    },
    {
      title: 'Update Profile',
      description: 'Enhance your visibility',
      icon: 'User',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      action: onViewProfile,
      link: '/profile-management'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`group p-4 border ${action.borderColor} rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105 block`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={20} className={action.color} />
              </div>
              <div>
                <h3 className="font-body font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground font-caption">
                  {action.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-caption">
                Click to proceed
              </span>
              <Icon 
                name="ArrowRight" 
                size={14} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;