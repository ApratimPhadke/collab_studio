import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectPreview = ({ formData }) => {
  const getSkillLabel = (skillValue) => {
    const skillMap = {
      'javascript': 'JavaScript',
      'python': 'Python',
      'react': 'React',
      'nodejs': 'Node.js',
      'machine-learning': 'Machine Learning',
      'data-analysis': 'Data Analysis',
      'ui-ux-design': 'UI/UX Design',
      'project-management': 'Project Management',
      'research': 'Research Methods',
      'technical-writing': 'Technical Writing',
      'database-design': 'Database Design',
      'cloud-computing': 'Cloud Computing',
      'cybersecurity': 'Cybersecurity',
      'mobile-development': 'Mobile Development',
      'devops': 'DevOps'
    };
    return skillMap[skillValue] || skillValue;
  };

  const getDepartmentLabel = (deptValue) => {
    const deptMap = {
      'computer-science': 'Computer Science',
      'electrical': 'Electrical Engineering',
      'mechanical': 'Mechanical Engineering',
      'civil': 'Civil Engineering',
      'business': 'Business Administration',
      'mathematics': 'Mathematics',
      'physics': 'Physics',
      'chemistry': 'Chemistry',
      'biology': 'Biology',
      'interdisciplinary': 'Interdisciplinary'
    };
    return deptMap[deptValue] || deptValue;
  };

  const getProjectTypeLabel = (typeValue) => {
    const typeMap = {
      'research': 'Research Project',
      'development': 'Software Development',
      'internship': 'Internship Opportunity',
      'collaboration': 'Academic Collaboration',
      'thesis': 'Thesis Project',
      'hackathon': 'Hackathon Team'
    };
    return typeMap[typeValue] || typeValue;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Project Preview
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-6">
          This is how your project will appear to students browsing for opportunities.
        </p>
      </div>

      {/* Project Card Preview */}
      <div className="border border-border rounded-lg bg-card p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-caption font-medium">
                Professor Post
              </span>
              {formData.basicInfo.projectType && (
                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-caption">
                  {getProjectTypeLabel(formData.basicInfo.projectType)}
                </span>
              )}
            </div>
            <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
              {formData.basicInfo.title || 'Project Title'}
            </h4>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Building" size={16} />
                <span>{getDepartmentLabel(formData.basicInfo.department) || 'Department'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{formData.basicInfo.duration || 'Duration'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{formData.basicInfo.location || 'Location'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm font-body text-foreground line-clamp-3">
            {formData.basicInfo.description || 'Project description will appear here...'}
          </p>
        </div>

        {/* Team Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-heading font-semibold text-foreground">
              {formData.teamRequirements.teamSize || '0'}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Team Size</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-heading font-semibold text-success">
              {formData.teamRequirements.availableSpots || '0'}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Available</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-heading font-semibold text-foreground">
              {formData.teamRequirements.experienceLevel || 'Any'}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Level</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-heading font-semibold text-foreground">
              {formData.timeline.timeCommitment || 'TBD'}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Time/Week</div>
          </div>
        </div>

        {/* Required Skills */}
        {formData.teamRequirements.requiredSkills.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-body font-medium text-foreground mb-2">Required Skills</h5>
            <div className="flex flex-wrap gap-2">
              {formData.teamRequirements.requiredSkills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-caption"
                >
                  {getSkillLabel(skill.skill)} ({skill.level})
                </span>
              ))}
              {formData.teamRequirements.requiredSkills.length > 6 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption">
                  +{formData.teamRequirements.requiredSkills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="mb-4">
          <h5 className="text-sm font-body font-medium text-foreground mb-2">Important Dates</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Application Deadline:</span>
              <span className="font-medium text-foreground">
                {formatDate(formData.timeline.applicationDeadline)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Project Start:</span>
              <span className="font-medium text-foreground">
                {formatDate(formData.timeline.startDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Team Roles */}
        {formData.teamRequirements.roles.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-body font-medium text-foreground mb-2">Open Positions</h5>
            <div className="space-y-2">
              {formData.teamRequirements.roles.slice(0, 3).map((role, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{role.title || `Role ${index + 1}`}</span>
                  <span className="text-muted-foreground">{role.count} position{role.count !== 1 ? 's' : ''}</span>
                </div>
              ))}
              {formData.teamRequirements.roles.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{formData.teamRequirements.roles.length - 3} more roles
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={16} />
              <span>0 views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>0 applications</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Heart" size={16} className="mr-1" />
              Save
            </Button>
            <Button variant="default" size="sm">
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Notes */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h5 className="text-sm font-body font-medium text-foreground mb-1">Preview Notes</h5>
            <ul className="text-xs font-body text-muted-foreground space-y-1">
              <li>• This preview shows how your project will appear in the explore section</li>
              <li>• Professor posts are automatically prioritized and highlighted</li>
              <li>• Students can filter projects by department, skills, and project type</li>
              <li>• Complete all sections for better visibility and more applications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;