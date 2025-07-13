import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      change: stats.activeProjectsChange,
      changeType: stats.activeProjectsChange > 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      change: stats.pendingApplicationsChange,
      changeType: stats.pendingApplicationsChange > 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Completed Projects',
      value: stats.completedProjects,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      change: stats.completedProjectsChange,
      changeType: stats.completedProjectsChange > 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Average Rating',
      value: `${stats.averageRating}/5`,
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      change: stats.averageRatingChange,
      changeType: stats.averageRatingChange > 0 ? 'increase' : 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className={`bg-card border ${stat.borderColor} rounded-lg p-6 hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
            {stat.change !== 0 && (
              <div className={`flex items-center gap-1 text-xs font-caption ${
                stat.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                {Math.abs(stat.change)}%
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;