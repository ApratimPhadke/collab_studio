import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const JoinRequestModal = ({ isOpen, onClose, onSubmit, project }) => {
  const [formData, setFormData] = useState({
    motivation: '',
    experience: '',
    skills: '',
    availability: '',
    portfolio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        motivation: '',
        experience: '',
        skills: '',
        availability: '',
        portfolio: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting join request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Join Request
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Apply to join "{project.title}"
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Motivation */}
          <Input
            label="Why do you want to join this project?"
            type="text"
            placeholder="Explain your motivation and interest in this project..."
            value={formData.motivation}
            onChange={(e) => handleInputChange('motivation', e.target.value)}
            required
            description="Share what excites you about this project and how it aligns with your goals"
          />

          {/* Relevant Experience */}
          <Input
            label="Relevant Experience"
            type="text"
            placeholder="Describe your relevant experience and past projects..."
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            required
            description="Include academic projects, internships, or personal projects"
          />

          {/* Skills */}
          <Input
            label="Technical Skills"
            type="text"
            placeholder="List your technical skills relevant to this project..."
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            required
            description="Mention programming languages, frameworks, tools, etc."
          />

          {/* Availability */}
          <Input
            label="Time Availability"
            type="text"
            placeholder="How many hours per week can you commit?"
            value={formData.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            required
            description="Be realistic about your time commitment"
          />

          {/* Portfolio */}
          <Input
            label="Portfolio/GitHub (Optional)"
            type="url"
            placeholder="https://github.com/yourusername or portfolio link"
            value={formData.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            description="Share your GitHub profile or portfolio to showcase your work"
          />

          {/* Project Requirements Reminder */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-body font-medium text-foreground mb-2 flex items-center gap-2">
              <Icon name="Info" size={16} className="text-primary" />
              Project Requirements Reminder
            </h3>
            <div className="space-y-1">
              {project.technicalRequirements.filter(req => req.required).map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="font-body text-muted-foreground">{req.skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              className="flex-1"
              iconName="Send"
              iconPosition="left"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRequestModal;