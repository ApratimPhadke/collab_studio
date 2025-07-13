import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, resultCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'deadline', label: 'Deadline Soon', icon: 'Calendar' },
    { value: 'match', label: 'Best Match', icon: 'Star' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <span className="font-body text-sm text-muted-foreground">
          {resultCount} projects found
        </span>
      </div>

      <div ref={dropdownRef} className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName="ChevronDown"
          iconPosition="right"
          iconSize={16}
          className="min-w-[140px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name={currentSort?.icon || 'Target'} size={16} />
            <span>{currentSort?.label || 'Sort by'}</span>
          </div>
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 animate-fade-in">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center px-4 py-2 text-left hover:bg-muted transition-colors duration-150 ${
                    sortBy === option.value ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={option.icon} size={16} className="mr-3" />
                  <span className="font-body text-sm">{option.label}</span>
                  {sortBy === option.value && (
                    <Icon name="Check" size={16} className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;