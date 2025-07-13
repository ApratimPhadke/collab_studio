import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationPanel = ({ recommendations, userStats, onViewProfile }) => {
  return (
    <div className="space-y-6">
      {/* User Quick Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Your Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Active Projects</span>
            <span className="font-heading font-semibold text-primary">{userStats.activeProjects}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Completed Projects</span>
            <span className="font-heading font-semibold text-foreground">{userStats.completedProjects}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">Profile Score</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="font-heading font-semibold text-foreground">{userStats.profileScore}</span>
            </div>
          </div>
        </div>
        <Link to="/profile-management">
          <Button variant="outline" size="sm" className="w-full mt-4">
            View Profile
          </Button>
        </Link>
      </div>

      {/* Recommended Projects */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">Recommended for You</h3>
          <Link to="/explore-projects" className="text-primary hover:underline text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recommendations.map((project) => (
            <div key={project.id} className="border border-border rounded-lg p-3 hover:bg-muted transition-colors duration-150">
              <div className="flex items-start space-x-3">
                <Image
                  src={project.leader.avatar}
                  alt={project.leader.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-medium text-sm text-foreground truncate">
                    {project.title}
                  </h4>
                  <p className="font-body text-xs text-muted-foreground mb-2">
                    {project.leader.name} • {project.department}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} className="text-muted-foreground" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {project.vacancies} spots
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} className="text-success" />
                      <span className="font-caption text-xs text-success">
                        {project.matchScore}% match
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Link to="/create-project">
            <Button variant="outline" size="sm" className="w-full justify-start" iconName="Plus" iconPosition="left">
              Create Project
            </Button>
          </Link>
          <Link to="/my-projects">
            <Button variant="outline" size="sm" className="w-full justify-start" iconName="FolderOpen" iconPosition="left">
              My Projects
            </Button>
          </Link>
          <Link to="/explore-projects">
            <Button variant="outline" size="sm" className="w-full justify-start" iconName="Search" iconPosition="left">
              Explore All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;