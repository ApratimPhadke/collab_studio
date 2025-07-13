import React from 'react';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, activeFilters, onFilterChange, onClearAll }) => {
  const handleFilterToggle = (filterId) => {
    const isActive = activeFilters.includes(filterId);
    if (isActive) {
      onFilterChange(activeFilters.filter(id => id !== filterId));
    } else {
      onFilterChange([...activeFilters, filterId]);
    }
  };

  return (
    <div className="flex items-center space-x-3 mb-6 overflow-x-auto pb-2">
      <div className="flex items-center space-x-2 flex-shrink-0">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilters.includes(filter.id) ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterToggle(filter.id)}
            className="whitespace-nowrap"
          >
            {filter.label}
            {filter.count && (
              <span className="ml-1 opacity-75">({filter.count})</span>
            )}
          </Button>
        ))}
      </div>
      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground flex-shrink-0"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterChips;