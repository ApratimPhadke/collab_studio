import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectTabs = ({ project }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckSquare' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Project Description */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Project Description</h3>
        <p className="font-body text-muted-foreground leading-relaxed">
          {project.fullDescription}
        </p>
      </div>

      {/* Objectives */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Objectives</h3>
        <ul className="space-y-2">
          {project.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <Icon name="Target" size={16} className="text-primary mt-1 flex-shrink-0" />
              <span className="font-body text-muted-foreground">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Timeline</h3>
        <div className="space-y-3">
          {project.timeline.map((phase, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-caption font-medium text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">{phase.title}</h4>
                <p className="font-caption text-sm text-muted-foreground">{phase.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professor Involvement */}
      {project.professor && (
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Faculty Mentor</h3>
          <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <Image
              src={project.professor.avatar}
              alt={project.professor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-body font-medium text-foreground">{project.professor.name}</h4>
              <p className="font-caption text-sm text-muted-foreground">{project.professor.department}</p>
              <p className="font-caption text-sm text-muted-foreground">{project.professor.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Capacity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-success">{project.currentMembers}</div>
          <div className="font-caption text-sm text-success">Current Members</div>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-warning">{project.maxMembers - project.currentMembers}</div>
          <div className="font-caption text-sm text-warning">Open Positions</div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-heading font-bold text-primary">{project.maxMembers}</div>
          <div className="font-caption text-sm text-primary">Total Capacity</div>
        </div>
      </div>

      {/* Current Team Members */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Current Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-4 border border-border rounded-lg">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">{member.name}</h4>
                <p className="font-caption text-sm text-muted-foreground">{member.role}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs font-caption rounded">
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
              {member.isLeader && (
                <Icon name="Crown" size={16} className="text-accent" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Open Roles */}
      {project.openRoles.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Open Positions</h3>
          <div className="space-y-3">
            {project.openRoles.map((role, index) => (
              <div key={index} className="p-4 border border-dashed border-border rounded-lg">
                <h4 className="font-body font-medium text-foreground mb-2">{role.title}</h4>
                <p className="font-body text-sm text-muted-foreground mb-3">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.requiredSkills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Technical Requirements</h3>
        <div className="space-y-3">
          {project.technicalRequirements.map((req, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Icon 
                  name={req.required ? "CheckCircle" : "Circle"} 
                  size={16} 
                  className={req.required ? "text-success" : "text-muted-foreground"} 
                />
                <div>
                  <span className="font-body font-medium text-foreground">{req.skill}</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-caption rounded ${
                    req.required 
                      ? 'bg-error/10 text-error' :'bg-muted text-muted-foreground'
                  }`}>
                    {req.required ? 'Required' : 'Optional'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < req.level ? "text-accent fill-current" : "text-muted-foreground"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Soft Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.softSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Icon name="User" size={16} className="text-primary" />
              <span className="font-body text-foreground">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time Commitment */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Time Commitment</h3>
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="font-body font-medium text-foreground">Expected Commitment</span>
          </div>
          <p className="font-body text-muted-foreground">{project.timeCommitment}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-body font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'requirements' && renderRequirements()}
      </div>
    </div>
  );
};

export default ProjectTabs;