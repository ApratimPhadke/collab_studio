import React from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ projects, isVisible }) => {
  if (!isVisible) return null;

  // Mock campus coordinates
  const campusLat = 40.7589;
  const campusLng = -73.9851;

  return (
    <div className="w-full h-96 bg-muted rounded-lg overflow-hidden border border-border">
      <div className="relative w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Campus Project Locations"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${campusLat},${campusLng}&z=16&output=embed`}
          className="w-full h-full"
        />
        
        {/* Map Overlay with Project Markers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Sample project markers */}
            <div className="absolute top-1/4 left-1/3 pointer-events-auto">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
                <Icon name="MapPin" size={16} />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 pointer-events-auto">
              <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
                <Icon name="MapPin" size={16} />
              </div>
            </div>
            <div className="absolute top-3/4 left-2/3 pointer-events-auto">
              <div className="bg-success text-success-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
                <Icon name="MapPin" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg shadow-sm p-2 space-y-2">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors duration-150">
            <Icon name="Plus" size={16} className="text-foreground" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded transition-colors duration-150">
            <Icon name="Minus" size={16} className="text-foreground" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-sm p-3">
          <h4 className="font-body font-medium text-sm text-foreground mb-2">Project Types</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="font-caption text-xs text-muted-foreground">Research</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="font-caption text-xs text-muted-foreground">Development</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="font-caption text-xs text-muted-foreground">Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;