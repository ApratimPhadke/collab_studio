import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ApplicationCard from './components/ApplicationCard';
import PastProjectCard from './components/PastProjectCard';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';
import QuickActions from './components/QuickActions';
import EmptyState from './components/EmptyState';

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const mockStats = {
    activeProjects: 3,
    pendingApplications: 2,
    completedProjects: 8,
    averageRating: 4.2,
    activeProjectsChange: 1,
    pendingApplicationsChange: -1,
    completedProjectsChange: 2,
    averageRatingChange: 0.3
  };

  const mockActiveProjects = [
    {
      id: 1,
      title: "AI-Powered Student Assistant",
      description: "Developing an intelligent chatbot to help students with academic queries and course recommendations.",
      status: "active",
      progress: 75,
      deadline: "Dec 15, 2025",
      capacity: 6,
      members: [
        { id: 1, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/1.jpg", isOnline: true },
        { id: 2, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/2.jpg", isOnline: false },
        { id: 3, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/3.jpg", isOnline: true },
        { id: 4, name: "Alex Rodriguez", avatar: "https://randomuser.me/api/portraits/men/4.jpg", isOnline: true }
      ],
      recentActivity: [
        { icon: "GitCommit", message: "Sarah pushed new changes to main branch", time: "2h ago" },
        { icon: "MessageCircle", message: "New message in team chat", time: "4h ago" }
      ],
      repository: {
        commits: 127,
        hasUpdates: true
      }
    },
    {
      id: 2,
      title: "Campus Navigation App",
      description: "Mobile application for indoor navigation within university buildings using AR technology.",
      status: "active",
      progress: 45,
      deadline: "Jan 20, 2026",
      capacity: 5,
      members: [
        { id: 5, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/5.jpg", isOnline: false },
        { id: 6, name: "Lisa Wang", avatar: "https://randomuser.me/api/portraits/women/6.jpg", isOnline: true },
        { id: 7, name: "Tom Wilson", avatar: "https://randomuser.me/api/portraits/men/7.jpg", isOnline: true }
      ],
      recentActivity: [
        { icon: "Upload", message: "New AR models uploaded", time: "1d ago" },
        { icon: "Users", message: "Team meeting scheduled for tomorrow", time: "2d ago" }
      ],
      repository: {
        commits: 89,
        hasUpdates: false
      }
    },
    {
      id: 3,
      title: "Sustainable Energy Research",
      description: "Research project analyzing renewable energy adoption patterns in urban environments.",
      status: "on-hold",
      progress: 30,
      deadline: "Mar 10, 2026",
      capacity: 4,
      members: [
        { id: 8, name: "Prof. Anderson", avatar: "https://randomuser.me/api/portraits/men/8.jpg", isOnline: false },
        { id: 9, name: "Rachel Green", avatar: "https://randomuser.me/api/portraits/women/9.jpg", isOnline: true }
      ],
      recentActivity: [
        { icon: "FileText", message: "Research proposal updated", time: "1w ago" },
        { icon: "Calendar", message: "Meeting rescheduled", time: "1w ago" }
      ],
      repository: {
        commits: 45,
        hasUpdates: false
      }
    }
  ];

  const mockApplications = [
    {
      id: 1,
      projectTitle: "Machine Learning for Healthcare",
      projectDescription: "Developing ML models to predict patient outcomes and optimize treatment plans.",
      groupLeader: "Dr. Sarah Mitchell",
      department: "Computer Science",
      status: "under-review",
      appliedDate: "Nov 28, 2025",
      responseTime: "2-3 days",
      skillsMatch: [
        { name: "Python", matched: true },
        { name: "Machine Learning", matched: true },
        { name: "Healthcare", matched: false },
        { name: "Data Analysis", matched: true }
      ],
      message: "Your profile shows strong technical skills. We\'re particularly interested in your machine learning experience.",
      teamMembers: [
        { id: 1, name: "Dr. Sarah Mitchell", avatar: "https://randomuser.me/api/portraits/women/10.jpg", isLeader: true },
        { id: 2, name: "John Smith", avatar: "https://randomuser.me/api/portraits/men/11.jpg", isLeader: false },
        { id: 3, name: "Maria Garcia", avatar: "https://randomuser.me/api/portraits/women/12.jpg", isLeader: false }
      ]
    },
    {
      id: 2,
      projectTitle: "Blockchain Voting System",
      projectDescription: "Creating a secure and transparent voting system using blockchain technology.",
      groupLeader: "Prof. James Wilson",
      department: "Information Technology",
      status: "accepted",
      appliedDate: "Nov 25, 2025",
      responseTime: "Accepted",
      skillsMatch: [
        { name: "Blockchain", matched: false },
        { name: "JavaScript", matched: true },
        { name: "Security", matched: true },
        { name: "Web Development", matched: true }
      ],
      message: "Welcome to the team! Please join our Discord server for the next team meeting.",
      teamMembers: [
        { id: 4, name: "Prof. James Wilson", avatar: "https://randomuser.me/api/portraits/men/13.jpg", isLeader: true },
        { id: 5, name: "Anna Lee", avatar: "https://randomuser.me/api/portraits/women/14.jpg", isLeader: false },
        { id: 6, name: "Carlos Rodriguez", avatar: "https://randomuser.me/api/portraits/men/15.jpg", isLeader: false },
        { id: 7, name: "Sophie Turner", avatar: "https://randomuser.me/api/portraits/women/16.jpg", isLeader: false }
      ]
    }
  ];

  const mockPastProjects = [
    {
      id: 1,
      title: "E-Learning Platform",
      description: "Comprehensive online learning management system with interactive features and progress tracking.",
      completionStatus: "completed",
      startDate: "Jan 15, 2025",
      endDate: "May 20, 2025",
      duration: "4 months",
      teamSize: 5,
      totalCommits: 234,
      ratings: {
        yourRating: 4,
        teamAverage: 4.2
      },
      skillsGained: ["React", "Node.js", "Database Design", "UI/UX", "Project Management"],
      teamMembers: [
        { id: 1, name: "Jessica Brown", avatar: "https://randomuser.me/api/portraits/women/17.jpg", isLeader: true },
        { id: 2, name: "Michael Chen", avatar: "https://randomuser.me/api/portraits/men/18.jpg", isLeader: false },
        { id: 3, name: "Amanda White", avatar: "https://randomuser.me/api/portraits/women/19.jpg", isLeader: false },
        { id: 4, name: "Robert Taylor", avatar: "https://randomuser.me/api/portraits/men/20.jpg", isLeader: false }
      ],
      repository: {
        size: "2.3 MB",
        language: "JavaScript"
      },
      hasCertificate: true
    },
    {
      id: 2,
      title: "IoT Smart Garden",
      description: "Automated garden monitoring system using IoT sensors and mobile app control.",
      completionStatus: "completed",
      startDate: "Sep 10, 2024",
      endDate: "Dec 18, 2024",
      duration: "3 months",
      teamSize: 4,
      totalCommits: 156,
      ratings: {
        yourRating: 5,
        teamAverage: 4.5
      },
      skillsGained: ["IoT", "Arduino", "Mobile Development", "Sensors", "Data Visualization"],
      teamMembers: [
        { id: 5, name: "Kevin Park", avatar: "https://randomuser.me/api/portraits/men/21.jpg", isLeader: false },
        { id: 6, name: "Linda Johnson", avatar: "https://randomuser.me/api/portraits/women/22.jpg", isLeader: true },
        { id: 7, name: "Mark Davis", avatar: "https://randomuser.me/api/portraits/men/23.jpg", isLeader: false }
      ],
      repository: {
        size: "1.8 MB",
        language: "C++"
      },
      hasCertificate: true
    }
  ];

  const tabs = [
    { id: 'active', label: 'Active Projects', icon: 'FolderOpen', count: mockActiveProjects.length },
    { id: 'applications', label: 'Applications', icon: 'Clock', count: mockApplications.length },
    { id: 'past', label: 'Past Projects', icon: 'Archive', count: mockPastProjects.length }
  ];

  // Filter and sort functions
  const filterAndSortData = (data, type) => {
    let filtered = [...data];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => {
        const searchFields = type === 'applications' 
          ? [item.projectTitle, item.projectDescription, item.groupLeader, item.department]
          : [item.title, item.description];
        
        return searchFields.some(field => 
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => {
        switch (type) {
          case 'active':
            if (filterBy === 'high-priority') return item.progress < 50;
            if (filterBy === 'due-soon') return new Date(item.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            if (filterBy === 'needs-attention') return item.repository.hasUpdates;
            return item.status === filterBy || item.title.toLowerCase().includes(filterBy.replace('-', ' '));
          case 'applications':
            return item.status === filterBy;
          case 'past':
            if (filterBy === 'high-rated') return item.ratings.yourRating >= 4;
            if (filterBy === 'this-year') return new Date(item.endDate).getFullYear() === 2025;
            if (filterBy === 'last-year') return new Date(item.endDate).getFullYear() === 2024;
            return item.completionStatus === filterBy;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          const titleA = type === 'applications' ? a.projectTitle : a.title;
          const titleB = type === 'applications' ? b.projectTitle : b.title;
          return titleA.localeCompare(titleB);
        case 'deadline':
          if (type === 'active') {
            return new Date(a.deadline) - new Date(b.deadline);
          }
          return 0;
        case 'progress':
          if (type === 'active') {
            return b.progress - a.progress;
          }
          return 0;
        case 'team-size':
          if (type === 'active') {
            return b.members.length - a.members.length;
          }
          if (type === 'past') {
            return b.teamSize - a.teamSize;
          }
          return 0;
        default: // recent
          return b.id - a.id;
      }
    });

    return filtered;
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'active':
        return filterAndSortData(mockActiveProjects, 'active');
      case 'applications':
        return filterAndSortData(mockApplications, 'applications');
      case 'past':
        return filterAndSortData(mockPastProjects, 'past');
      default:
        return [];
    }
  };

  // Event handlers
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchQuery('');
    setSortBy('recent');
    setFilterBy('all');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSortBy('recent');
    setFilterBy('all');
  };

  const handleLeaveProject = (projectId) => {
    console.log('Leave project:', projectId);
    // Implementation for leaving project
  };

  const handleInviteMembers = (projectId) => {
    console.log('Invite members to project:', projectId);
    // Implementation for inviting members
  };

  const handleOpenChat = (projectId) => {
    console.log('Open chat for project:', projectId);
    // Implementation for opening chat
  };

  const handleWithdrawApplication = (applicationId) => {
    console.log('Withdraw application:', applicationId);
    // Implementation for withdrawing application
  };

  const handleDownloadCertificate = (projectId) => {
    console.log('Download certificate for project:', projectId);
    // Implementation for downloading certificate
  };

  const handleViewDetails = (projectId) => {
    console.log('View details for project:', projectId);
    // Implementation for viewing project details
  };

  const currentData = getCurrentData();

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery, sortBy, filterBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                My Projects
              </h1>
              <p className="text-muted-foreground font-body">
                Manage your active collaborations, track applications, and view completed projects
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button variant="default" iconName="Plus" iconPosition="left">
                Create Project
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsOverview stats={mockStats} />

          {/* Quick Actions */}
          <QuickActions 
            onCreateProject={() => console.log('Create project')}
            onExploreProjects={() => console.log('Explore projects')}
            onViewProfile={() => console.log('View profile')}
          />

          {/* Tabs */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-body font-medium text-sm border-b-2 transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            activeTab={activeTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            onClearFilters={handleClearFilters}
          />

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-muted-foreground font-body">Loading projects...</span>
              </div>
            </div>
          ) : currentData.length === 0 ? (
            <EmptyState type={activeTab} onAction={handleClearFilters} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTab === 'active' && currentData.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onLeaveProject={handleLeaveProject}
                  onInviteMembers={handleInviteMembers}
                  onOpenChat={handleOpenChat}
                />
              ))}
              
              {activeTab === 'applications' && currentData.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onWithdraw={handleWithdrawApplication}
                />
              ))}
              
              {activeTab === 'past' && currentData.map((project) => (
                <PastProjectCard
                  key={project.id}
                  project={project}
                  onDownloadCertificate={handleDownloadCertificate}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}

          {/* Results Summary */}
          {!isLoading && currentData.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground font-caption">
                Showing {currentData.length} of {
                  activeTab === 'active' ? mockActiveProjects.length :
                  activeTab === 'applications' ? mockApplications.length :
                  mockPastProjects.length
                } {activeTab} {activeTab === 'active' ? 'projects' : activeTab === 'applications' ? 'applications' : 'projects'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyProjects;