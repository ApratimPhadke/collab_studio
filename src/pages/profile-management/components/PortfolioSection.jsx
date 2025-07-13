import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioSection = ({ projects, onProjectsUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'on-hold':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground">Portfolio</h2>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Icon name={isEditing ? "X" : "Edit"} size={16} className="mr-2" />
            {isEditing ? "Done" : "Manage"}
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No projects in your portfolio yet.</p>
            <Button variant="outline" className="mt-3">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-muted rounded-lg border border-border overflow-hidden hover:border-primary transition-all duration-200 cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  {isEditing && (
                    <div className="absolute top-3 left-3">
                      <Button variant="destructive" size="icon" className="w-8 h-8">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={12} />
                      <span>{project.teamSize} members</span>
                    </div>
                  </div>

                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-success">
                        <Icon name="Award" size={12} />
                        <span>{project.achievements[0]}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {selectedProject.title}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Project Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.fullDescription || selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-foreground mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Duration</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(selectedProject.startDate)} - {selectedProject.endDate ? formatDate(selectedProject.endDate) : 'Present'}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Team Size</h3>
                        <p className="text-sm text-muted-foreground">{selectedProject.teamSize} members</p>
                      </div>
                    </div>

                    {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Achievements</h3>
                        <ul className="space-y-1">
                          {selectedProject.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Icon name="Award" size={14} className="text-success mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedProject.artifacts && selectedProject.artifacts.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-medium text-foreground mb-3">Project Artifacts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.artifacts.map((artifact, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start"
                        onClick={() => window.open(artifact.url, '_blank')}
                      >
                        <Icon name={artifact.type === 'code' ? 'Code' : 'FileText'} size={16} className="mr-2" />
                        {artifact.name}
                        <Icon name="ExternalLink" size={14} className="ml-auto" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioSection;