import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PastProjectCard = ({ project, onDownloadCertificate, onViewDetails }) => {
  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < rating ? "Star" : "Star"}
        size={14}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const getCompletionColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'abandoned': return 'bg-error text-error-foreground';
      case 'on-hold': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {project.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getCompletionColor(project.completionStatus)}`}>
              {project.completionStatus}
            </span>
          </div>
          <p className="text-muted-foreground text-sm font-body mb-2">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-caption">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              {project.startDate} - {project.endDate}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              {project.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-body text-foreground">Team Size</span>
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {project.teamSize} members
          </p>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="GitCommit" size={16} className="text-primary" />
            <span className="text-sm font-body text-foreground">Commits</span>
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {project.totalCommits}
          </p>
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-4">
        <h4 className="text-sm font-body text-foreground mb-3">Project Ratings</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-caption">Your Performance</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {getRatingStars(project.ratings.yourRating)}
              </div>
              <span className="text-sm font-caption text-foreground">
                {project.ratings.yourRating}/5
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-caption">Team Average</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {getRatingStars(Math.round(project.ratings.teamAverage))}
              </div>
              <span className="text-sm font-caption text-foreground">
                {project.ratings.teamAverage}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Gained */}
      <div className="mb-4">
        <h4 className="text-sm font-body text-foreground mb-2">Skills Gained</h4>
        <div className="flex flex-wrap gap-2">
          {project.skillsGained.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-4">
        <h4 className="text-sm font-body text-foreground mb-2">Team Members</h4>
        <div className="flex items-center gap-2">
          {project.teamMembers.map((member, index) => (
            <div key={member.id} className="relative group">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-background"
              />
              {member.isLeader && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={8} color="white" />
                </div>
              )}
              {/* Tooltip */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs font-caption text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {member.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repository Info */}
      <div className="mb-4 p-3 bg-background border border-border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Github" size={16} />
            <span className="text-sm font-body text-foreground">Final Repository</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-caption">
            <span>{project.repository.size}</span>
            <span>•</span>
            <span>{project.repository.language}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails(project.id)}
        >
          <Icon name="Eye" size={14} className="mr-2" />
          View Details
        </Button>
        {project.hasCertificate && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDownloadCertificate(project.id)}
          >
            <Icon name="Download" size={14} className="mr-2" />
            Certificate
          </Button>
        )}
        <Button variant="ghost" size="sm">
          <Icon name="ExternalLink" size={14} className="mr-2" />
          Repository
        </Button>
      </div>
    </div>
  );
};

export default PastProjectCard;