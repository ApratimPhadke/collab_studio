import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = ({ analytics }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [isExpanded, setIsExpanded] = useState(false);

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const profileViewsData = [
    { date: '2025-01-06', views: 12, searches: 8 },
    { date: '2025-01-07', views: 15, searches: 11 },
    { date: '2025-01-08', views: 8, searches: 5 },
    { date: '2025-01-09', views: 22, searches: 16 },
    { date: '2025-01-10', views: 18, searches: 12 },
    { date: '2025-01-11', views: 25, searches: 19 },
    { date: '2025-01-12', views: 20, searches: 14 },
    { date: '2025-01-13', views: 28, searches: 21 }
  ];

  const skillEndorsementsData = [
    { skill: 'React', endorsements: 24 },
    { skill: 'JavaScript', endorsements: 22 },
    { skill: 'Python', endorsements: 18 },
    { skill: 'Node.js', endorsements: 15 },
    { skill: 'MongoDB', endorsements: 12 },
    { skill: 'Git', endorsements: 20 }
  ];

  const visitorSourcesData = [
    { name: 'Search Results', value: 45, color: '#1E3A8A' },
    { name: 'Project Pages', value: 30, color: '#10B981' },
    { name: 'Direct Links', value: 15, color: '#F59E0B' },
    { name: 'Recommendations', value: 10, color: '#EF4444' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Profile Analytics</h2>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  timeRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Eye" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Profile Views</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground">
            {analytics.totalViews}
          </div>
          <div className="text-xs text-success flex items-center gap-1 mt-1">
            <Icon name="TrendingUp" size={12} />
            +12% from last month
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Search" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Search Appearances</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground">
            {analytics.searchAppearances}
          </div>
          <div className="text-xs text-success flex items-center gap-1 mt-1">
            <Icon name="TrendingUp" size={12} />
            +8% from last month
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ThumbsUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Skill Endorsements</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground">
            {analytics.totalEndorsements}
          </div>
          <div className="text-xs text-success flex items-center gap-1 mt-1">
            <Icon name="TrendingUp" size={12} />
            +5 this week
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Project Invites</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground">
            {analytics.projectInvites}
          </div>
          <div className="text-xs text-warning flex items-center gap-1 mt-1">
            <Icon name="Minus" size={12} />
            -2% from last month
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Profile Views Chart */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-4">Profile Views & Search Appearances</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profileViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                    labelFormatter={(value) => formatDate(value)}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stackId="1"
                    stroke="var(--color-primary)" 
                    fill="var(--color-primary)"
                    fillOpacity={0.3}
                    name="Profile Views"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="searches" 
                    stackId="1"
                    stroke="var(--color-success)" 
                    fill="var(--color-success)"
                    fillOpacity={0.3}
                    name="Search Appearances"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skill Endorsements */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Top Endorsed Skills</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillEndorsementsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis 
                      type="category" 
                      dataKey="skill" 
                      stroke="var(--color-muted-foreground)" 
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="endorsements" 
                      fill="var(--color-primary)"
                      radius={[0, 4, 4, 0]}
                      name="Endorsements"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visitor Sources */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Profile Visitor Sources</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitorSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {visitorSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {visitorSourcesData.map((source, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    ></div>
                    <span className="text-xs text-muted-foreground">{source.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-4">Recent Profile Activity</h3>
            <div className="space-y-3">
              {[
                { type: 'view', user: 'Sarah Chen', department: 'Computer Science', time: '2 hours ago' },
                { type: 'endorsement', user: 'Mike Johnson', skill: 'React', time: '5 hours ago' },
                { type: 'invite', user: 'Prof. Williams', project: 'AI Research Project', time: '1 day ago' },
                { type: 'view', user: 'Alex Rodriguez', department: 'Data Science', time: '2 days ago' },
                { type: 'endorsement', user: 'Emma Davis', skill: 'Python', time: '3 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-md">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'endorsement'? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <Icon 
                      name={
                        activity.type === 'view' ? 'Eye' :
                        activity.type === 'endorsement'? 'ThumbsUp' : 'UserPlus'
                      } 
                      size={16} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>
                      {activity.type === 'view' && ` viewed your profile`}
                      {activity.type === 'endorsement' && ` endorsed your ${activity.skill} skill`}
                      {activity.type === 'invite' && ` invited you to ${activity.project}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.department && `${activity.department} • `}{activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;