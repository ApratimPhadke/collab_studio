import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onFilterChange, onAdvancedFilters }) => {
  const filterOptions = [
    {
      key: 'department',
      label: 'Department',
      icon: 'Building2',
      options: ['All', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering']
    },
    {
      key: 'projectType',
      label: 'Project Type',
      icon: 'FolderOpen',
      options: ['All', 'Research', 'Development', 'Internship', 'Collaboration']
    },
    {
      key: 'capacity',
      label: 'Capacity',
      icon: 'Users',
      options: ['All', 'Open', 'Limited', 'Full']
    },
    {
      key: 'skills',
      label: 'Skills',
      icon: 'Code',
      options: ['All', 'React', 'Python', 'Machine Learning', 'Data Science', 'Mobile Development']
    }
  ];

  const handleFilterClick = (filterKey, option) => {
    onFilterChange(filterKey, option);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAdvancedFilters}
          iconName="SlidersHorizontal"
          iconPosition="left"
          iconSize={16}
        >
          Advanced
        </Button>
      </div>

      <div className="space-y-4">
        {filterOptions.map((filter) => (
          <div key={filter.key} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={filter.icon} size={16} className="text-muted-foreground" />
              <span className="font-body font-medium text-sm text-foreground">{filter.label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filter.options.map((option) => (
                <Button
                  key={option}
                  variant={activeFilters[filter.key] === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterClick(filter.key, option)}
                  className="text-xs"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;