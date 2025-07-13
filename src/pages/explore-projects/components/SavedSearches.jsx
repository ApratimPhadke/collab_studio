import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SavedSearches = ({ onLoadSearch }) => {
  const [savedSearches] = useState([
    {
      id: 1,
      name: "React Development Projects",
      query: "React",
      filters: { department: "Computer Science", projectType: "Development" },
      createdAt: "2025-01-10",
      notificationsEnabled: true
    },
    {
      id: 2,
      name: "ML Research Opportunities",
      query: "Machine Learning",
      filters: { department: "Computer Science", projectType: "Research", professorInvolved: true },
      createdAt: "2025-01-08",
      notificationsEnabled: false
    },
    {
      id: 3,
      name: "Engineering Collaborations",
      query: "",
      filters: { projectType: "Collaboration", capacity: "Open" },
      createdAt: "2025-01-05",
      notificationsEnabled: true
    }
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  const handleLoadSearch = (search) => {
    onLoadSearch(search);
  };

  const handleSaveCurrentSearch = () => {
    if (newSearchName.trim()) {
      console.log('Saving search:', newSearchName);
      setNewSearchName('');
      setShowSaveDialog(false);
    }
  };

  const toggleNotifications = (searchId) => {
    console.log('Toggling notifications for search:', searchId);
  };

  const deleteSearch = (searchId) => {
    console.log('Deleting search:', searchId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Saved Searches</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Save Current
        </Button>
      </div>

      <div className="space-y-3">
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-body font-medium text-sm text-foreground mb-1">
                  {search.name}
                </h4>
                <p className="font-caption text-xs text-muted-foreground">
                  Created on {new Date(search.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleNotifications(search.id)}
                  className="w-8 h-8"
                >
                  <Icon
                    name={search.notificationsEnabled ? "Bell" : "BellOff"}
                    size={14}
                    className={search.notificationsEnabled ? "text-primary" : "text-muted-foreground"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSearch(search.id)}
                  className="w-8 h-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>

            {search.query && (
              <div className="mb-2">
                <span className="font-caption text-xs text-muted-foreground">Query: </span>
                <span className="font-caption text-xs text-foreground">{search.query}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(search.filters).map(([key, value]) => (
                value && value !== 'all' && (
                  <span
                    key={key}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption"
                  >
                    {key}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </span>
                )
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLoadSearch(search)}
              iconName="Search"
              iconPosition="left"
              iconSize={14}
              className="w-full"
            >
              Load Search
            </Button>
          </div>
        ))}
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Save Current Search
              </h3>
              <Input
                label="Search Name"
                placeholder="Enter a name for this search..."
                value={newSearchName}
                onChange={(e) => setNewSearchName(e.target.value)}
                className="mb-4"
              />
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCurrentSearch}
                  disabled={!newSearchName.trim()}
                  className="flex-1"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;