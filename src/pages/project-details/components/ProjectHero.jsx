import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectHero = ({ project, onJoinRequest, onBookmark, onShare, onMessage, isBookmarked }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Project Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <Image
              src={project.leader.avatar}
              alt={project.leader.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                {project.title}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-body text-sm text-muted-foreground">Led by</span>
                <span className="font-body font-medium text-foreground">{project.leader.name}</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded-full">
                  {project.leader.year}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Users" size={16} />
                  <span>{project.currentMembers}/{project.maxMembers} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  <span>Deadline: {project.deadline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-caption font-medium ${
              project.status === 'Open' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
            }`}>
              {project.status}
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-caption font-medium">
              {project.department}
            </span>
            {project.professorInvolved && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption font-medium">
                Professor Mentored
              </span>
            )}
          </div>

          {/* Quick Description */}
          <p className="font-body text-muted-foreground text-sm lg:text-base leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 lg:w-48">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onJoinRequest}
            disabled={project.status !== 'Open'}
            iconName="UserPlus"
            iconPosition="left"
          >
            {project.status === 'Open' ? 'Request to Join' : 'Applications Closed'}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="default"
              onClick={onBookmark}
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              className="flex-1"
            >
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={onShare}
              iconName="Share2"
              className="flex-1"
            >
              Share
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="default"
            fullWidth
            onClick={onMessage}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Message Leader
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;