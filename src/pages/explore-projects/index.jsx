import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import AdvancedFilters from './components/AdvancedFilters';
import ProjectCard from './components/ProjectCard';
import SortDropdown from './components/SortDropdown';
import MapView from './components/MapView';
import SavedSearches from './components/SavedSearches';

const ExploreProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    department: 'All',
    projectType: 'All',
    capacity: 'All',
    skills: 'All'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Mock projects data
  const [projects] = useState([
    {
      id: 1,
      title: "AI-Powered Student Learning Analytics Platform",
      description: `Developing a comprehensive machine learning platform that analyzes student learning patterns and provides personalized recommendations for academic improvement.\n\nThis project involves building predictive models to identify at-risk students and suggest intervention strategies.`,
      department: "Computer Science",
      type: "Research",
      status: "Open",
      leader: {
        name: "Dr. Sarah Chen",
        role: "Associate Professor",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        isProfessor: true
      },
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow", "React"],
      currentMembers: 3,
      maxMembers: 6,
      duration: "6 months",
      location: "CS Building, Room 301",
      postedTime: "2 days ago",
      deadline: "2025-01-20",
      matchScore: 92
    },
    {
      id: 2,
      title: "Sustainable Energy Management IoT System",
      description: `Creating an Internet of Things (IoT) solution for monitoring and optimizing energy consumption in campus buildings.\n\nThe system will use sensor networks and real-time data analytics to reduce energy waste and promote sustainability.`,
      department: "Electrical Engineering",
      type: "Development",
      status: "Limited",
      leader: {
        name: "Michael Rodriguez",
        role: "Senior Student",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        isProfessor: false
      },
      skills: ["IoT", "Arduino", "Python", "Data Analytics", "Embedded Systems"],
      currentMembers: 4,
      maxMembers: 5,
      duration: "4 months",
      location: "EE Lab, Building B",
      postedTime: "1 week ago",
      deadline: "2025-01-25",
      matchScore: 78
    },
    {
      id: 3,
      title: "Blockchain-Based Academic Credential Verification",
      description: `Developing a decentralized system for verifying academic credentials using blockchain technology.\n\nThis project aims to create a tamper-proof, globally accessible platform for educational institutions to issue and verify certificates.`,
      department: "Computer Science",
      type: "Collaboration",
      status: "Open",
      leader: {
        name: "Prof. James Wilson",
        role: "Professor",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        isProfessor: true
      },
      skills: ["Blockchain", "Solidity", "Web3", "React", "Node.js"],
      currentMembers: 2,
      maxMembers: 8,
      duration: "8 months",
      location: "Innovation Hub",
      postedTime: "3 days ago",
      deadline: "2025-02-01",
      matchScore: 85
    },
    {
      id: 4,
      title: "Autonomous Drone Navigation System",
      description: `Building an advanced navigation system for autonomous drones using computer vision and machine learning algorithms.\n\nThe project focuses on obstacle avoidance, path planning, and real-time decision making in complex environments.`,
      department: "Mechanical Engineering",
      type: "Research",
      status: "Open",
      leader: {
        name: "Dr. Emily Zhang",
        role: "Assistant Professor",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        isProfessor: true
      },
      skills: ["Computer Vision", "Machine Learning", "Python", "ROS", "C++"],
      currentMembers: 1,
      maxMembers: 4,
      duration: "10 months",
      location: "Robotics Lab",
      postedTime: "5 days ago",
      deadline: "2025-01-30",
      matchScore: 73
    },
    {
      id: 5,
      title: "Mobile Health Monitoring Application",
      description: `Creating a comprehensive mobile application for personal health monitoring and telemedicine consultations.\n\nThe app will integrate with wearable devices and provide AI-powered health insights and recommendations.`,
      department: "Computer Science",
      type: "Development",
      status: "Limited",
      leader: {
        name: "Lisa Thompson",
        role: "Graduate Student",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        isProfessor: false
      },
      skills: ["React Native", "Node.js", "MongoDB", "AI/ML", "Healthcare APIs"],
      currentMembers: 5,
      maxMembers: 6,
      duration: "5 months",
      location: "Mobile Dev Lab",
      postedTime: "1 day ago",
      deadline: "2025-01-22",
      matchScore: 88
    },
    {
      id: 6,
      title: "Smart City Traffic Optimization",
      description: `Developing an intelligent traffic management system using real-time data analysis and predictive modeling.\n\nThe project aims to reduce traffic congestion and improve urban mobility through smart signal control and route optimization.`,
      department: "Civil Engineering",
      type: "Internship",
      status: "Open",
      leader: {
        name: "Prof. David Kumar",
        role: "Professor",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        isProfessor: true
      },
      skills: ["Data Science", "Python", "GIS", "Traffic Engineering", "Machine Learning"],
      currentMembers: 2,
      maxMembers: 7,
      duration: "6 months",
      location: "Transportation Lab",
      postedTime: "4 days ago",
      deadline: "2025-02-05",
      matchScore: 67
    }
  ]);

  useEffect(() => {
    filterProjects();
  }, [searchQuery, activeFilters, sortBy]);

  const filterProjects = () => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply active filters
    if (activeFilters.department !== 'All') {
      filtered = filtered.filter(project => project.department === activeFilters.department);
    }
    if (activeFilters.projectType !== 'All') {
      filtered = filtered.filter(project => project.type === activeFilters.projectType);
    }
    if (activeFilters.capacity !== 'All') {
      filtered = filtered.filter(project => project.status === activeFilters.capacity);
    }
    if (activeFilters.skills !== 'All') {
      filtered = filtered.filter(project =>
        project.skills.some(skill => skill.toLowerCase().includes(activeFilters.skills.toLowerCase()))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
        break;
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'match':
        filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => b.currentMembers - a.currentMembers);
        break;
      default: // relevance
        break;
    }

    setFilteredProjects(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleAdvancedFiltersApply = (filters) => {
    console.log('Advanced filters applied:', filters);
    // Apply advanced filters logic here
  };

  const handleLoadSavedSearch = (search) => {
    setSearchQuery(search.query || '');
    setActiveFilters(search.filters);
    setShowSavedSearches(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Explore Projects
            </h1>
            <p className="font-body text-muted-foreground">
              Discover exciting collaboration opportunities across departments
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <FilterChips
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onAdvancedFilters={() => setShowAdvancedFilters(true)}
                />
                <SavedSearches onLoadSearch={handleLoadSavedSearch} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6 flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSavedSearches(!showSavedSearches)}
                  iconName="Bookmark"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1"
                >
                  Saved
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(true)}
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                  iconSize={16}
                  className="flex-1"
                >
                  Filters
                </Button>
              </div>

              {/* Mobile Saved Searches */}
              {showSavedSearches && (
                <div className="lg:hidden mb-6 p-4 bg-card border border-border rounded-lg">
                  <SavedSearches onLoadSearch={handleLoadSavedSearch} />
                </div>
              )}

              {/* View Controls */}
              <div className="flex items-center justify-between mb-6">
                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultCount={filteredProjects.length}
                />
                <div className="flex space-x-2">
                  <Button
                    variant={showMapView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowMapView(!showMapView)}
                    iconName="Map"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Map
                  </Button>
                </div>
              </div>

              {/* Map View */}
              <MapView projects={filteredProjects} isVisible={showMapView} />

              {/* Projects Grid */}
              {!showMapView && (
                <div className="space-y-6">
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        No projects found
                      </h3>
                      <p className="font-body text-muted-foreground mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilters({
                            department: 'All',
                            projectType: 'All',
                            capacity: 'All',
                            skills: 'All'
                          });
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApply={handleAdvancedFiltersApply}
        filters={activeFilters}
      />
    </div>
  );
};

export default ExploreProjects;