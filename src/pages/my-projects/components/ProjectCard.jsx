import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onLeaveProject, onInviteMembers, onOpenChat }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-secondary text-secondary-foreground';
      case 'on-hold': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {project.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-muted-foreground text-sm font-body mb-2">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-caption">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              Due: {project.deadline}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              {project.members.length}/{project.capacity}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChat(project.id)}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="MessageCircle" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onInviteMembers(project.id)}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="UserPlus" size={16} />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-foreground">Progress</span>
          <span className="text-sm font-caption text-muted-foreground">{project.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-foreground">Team Members</span>
          <Link 
            to="/project-details" 
            className="text-xs text-primary hover:underline font-caption"
          >
            View All
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {project.members.slice(0, 4).map((member, index) => (
            <div key={member.id} className="relative">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-background"
              />
              {member.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
              )}
            </div>
          ))}
          {project.members.length > 4 && (
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-caption text-muted-foreground">
                +{project.members.length - 4}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-4">
        <h4 className="text-sm font-body text-foreground mb-2">Recent Activity</h4>
        <div className="space-y-2">
          {project.recentActivity.slice(0, 2).map((activity, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground font-caption">
              <Icon name={activity.icon} size={12} />
              <span>{activity.message}</span>
              <span className="ml-auto">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Repository Status */}
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Github" size={16} />
            <span className="text-sm font-body text-foreground">Repository</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-caption">
              {project.repository.commits} commits
            </span>
            <Button variant="outline" size="xs">
              <Icon name="Download" size={12} className="mr-1" />
              Clone
            </Button>
          </div>
        </div>
        {project.repository.hasUpdates && (
          <div className="mt-2 flex items-center gap-1 text-xs text-warning font-caption">
            <Icon name="AlertCircle" size={12} />
            New updates available
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="default" size="sm" className="flex-1">
          <Icon name="ExternalLink" size={14} className="mr-2" />
          Open Project
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onLeaveProject(project.id)}
          className="text-error hover:text-error"
        >
          Leave
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;