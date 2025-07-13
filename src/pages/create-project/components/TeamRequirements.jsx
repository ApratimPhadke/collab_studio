import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TeamRequirements = ({ formData, updateFormData, errors }) => {
  const [newSkill, setNewSkill] = useState({ skill: '', level: 'intermediate' });

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const availableSkills = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'project-management', label: 'Project Management' },
    { value: 'research', label: 'Research Methods' },
    { value: 'technical-writing', label: 'Technical Writing' },
    { value: 'database-design', label: 'Database Design' },
    { value: 'cloud-computing', label: 'Cloud Computing' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('teamRequirements', { ...formData.teamRequirements, [field]: value });
  };

  const addSkill = () => {
    if (newSkill.skill && !formData.teamRequirements.requiredSkills.some(s => s.skill === newSkill.skill)) {
      const updatedSkills = [...formData.teamRequirements.requiredSkills, newSkill];
      handleInputChange('requiredSkills', updatedSkills);
      setNewSkill({ skill: '', level: 'intermediate' });
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = formData.teamRequirements.requiredSkills.filter(s => s.skill !== skillToRemove);
    handleInputChange('requiredSkills', updatedSkills);
  };

  const addRole = () => {
    const updatedRoles = [...formData.teamRequirements.roles, { title: '', description: '', count: 1 }];
    handleInputChange('roles', updatedRoles);
  };

  const updateRole = (index, field, value) => {
    const updatedRoles = formData.teamRequirements.roles.map((role, i) => 
      i === index ? { ...role, [field]: value } : role
    );
    handleInputChange('roles', updatedRoles);
  };

  const removeRole = (index) => {
    const updatedRoles = formData.teamRequirements.roles.filter((_, i) => i !== index);
    handleInputChange('roles', updatedRoles);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Team Requirements
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-6">
          Define the team structure and skills needed for your project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Team Size"
          type="number"
          placeholder="5"
          value={formData.teamRequirements.teamSize}
          onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || '')}
          error={errors.teamSize}
          required
          min={1}
          max={20}
          description="Total number of team members"
        />

        <Input
          label="Available Spots"
          type="number"
          placeholder="4"
          value={formData.teamRequirements.availableSpots}
          onChange={(e) => handleInputChange('availableSpots', parseInt(e.target.value) || '')}
          error={errors.availableSpots}
          required
          min={1}
          description="Open positions for students"
        />

        <Select
          label="Experience Level"
          placeholder="Select level"
          options={[
            { value: 'any', label: 'Any Level' },
            { value: 'beginner', label: 'Beginner Friendly' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' }
          ]}
          value={formData.teamRequirements.experienceLevel}
          onChange={(value) => handleInputChange('experienceLevel', value)}
          error={errors.experienceLevel}
          required
        />
      </div>

      {/* Required Skills Section */}
      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-3">
          Required Skills
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Select
              placeholder="Select a skill"
              options={availableSkills}
              value={newSkill.skill}
              onChange={(value) => setNewSkill({ ...newSkill, skill: value })}
              searchable
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              placeholder="Level"
              options={skillLevels}
              value={newSkill.level}
              onChange={(value) => setNewSkill({ ...newSkill, level: value })}
            />
          </div>
          <Button
            variant="outline"
            onClick={addSkill}
            disabled={!newSkill.skill}
            iconName="Plus"
            iconPosition="left"
          >
            Add
          </Button>
        </div>

        {formData.teamRequirements.requiredSkills.length > 0 && (
          <div className="space-y-2">
            {formData.teamRequirements.requiredSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-body font-medium text-foreground">
                    {availableSkills.find(s => s.value === skill.skill)?.label || skill.skill}
                  </span>
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-caption">
                    {skill.level}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(skill.skill)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Roles Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-body font-medium text-foreground">
            Team Roles
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={addRole}
            iconName="Plus"
            iconPosition="left"
          >
            Add Role
          </Button>
        </div>

        {formData.teamRequirements.roles.length > 0 && (
          <div className="space-y-4">
            {formData.teamRequirements.roles.map((role, index) => (
              <div key={index} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-body font-medium text-foreground">Role {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRole(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Role Title"
                      type="text"
                      placeholder="e.g., Frontend Developer, Data Analyst"
                      value={role.title}
                      onChange={(e) => updateRole(index, 'title', e.target.value)}
                    />
                  </div>
                  <Input
                    label="Positions"
                    type="number"
                    placeholder="1"
                    value={role.count}
                    onChange={(e) => updateRole(index, 'count', parseInt(e.target.value) || 1)}
                    min={1}
                    max={10}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Role Description
                  </label>
                  <textarea
                    className="w-full min-h-20 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    placeholder="Describe the responsibilities and expectations for this role..."
                    value={role.description}
                    onChange={(e) => updateRole(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Additional Requirements
        </label>
        <textarea
          className="w-full min-h-24 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
          placeholder="Any specific requirements, prerequisites, or expectations for team members..."
          value={formData.teamRequirements.additionalRequirements}
          onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
          maxLength={500}
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.teamRequirements.additionalRequirements.length}/500 characters
        </p>
      </div>
    </div>
  );
};

export default TeamRequirements;