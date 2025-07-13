import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const AdvancedOptions = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData('advancedOptions', { ...formData.advancedOptions, [field]: value });
  };

  const professorInvolvementLevels = [
    { value: 'high', label: 'High - Daily guidance and regular meetings' },
    { value: 'medium', label: 'Medium - Weekly check-ins and milestone reviews' },
    { value: 'low', label: 'Low - Monthly progress reviews and final evaluation' },
    { value: 'minimal', label: 'Minimal - Initial setup and final presentation only' }
  ];

  const collaborationTools = [
    { value: 'slack', label: 'Slack' },
    { value: 'discord', label: 'Discord' },
    { value: 'microsoft-teams', label: 'Microsoft Teams' },
    { value: 'zoom', label: 'Zoom' },
    { value: 'google-meet', label: 'Google Meet' },
    { value: 'trello', label: 'Trello' },
    { value: 'asana', label: 'Asana' },
    { value: 'notion', label: 'Notion' },
    { value: 'jira', label: 'Jira' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public - Visible to all students' },
    { value: 'department', label: 'Department Only - Visible to department students' },
    { value: 'year', label: 'Year Level - Visible to specific academic years' },
    { value: 'invite', label: 'Invite Only - Only invited students can see' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Advanced Options
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-6">
          Configure additional settings for your project collaboration.
        </p>
      </div>

      <Select
        label="Professor Involvement Level"
        placeholder="Select involvement level"
        options={professorInvolvementLevels}
        value={formData.advancedOptions.professorInvolvement}
        onChange={(value) => handleInputChange('professorInvolvement', value)}
        error={errors.professorInvolvement}
        required
        description="How actively will you be involved in the project?"
      />

      <Select
        label="Project Visibility"
        placeholder="Select visibility"
        options={visibilityOptions}
        value={formData.advancedOptions.visibility}
        onChange={(value) => handleInputChange('visibility', value)}
        error={errors.visibility}
        required
        description="Who can see and apply to this project?"
      />

      {/* Repository Setup */}
      <div className="space-y-4">
        <h4 className="text-base font-heading font-medium text-foreground">
          Repository & Code Management
        </h4>
        
        <Checkbox
          label="Create GitHub Repository"
          description="Automatically set up a GitHub repository for the project"
          checked={formData.advancedOptions.createRepository}
          onChange={(e) => handleInputChange('createRepository', e.target.checked)}
        />

        {formData.advancedOptions.createRepository && (
          <div className="ml-6 space-y-4">
            <Input
              label="Repository Name"
              type="text"
              placeholder="project-name-2025"
              value={formData.advancedOptions.repositoryName}
              onChange={(e) => handleInputChange('repositoryName', e.target.value)}
              description="Repository name (will be prefixed with organization name)"
            />

            <Checkbox
              label="Private Repository"
              description="Make the repository private (only team members can access)"
              checked={formData.advancedOptions.privateRepository}
              onChange={(e) => handleInputChange('privateRepository', e.target.checked)}
            />

            <Checkbox
              label="Include Template Files"
              description="Add README, .gitignore, and basic project structure"
              checked={formData.advancedOptions.includeTemplate}
              onChange={(e) => handleInputChange('includeTemplate', e.target.checked)}
            />
          </div>
        )}
      </div>

      {/* Collaboration Tools */}
      <div>
        <Select
          label="Preferred Collaboration Tools"
          placeholder="Select tools"
          options={collaborationTools}
          value={formData.advancedOptions.collaborationTools}
          onChange={(value) => handleInputChange('collaborationTools', value)}
          multiple
          searchable
          description="Tools that will be used for team communication and project management"
        />
      </div>

      {/* Assessment Criteria */}
      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Assessment Criteria
        </label>
        <textarea
          className="w-full min-h-24 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
          placeholder="Describe how students will be evaluated (e.g., code quality, documentation, presentation, teamwork)..."
          value={formData.advancedOptions.assessmentCriteria}
          onChange={(e) => handleInputChange('assessmentCriteria', e.target.value)}
          maxLength={500}
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.advancedOptions.assessmentCriteria.length}/500 characters
        </p>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Prerequisites & Requirements
        </label>
        <textarea
          className="w-full min-h-24 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
          placeholder="List any specific courses, knowledge, or experience required before joining this project..."
          value={formData.advancedOptions.prerequisites}
          onChange={(e) => handleInputChange('prerequisites', e.target.value)}
          maxLength={400}
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.advancedOptions.prerequisites.length}/400 characters
        </p>
      </div>

      {/* Additional Settings */}
      <div className="space-y-4">
        <h4 className="text-base font-heading font-medium text-foreground">
          Additional Settings
        </h4>
        
        <div className="space-y-3">
          <Checkbox
            label="Allow Cross-Department Applications"
            description="Students from other departments can apply to this project"
            checked={formData.advancedOptions.allowCrossDepartment}
            onChange={(e) => handleInputChange('allowCrossDepartment', e.target.checked)}
          />

          <Checkbox
            label="Require Portfolio Submission"
            description="Students must submit a portfolio or previous work samples"
            checked={formData.advancedOptions.requirePortfolio}
            onChange={(e) => handleInputChange('requirePortfolio', e.target.checked)}
          />

          <Checkbox
            label="Enable Automatic Notifications"
            description="Send updates to team members about project milestones and deadlines"
            checked={formData.advancedOptions.enableNotifications}
            onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
          />

          <Checkbox
            label="Allow Late Applications"
            description="Accept applications after the deadline (subject to approval)"
            checked={formData.advancedOptions.allowLateApplications}
            onChange={(e) => handleInputChange('allowLateApplications', e.target.checked)}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Contact Email"
          type="email"
          placeholder="professor@university.edu"
          value={formData.advancedOptions.contactEmail}
          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
          description="Alternative contact email for project inquiries"
        />

        <Input
          label="Office Hours"
          type="text"
          placeholder="Mon-Wed 2-4 PM, Room 301"
          value={formData.advancedOptions.officeHours}
          onChange={(e) => handleInputChange('officeHours', e.target.value)}
          description="When students can reach you for questions"
        />
      </div>
    </div>
  );
};

export default AdvancedOptions;