import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectSidebar = ({ project, onJoinRequest, onBookmark, onShare, isBookmarked }) => {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Button
            variant="default"
            size="default"
            fullWidth
            onClick={onJoinRequest}
            disabled={project.status !== 'Open'}
            iconName="UserPlus"
            iconPosition="left"
          >
            {project.status === 'Open' ? 'Request to Join' : 'Applications Closed'}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBookmark}
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            >
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              iconName="Share2"
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Project Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="font-body text-sm text-muted-foreground">Team Size</span>
            </div>
            <span className="font-body font-medium text-foreground">
              {project.currentMembers}/{project.maxMembers}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="font-body text-sm text-muted-foreground">Duration</span>
            </div>
            <span className="font-body font-medium text-foreground">{project.duration}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="font-body text-sm text-muted-foreground">Deadline</span>
            </div>
            <span className="font-body font-medium text-foreground">{project.deadline}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-primary" />
              <span className="font-body text-sm text-muted-foreground">Views</span>
            </div>
            <span className="font-body font-medium text-foreground">{project.views}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="UserCheck" size={16} className="text-primary" />
              <span className="font-body text-sm text-muted-foreground">Applications</span>
            </div>
            <span className="font-body font-medium text-foreground">{project.applications}</span>
          </div>
        </div>
      </div>

      {/* Team Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Team Summary</h3>
        <div className="space-y-3">
          {project.teamMembers.slice(0, 3).map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-foreground text-sm truncate">
                  {member.name}
                </p>
                <p className="font-caption text-xs text-muted-foreground truncate">
                  {member.role}
                </p>
              </div>
              {member.isLeader && (
                <Icon name="Crown" size={14} className="text-accent" />
              )}
            </div>
          ))}
          
          {project.teamMembers.length > 3 && (
            <div className="text-center pt-2">
              <span className="font-caption text-xs text-muted-foreground">
                +{project.teamMembers.length - 3} more members
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skills Required */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Key Skills</h3>
        <div className="flex flex-wrap gap-2">
          {project.technicalRequirements.slice(0, 6).map((req, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-caption rounded ${
                req.required
                  ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground'
              }`}
            >
              {req.skill}
            </span>
          ))}
          {project.technicalRequirements.length > 6 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded">
              +{project.technicalRequirements.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Contact Leader */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Project Leader</h3>
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={project.leader.avatar}
            alt={project.leader.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-body font-medium text-foreground">{project.leader.name}</h4>
            <p className="font-caption text-sm text-muted-foreground">{project.leader.year}</p>
            <p className="font-caption text-sm text-muted-foreground">{project.leader.department}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default ProjectSidebar;