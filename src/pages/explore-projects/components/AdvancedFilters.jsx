import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AdvancedFilters = ({ isOpen, onClose, onApply, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    dateRange: true,
    professor: true,
    skills: true,
    requirements: true
  });

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'cs', label: 'Computer Science' },
    { value: 'ee', label: 'Electrical Engineering' },
    { value: 'me', label: 'Mechanical Engineering' },
    { value: 'ce', label: 'Civil Engineering' },
    { value: 'che', label: 'Chemical Engineering' }
  ];

  const skillOptions = [
    { value: 'react', label: 'React' },
    { value: 'python', label: 'Python' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'ds', label: 'Data Science' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'Internet of Things' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      department: 'all',
      projectType: 'all',
      capacity: 'all',
      skills: [],
      dateRange: { start: '', end: '' },
      professorInvolved: false,
      minMatchScore: 0,
      requirements: []
    };
    setLocalFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">Advanced Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Date Range Section */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('dateRange')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-body font-semibold text-base text-foreground">Date Range</h3>
                <Icon
                  name={expandedSections.dateRange ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-muted-foreground"
                />
              </button>
              {expandedSections.dateRange && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                  <Input
                    type="date"
                    label="Start Date"
                    value={localFilters.dateRange?.start || ''}
                    onChange={(e) => handleFilterChange('dateRange', {
                      ...localFilters.dateRange,
                      start: e.target.value
                    })}
                  />
                  <Input
                    type="date"
                    label="End Date"
                    value={localFilters.dateRange?.end || ''}
                    onChange={(e) => handleFilterChange('dateRange', {
                      ...localFilters.dateRange,
                      end: e.target.value
                    })}
                  />
                </div>
              )}
            </div>

            {/* Professor Involvement Section */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('professor')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-body font-semibold text-base text-foreground">Professor Involvement</h3>
                <Icon
                  name={expandedSections.professor ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-muted-foreground"
                />
              </button>
              {expandedSections.professor && (
                <div className="pl-4 space-y-3">
                  <Checkbox
                    label="Professor-led projects only"
                    checked={localFilters.professorInvolved || false}
                    onChange={(e) => handleFilterChange('professorInvolved', e.target.checked)}
                  />
                  <div className="space-y-2">
                    <label className="font-body text-sm text-foreground">Minimum Match Score</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={localFilters.minMatchScore || 0}
                      onChange={(e) => handleFilterChange('minMatchScore', parseInt(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="font-medium text-primary">{localFilters.minMatchScore || 0}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('skills')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-body font-semibold text-base text-foreground">Required Skills</h3>
                <Icon
                  name={expandedSections.skills ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-muted-foreground"
                />
              </button>
              {expandedSections.skills && (
                <div className="pl-4">
                  <Select
                    label="Select Skills"
                    multiple
                    searchable
                    options={skillOptions}
                    value={localFilters.skills || []}
                    onChange={(value) => handleFilterChange('skills', value)}
                    placeholder="Choose required skills..."
                  />
                </div>
              )}
            </div>

            {/* Requirements Section */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('requirements')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-body font-semibold text-base text-foreground">Additional Requirements</h3>
                <Icon
                  name={expandedSections.requirements ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-muted-foreground"
                />
              </button>
              {expandedSections.requirements && (
                <div className="pl-4 space-y-3">
                  <Checkbox
                    label="Has GitHub repository access"
                    checked={localFilters.requirements?.includes('github') || false}
                    onChange={(e) => {
                      const requirements = localFilters.requirements || [];
                      if (e.target.checked) {
                        handleFilterChange('requirements', [...requirements, 'github']);
                      } else {
                        handleFilterChange('requirements', requirements.filter(r => r !== 'github'));
                      }
                    }}
                  />
                  <Checkbox
                    label="Immediate start available"
                    checked={localFilters.requirements?.includes('immediate') || false}
                    onChange={(e) => {
                      const requirements = localFilters.requirements || [];
                      if (e.target.checked) {
                        handleFilterChange('requirements', [...requirements, 'immediate']);
                      } else {
                        handleFilterChange('requirements', requirements.filter(r => r !== 'immediate'));
                      }
                    }}
                  />
                  <Checkbox
                    label="Remote collaboration allowed"
                    checked={localFilters.requirements?.includes('remote') || false}
                    onChange={(e) => {
                      const requirements = localFilters.requirements || [];
                      if (e.target.checked) {
                        handleFilterChange('requirements', [...requirements, 'remote']);
                      } else {
                        handleFilterChange('requirements', requirements.filter(r => r !== 'remote'));
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button variant="outline" onClick={handleReset}>
            Reset All
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;