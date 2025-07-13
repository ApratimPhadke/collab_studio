import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onSave, 
  onPublish, 
  isValid, 
  isSaving, 
  isPublishing 
}) => {
  const steps = [
    { id: 1, title: 'Basic Info', icon: 'FileText' },
    { id: 2, title: 'Team Requirements', icon: 'Users' },
    { id: 3, title: 'Timeline', icon: 'Calendar' },
    { id: 4, title: 'Advanced Options', icon: 'Settings' },
    { id: 5, title: 'Preview', icon: 'Eye' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${status === 'completed' 
                    ? 'bg-success text-success-foreground' 
                    : status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`
                    text-sm font-body font-medium
                    ${status === 'current' ?'text-primary' 
                      : status === 'completed' ?'text-success' :'text-muted-foreground'
                    }
                  `}>
                    {step.title}
                  </div>
                  {status === 'current' && (
                    <div className="text-xs text-muted-foreground">
                      Step {step.id} of {totalSteps}
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-px h-8 ml-4
                    ${status === 'completed' ? 'bg-success' : 'bg-border'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-body font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-body text-muted-foreground">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-3">
        {/* Save Draft Button */}
        <Button
          variant="outline"
          fullWidth
          onClick={onSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save as Draft
        </Button>

        {/* Navigation Buttons */}
        <div className="flex space-x-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={onPrevious}
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
              onClick={onNext}
              disabled={!isValid}
              iconName="ChevronRight"
              iconPosition="right"
              className="flex-1"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={onPublish}
              loading={isPublishing}
              disabled={!isValid}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Publish Project
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>Your progress is automatically saved</p>
          {currentStep === totalSteps && (
            <p className="text-primary">Review your project before publishing</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-body font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={() => window.open('/explore-projects', '_blank')}
          >
            View Other Projects
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="HelpCircle"
            iconPosition="left"
          >
            Get Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;