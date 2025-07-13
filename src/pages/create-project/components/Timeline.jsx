import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const Timeline = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData('timeline', { ...formData.timeline, [field]: value });
  };

  const addMilestone = () => {
    const updatedMilestones = [...formData.timeline.milestones, { title: '', description: '', dueDate: '' }];
    handleInputChange('milestones', updatedMilestones);
  };

  const updateMilestone = (index, field, value) => {
    const updatedMilestones = formData.timeline.milestones.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    );
    handleInputChange('milestones', updatedMilestones);
  };

  const removeMilestone = (index) => {
    const updatedMilestones = formData.timeline.milestones.filter((_, i) => i !== index);
    handleInputChange('milestones', updatedMilestones);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (field, value) => {
    handleInputChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Timeline & Milestones
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-6">
          Set important dates and project milestones to keep your team on track.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Project Start Date"
          type="date"
          value={formatDateForInput(formData.timeline.startDate)}
          onChange={(e) => handleDateChange('startDate', e.target.value)}
          error={errors.startDate}
          required
          description="When will the project officially begin?"
        />

        <Input
          label="Project End Date"
          type="date"
          value={formatDateForInput(formData.timeline.endDate)}
          onChange={(e) => handleDateChange('endDate', e.target.value)}
          error={errors.endDate}
          required
          description="Expected project completion date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Application Deadline"
          type="date"
          value={formatDateForInput(formData.timeline.applicationDeadline)}
          onChange={(e) => handleDateChange('applicationDeadline', e.target.value)}
          error={errors.applicationDeadline}
          required
          description="Last date to accept applications"
        />

        <Input
          label="Team Formation Date"
          type="date"
          value={formatDateForInput(formData.timeline.teamFormationDate)}
          onChange={(e) => handleDateChange('teamFormationDate', e.target.value)}
          error={errors.teamFormationDate}
          description="When will the final team be selected?"
        />
      </div>

      {/* Project Milestones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-body font-medium text-foreground">
            Project Milestones
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={addMilestone}
            iconName="Plus"
            iconPosition="left"
          >
            Add Milestone
          </Button>
        </div>

        {formData.timeline.milestones.length === 0 && (
          <div className="text-center py-8 bg-muted rounded-lg">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-body text-muted-foreground mb-4">
              No milestones added yet. Add milestones to help track project progress.
            </p>
            <Button
              variant="outline"
              onClick={addMilestone}
              iconName="Plus"
              iconPosition="left"
            >
              Add First Milestone
            </Button>
          </div>
        )}

        {formData.timeline.milestones.length > 0 && (
          <div className="space-y-4">
            {formData.timeline.milestones.map((milestone, index) => (
              <div key={index} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-body font-medium text-foreground">
                    Milestone {index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMilestone(index)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Milestone Title"
                    type="text"
                    placeholder="e.g., Project Proposal Submission"
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                  />
                  <Input
                    label="Due Date"
                    type="date"
                    value={formatDateForInput(milestone.dueDate)}
                    onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full min-h-20 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    placeholder="Describe what needs to be accomplished for this milestone..."
                    value={milestone.description}
                    onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Meeting Schedule */}
      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Meeting Schedule
        </label>
        <textarea
          className="w-full min-h-24 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
          placeholder="Describe the expected meeting frequency and format (e.g., Weekly team meetings on Fridays, Bi-weekly progress reviews with professor)..."
          value={formData.timeline.meetingSchedule}
          onChange={(e) => handleInputChange('meetingSchedule', e.target.value)}
          maxLength={300}
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.timeline.meetingSchedule.length}/300 characters
        </p>
      </div>

      {/* Time Commitment */}
      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Expected Time Commitment
        </label>
        <Input
          type="text"
          placeholder="e.g., 10-15 hours per week"
          value={formData.timeline.timeCommitment}
          onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
          description="Help students understand the weekly time investment required"
        />
      </div>
    </div>
  );
};

export default Timeline;