import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterBar = ({ 
  activeTab, 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  filterBy, 
  onFilterChange,
  onClearFilters 
}) => {
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'progress', label: 'Progress' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'team-size', label: 'Team Size' }
  ];

  const getFilterOptions = () => {
    switch (activeTab) {
      case 'active':
        return [
          { value: 'all', label: 'All Projects' },
          { value: 'high-priority', label: 'High Priority' },
          { value: 'due-soon', label: 'Due Soon' },
          { value: 'needs-attention', label: 'Needs Attention' },
          { value: 'computer-science', label: 'Computer Science' },
          { value: 'engineering', label: 'Engineering' },
          { value: 'research', label: 'Research' }
        ];
      case 'applications':
        return [
          { value: 'all', label: 'All Applications' },
          { value: 'pending', label: 'Pending' },
          { value: 'under-review', label: 'Under Review' },
          { value: 'accepted', label: 'Accepted' },
          { value: 'rejected', label: 'Rejected' }
        ];
      case 'past':
        return [
          { value: 'all', label: 'All Projects' },
          { value: 'completed', label: 'Completed' },
          { value: 'abandoned', label: 'Abandoned' },
          { value: 'high-rated', label: 'High Rated (4+ stars)' },
          { value: 'this-year', label: 'This Year' },
          { value: 'last-year', label: 'Last Year' }
        ];
      default:
        return [{ value: 'all', label: 'All' }];
    }
  };

  const hasActiveFilters = searchQuery || sortBy !== 'recent' || filterBy !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder={`Search ${activeTab} projects...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="lg:w-48">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
          />
        </div>

        {/* Filter By */}
        <div className="lg:w-48">
          <Select
            options={getFilterOptions()}
            value={filterBy}
            onChange={onFilterChange}
            placeholder="Filter by"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="lg:w-auto"
          >
            <Icon name="X" size={14} className="mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground font-caption">Active filters:</span>
            {searchQuery && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption border border-primary/20">
                Search: "{searchQuery}"
              </span>
            )}
            {sortBy !== 'recent' && (
              <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-caption border border-secondary/20">
                Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
              </span>
            )}
            {filterBy !== 'all' && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-caption border border-accent/20">
                Filter: {getFilterOptions().find(opt => opt.value === filterBy)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;