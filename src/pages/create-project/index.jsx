import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import BasicInformation from './components/BasicInformation';
import TeamRequirements from './components/TeamRequirements';
import Timeline from './components/Timeline';
import AdvancedOptions from './components/AdvancedOptions';
import ProjectPreview from './components/ProjectPreview';
import FormNavigation from './components/FormNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      description: '',
      projectType: '',
      department: '',
      duration: '',
      location: '',
      learningObjectives: ''
    },
    teamRequirements: {
      teamSize: '',
      availableSpots: '',
      experienceLevel: '',
      requiredSkills: [],
      roles: [],
      additionalRequirements: ''
    },
    timeline: {
      startDate: '',
      endDate: '',
      applicationDeadline: '',
      teamFormationDate: '',
      milestones: [],
      meetingSchedule: '',
      timeCommitment: ''
    },
    advancedOptions: {
      professorInvolvement: '',
      visibility: '',
      createRepository: false,
      repositoryName: '',
      privateRepository: true,
      includeTemplate: true,
      collaborationTools: [],
      assessmentCriteria: '',
      prerequisites: '',
      allowCrossDepartment: true,
      requirePortfolio: false,
      enableNotifications: true,
      allowLateApplications: false,
      contactEmail: '',
      officeHours: ''
    }
  });

  const [errors, setErrors] = useState({});

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleSaveDraft(true); // Silent save
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('project-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setLastSaved(new Date(localStorage.getItem('project-draft-timestamp')));
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for the updated section
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(data).forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Basic Information
        if (!formData.basicInfo.title.trim()) {
          newErrors.title = 'Project title is required';
        }
        if (!formData.basicInfo.description.trim()) {
          newErrors.description = 'Project description is required';
        }
        if (!formData.basicInfo.projectType) {
          newErrors.projectType = 'Project type is required';
        }
        if (!formData.basicInfo.department) {
          newErrors.department = 'Department is required';
        }
        if (!formData.basicInfo.duration.trim()) {
          newErrors.duration = 'Duration is required';
        }
        break;

      case 2: // Team Requirements
        if (!formData.teamRequirements.teamSize || formData.teamRequirements.teamSize < 1) {
          newErrors.teamSize = 'Team size must be at least 1';
        }
        if (!formData.teamRequirements.availableSpots || formData.teamRequirements.availableSpots < 1) {
          newErrors.availableSpots = 'Available spots must be at least 1';
        }
        if (formData.teamRequirements.availableSpots > formData.teamRequirements.teamSize) {
          newErrors.availableSpots = 'Available spots cannot exceed team size';
        }
        if (!formData.teamRequirements.experienceLevel) {
          newErrors.experienceLevel = 'Experience level is required';
        }
        break;

      case 3: // Timeline
        if (!formData.timeline.startDate) {
          newErrors.startDate = 'Start date is required';
        }
        if (!formData.timeline.endDate) {
          newErrors.endDate = 'End date is required';
        }
        if (!formData.timeline.applicationDeadline) {
          newErrors.applicationDeadline = 'Application deadline is required';
        }
        if (formData.timeline.startDate && formData.timeline.endDate) {
          if (new Date(formData.timeline.startDate) >= new Date(formData.timeline.endDate)) {
            newErrors.endDate = 'End date must be after start date';
          }
        }
        if (formData.timeline.applicationDeadline && formData.timeline.startDate) {
          if (new Date(formData.timeline.applicationDeadline) >= new Date(formData.timeline.startDate)) {
            newErrors.applicationDeadline = 'Application deadline must be before start date';
          }
        }
        break;

      case 4: // Advanced Options
        if (!formData.advancedOptions.professorInvolvement) {
          newErrors.professorInvolvement = 'Professor involvement level is required';
        }
        if (!formData.advancedOptions.visibility) {
          newErrors.visibility = 'Project visibility is required';
        }
        break;

      case 5: // Preview - no validation needed
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = async (silent = false) => {
    if (!silent) setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('project-draft', JSON.stringify(formData));
      localStorage.setItem('project-draft-timestamp', new Date().toISOString());
      
      setLastSaved(new Date());
      
      if (!silent) {
        // Show success message
        console.log('Draft saved successfully');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      if (!silent) setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    // Validate all steps
    let allValid = true;
    for (let step = 1; step <= totalSteps - 1; step++) {
      setCurrentStep(step);
      if (!validateCurrentStep()) {
        allValid = false;
        break;
      }
    }
    setCurrentStep(5); // Return to preview

    if (!allValid) {
      console.log('Please fix validation errors before publishing');
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      localStorage.removeItem('project-draft');
      localStorage.removeItem('project-draft-timestamp');
      
      console.log('Project published successfully');
      navigate('/my-projects');
    } catch (error) {
      console.error('Error publishing project:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <TeamRequirements
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <Timeline
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <AdvancedOptions
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return <ProjectPreview formData={formData} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    'Basic Information',
    'Team Requirements',
    'Timeline & Milestones',
    'Advanced Options',
    'Preview & Publish'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={[
            { label: 'Home', path: '/dashboard-homepage' },
            { label: 'Create Project', path: '/create-project', isActive: true }
          ]} />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Create New Project
                </h1>
                <p className="text-lg font-body text-muted-foreground">
                  {stepTitles[currentStep - 1]}
                </p>
              </div>
              
              {lastSaved && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Save" size={16} />
                  <span>
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FormNavigation
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onSave={() => handleSaveDraft(false)}
                  onPublish={handlePublish}
                  isValid={validateCurrentStep()}
                  isSaving={isSaving}
                  isPublishing={isPublishing}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
                {renderCurrentStep()}
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden mt-6 flex space-x-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    iconName="ChevronLeft"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button
                    variant="default"
                    onClick={handleNext}
                    disabled={!validateCurrentStep()}
                    iconName="ChevronRight"
                    iconPosition="right"
                    className="flex-1"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handlePublish}
                    loading={isPublishing}
                    disabled={!validateCurrentStep()}
                    iconName="Send"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Publish Project
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;