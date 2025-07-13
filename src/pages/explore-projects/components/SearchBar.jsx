import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions] = useState([
    { type: 'skill', label: 'React Development', icon: 'Code' },
    { type: 'skill', label: 'Machine Learning', icon: 'Brain' },
    { type: 'skill', label: 'Data Science', icon: 'BarChart3' },
    { type: 'department', label: 'Computer Science', icon: 'Monitor' },
    { type: 'department', label: 'Electrical Engineering', icon: 'Zap' },
    { type: 'department', label: 'Mechanical Engineering', icon: 'Settings' },
    { type: 'project', label: 'Web Development', icon: 'Globe' },
    { type: 'project', label: 'Mobile App', icon: 'Smartphone' },
    { type: 'project', label: 'Research Project', icon: 'Search' }
  ]);
  
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.label);
    setShowSuggestions(false);
    onSearch(suggestion.label);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search projects, skills, departments..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(searchQuery.length > 0)}
          className="w-full pl-12 pr-4 py-3 text-base"
        />
        <Icon
          name="Search"
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors duration-150 border-b border-border last:border-b-0"
            >
              <Icon name={suggestion.icon} size={16} className="mr-3 text-muted-foreground" />
              <div>
                <span className="font-body text-sm text-foreground">{suggestion.label}</span>
                <span className="ml-2 font-caption text-xs text-muted-foreground capitalize">
                  {suggestion.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;