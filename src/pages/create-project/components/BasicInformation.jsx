import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicInformation = ({ formData, updateFormData, errors }) => {
  const projectTypes = [
    { value: 'research', label: 'Research Project' },
    { value: 'development', label: 'Software Development' },
    { value: 'internship', label: 'Internship Opportunity' },
    { value: 'collaboration', label: 'Academic Collaboration' },
    { value: 'thesis', label: 'Thesis Project' },
    { value: 'hackathon', label: 'Hackathon Team' }
  ];

  const departments = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'interdisciplinary', label: 'Interdisciplinary' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('basicInfo', { ...formData.basicInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Basic Information
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-6">
          Provide essential details about your project to help students understand the opportunity.
        </p>
      </div>

      <Input
        label="Project Title"
        type="text"
        placeholder="Enter a clear, descriptive project title"
        value={formData.basicInfo.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        error={errors.title}
        required
        maxLength={100}
        description="Maximum 100 characters"
      />

      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Project Description <span className="text-error">*</span>
        </label>
        <textarea
          className="w-full min-h-32 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
          placeholder="Describe your project goals, methodology, expected outcomes, and what students will learn..."
          value={formData.basicInfo.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          maxLength={1000}
          rows={6}
        />
        {errors.description && (
          <p className="text-sm text-error mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formData.basicInfo.description.length}/1000 characters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Project Type"
          placeholder="Select project type"
          options={projectTypes}
          value={formData.basicInfo.projectType}
          onChange={(value) => handleInputChange('projectType', value)}
          error={errors.projectType}
          required
          description="Choose the category that best describes your project"
        />

        <Select
          label="Primary Department"
          placeholder="Select department"
          options={departments}
          value={formData.basicInfo.department}
          onChange={(value) => handleInputChange('department', value)}
          error={errors.department}
          required
          description="Main academic department for this project"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Expected Duration"
          type="text"
          placeholder="e.g., 3 months, 1 semester"
          value={formData.basicInfo.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
          error={errors.duration}
          required
          description="How long will this project run?"
        />

        <Input
          label="Project Location"
          type="text"
          placeholder="e.g., On-campus lab, Remote, Hybrid"
          value={formData.basicInfo.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          error={errors.location}
          description="Where will the work take place?"
        />
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Learning Objectives
        </label>
        <textarea
          className="w-full min-h-24 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
          placeholder="What will students learn from this project? List key skills and knowledge they'll gain..."
          value={formData.basicInfo.learningObjectives}
          onChange={(e) => handleInputChange('learningObjectives', e.target.value)}
          maxLength={500}
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.basicInfo.learningObjectives.length}/500 characters
        </p>
      </div>
    </div>
  );
};

export default BasicInformation;