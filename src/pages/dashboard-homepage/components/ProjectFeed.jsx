import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import Icon from '../../../components/AppIcon';

const ProjectFeed = ({ projects, loading, onLoadMore, hasMore, onJoinRequest, onBookmark }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000
      && hasMore && !loading
    ) {
      onLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  if (projects.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">No Projects Found</h3>
        <p className="font-body text-muted-foreground mb-4">
          Try adjusting your filters or check back later for new opportunities.
        </p>
        <button
          onClick={handleRefresh}
          className="text-primary hover:underline font-medium"
        >
          Refresh Feed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="flex items-center justify-center py-4">
          <Icon name="RotateCw" size={20} className="text-primary animate-spin mr-2" />
          <span className="font-body text-sm text-primary">Refreshing...</span>
        </div>
      )}

      {/* Project Cards */}
      <div className="space-y-6 lg:grid lg:grid-cols-1 lg:gap-6 lg:space-y-0">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onJoinRequest={onJoinRequest}
            onBookmark={onBookmark}
          />
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
              <div className="flex space-x-2 mb-4">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-14"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center py-6">
          <button
            onClick={onLoadMore}
            className="text-primary hover:underline font-medium"
          >
            Load More Projects
          </button>
        </div>
      )}

      {/* End of Feed */}
      {!hasMore && projects.length > 0 && (
        <div className="text-center py-6 border-t border-border">
          <p className="font-body text-sm text-muted-foreground">
            You've reached the end of the feed
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectFeed;