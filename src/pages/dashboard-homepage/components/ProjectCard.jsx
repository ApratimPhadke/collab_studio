import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onJoinRequest, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(project.isBookmarked || false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(project.id, !isBookmarked);
  };

  const handleJoinRequest = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onJoinRequest(project.id);
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getVacancyColor = () => {
    const percentage = (project.vacancies / project.capacity) * 100;
    if (percentage > 50) return 'text-success';
    if (percentage > 20) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={project.leader.avatar}
            alt={project.leader.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {project.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              by {project.leader.name} • {project.leader.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {project.isProfessorLed && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
              Professor Led
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Icon
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              size={18}
              className={isBookmarked ? "text-primary" : "text-muted-foreground"}
            />
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="font-body text-foreground leading-relaxed">
          {showFullDescription ? project.description : truncateDescription(project.description)}
          {project.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary hover:underline ml-1 font-medium"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Project Objectives */}
      {project.objectives && (
        <div className="mb-4">
          <h4 className="font-heading font-medium text-sm text-foreground mb-2">Project Aims:</h4>
          <ul className="space-y-1">
            {project.objectives.slice(0, 2).map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Target" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills Required */}
      <div className="mb-4">
        <h4 className="font-heading font-medium text-sm text-foreground mb-2">Skills Required:</h4>
        <div className="flex flex-wrap gap-2">
          {project.skillsRequired.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-caption"
            >
              {skill}
            </span>
          ))}
          {project.skillsRequired.length > 4 && (
            <span className="text-muted-foreground text-xs font-caption">
              +{project.skillsRequired.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Capacity and Vacancies */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-foreground">
              {project.currentMembers}/{project.capacity} members
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="UserPlus" size={16} className={getVacancyColor()} />
            <span className={`font-body text-sm font-medium ${getVacancyColor()}`}>
              {project.vacancies} spots left
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span className="font-caption text-xs">{project.timeAgo}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Link
          to="/project-details"
          state={{ projectId: project.id }}
          className="font-body text-sm text-primary hover:underline font-medium"
        >
          View Details
        </Link>
        <div className="flex items-center space-x-2">
          {project.vacancies > 0 ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleJoinRequest}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Request to Join
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Full
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;