import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/project-details', { state: { project } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'text-success bg-success/10';
      case 'Limited':
        return 'text-warning bg-warning/10';
      case 'Full':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Research':
        return 'Search';
      case 'Development':
        return 'Code';
      case 'Internship':
        return 'Briefcase';
      case 'Collaboration':
        return 'Users';
      default:
        return 'FolderOpen';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getTypeIcon(project.type)} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-1">
                {project.title}
              </h3>
              <p className="font-caption text-sm text-muted-foreground">
                {project.department}
              </p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </div>
        </div>

        <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Project Leader */}
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src={project.leader.avatar}
            alt={project.leader.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-body font-medium text-sm text-foreground">
              {project.leader.name}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {project.leader.role}
            </p>
          </div>
          {project.leader.isProfessor && (
            <div className="px-2 py-1 bg-accent/10 text-accent rounded-full">
              <Icon name="GraduationCap" size={12} />
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption">
                +{project.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="font-caption text-sm text-foreground">
              {project.currentMembers}/{project.maxMembers} members
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="font-caption text-sm text-foreground">
              {project.duration}
            </span>
          </div>
        </div>

        {/* Match Score */}
        {project.matchScore && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption text-sm text-muted-foreground">Skill Match</span>
              <span className="font-caption text-sm font-medium text-primary">
                {project.matchScore}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.matchScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Deadline */}
        {project.deadline && (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-warning/10 rounded-lg">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="font-caption text-sm text-warning">
              Application deadline: {formatDate(project.deadline)}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="font-caption text-xs text-muted-foreground">
                {project.location}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="font-caption text-xs text-muted-foreground">
                Posted {project.postedTime}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleViewDetails}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;