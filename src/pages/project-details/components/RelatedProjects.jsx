import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProjects = ({ projects }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Related Projects
        </h2>
        <Link to="/explore-projects">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project-details?id=${project.id}`}
            className="block group"
          >
            <div className="border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20 group-hover:bg-primary/5">
              {/* Project Header */}
              <div className="flex items-start gap-3 mb-3">
                <Image
                  src={project.leader.avatar}
                  alt={project.leader.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-medium text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                    {project.title}
                  </h3>
                  <p className="font-caption text-xs text-muted-foreground">
                    by {project.leader.name}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                  project.status === 'Open' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Project Description */}
              <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.shortDescription}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs font-caption rounded">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded">
                    +{project.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={12} />
                    <span>{project.currentMembers}/{project.maxMembers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    <span>{project.duration}</span>
                  </div>
                </div>
                {project.professorInvolved && (
                  <div className="flex items-center gap-1">
                    <Icon name="GraduationCap" size={12} className="text-primary" />
                    <span className="text-primary">Prof. Mentored</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;