import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import FilterChips from './components/FilterChips';
import RecommendationPanel from './components/RecommendationPanel';
import ProjectFeed from './components/ProjectFeed';
import FloatingActionButton from './components/FloatingActionButton';

const DashboardHomepage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for projects
  const mockProjects = [
    {
      id: 1,
      title: "AI-Powered Student Performance Analytics",
      description: `Developing a comprehensive machine learning system to analyze student performance patterns and provide personalized learning recommendations. This project involves building predictive models using Python, implementing data visualization dashboards, and creating an intuitive user interface for educators.\n\nThe system will process academic data, attendance records, and engagement metrics to identify at-risk students early and suggest intervention strategies.`,
      leader: {
        name: "Dr. Sarah Chen",
        department: "Computer Science",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      isProfessorLed: true,
      capacity: 6,
      currentMembers: 3,
      vacancies: 3,
      skillsRequired: ["Python", "Machine Learning", "React", "Data Analysis", "SQL", "TensorFlow"],
      objectives: [
        "Build predictive models for student performance",
        "Create interactive dashboards for educators",
        "Implement real-time analytics pipeline"
      ],
      timeAgo: "2 hours ago",
      isBookmarked: false
    },
    {
      id: 2,
      title: "Sustainable Campus Energy Management System",
      description: `Creating an IoT-based energy monitoring and optimization system for our campus buildings. The project focuses on reducing energy consumption through smart sensors, automated controls, and data-driven insights.\n\nWe'll be working with Arduino, Raspberry Pi, and cloud platforms to build a comprehensive solution that can be scaled across multiple buildings.`,
      leader: {
        name: "Alex Rodriguez",
        department: "Environmental Engineering",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      isProfessorLed: false,
      capacity: 5,
      currentMembers: 2,
      vacancies: 3,
      skillsRequired: ["IoT", "Arduino", "Python", "Data Visualization", "Cloud Computing"],
      objectives: [
        "Deploy IoT sensors across campus buildings",
        "Develop energy optimization algorithms",
        "Create mobile app for facility managers"
      ],
      timeAgo: "4 hours ago",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Blockchain-Based Academic Credential Verification",
      description: `Developing a decentralized system for verifying academic credentials using blockchain technology. This project aims to create a tamper-proof, globally accessible platform for educational institutions to issue and verify certificates.\n\nThe system will eliminate fraud, reduce verification time, and provide students with complete ownership of their academic records.`,
      leader: {
        name: "Prof. Michael Thompson",
        department: "Information Systems",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      isProfessorLed: true,
      capacity: 4,
      currentMembers: 4,
      vacancies: 0,
      skillsRequired: ["Blockchain", "Solidity", "Web3", "React", "Node.js"],
      objectives: [
        "Design blockchain architecture for credentials",
        "Implement smart contracts for verification",
        "Build user-friendly web interface"
      ],
      timeAgo: "6 hours ago",
      isBookmarked: false
    },
    {
      id: 4,
      title: "Mental Health Support Chatbot for Students",
      description: `Building an AI-powered chatbot to provide 24/7 mental health support and resources for college students. The bot will use natural language processing to understand student concerns and provide appropriate guidance, resources, and crisis intervention when needed.`,
      leader: {
        name: "Emma Wilson",
        department: "Psychology",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      isProfessorLed: false,
      capacity: 6,
      currentMembers: 4,
      vacancies: 2,
      skillsRequired: ["NLP", "Python", "React", "Psychology", "API Development"],
      objectives: [
        "Train NLP models for mental health conversations",
        "Integrate with campus counseling services",
        "Ensure privacy and data security"
      ],
      timeAgo: "8 hours ago",
      isBookmarked: false
    },
    {
      id: 5,
      title: "Augmented Reality Campus Navigation App",
      description: `Creating an AR-powered mobile application to help students and visitors navigate the campus more effectively. The app will overlay digital information onto real-world views, showing building names, room numbers, and directions to various campus facilities.`,
      leader: {
        name: "Dr. James Park",
        department: "Computer Graphics",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      isProfessorLed: true,
      capacity: 5,
      currentMembers: 1,
      vacancies: 4,
      skillsRequired: ["Unity", "ARKit", "ARCore", "C#", "3D Modeling"],
      objectives: [
        "Develop AR navigation algorithms",
        "Create 3D campus models",
        "Implement real-time location tracking"
      ],
      timeAgo: "12 hours ago",
      isBookmarked: true
    },
    {
      id: 6,
      title: "Smart Library Book Recommendation System",
      description: `Developing an intelligent recommendation system for the campus library that suggests books and research papers based on student interests, course requirements, and reading history. The system will use collaborative filtering and content-based algorithms.`,
      leader: {
        name: "Lisa Chang",
        department: "Information Science",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      isProfessorLed: false,
      capacity: 4,
      currentMembers: 2,
      vacancies: 2,
      skillsRequired: ["Machine Learning", "Python", "Database Design", "Web Development"],
      objectives: [
        "Implement recommendation algorithms",
        "Integrate with library management system",
        "Create user-friendly interface"
      ],
      timeAgo: "1 day ago",
      isBookmarked: false
    }
  ];

  // Mock filter data
  const filterOptions = [
    { id: 'all', label: 'All Projects', count: mockProjects.length },
    { id: 'computer-science', label: 'Computer Science', count: 3 },
    { id: 'engineering', label: 'Engineering', count: 2 },
    { id: 'psychology', label: 'Psychology', count: 1 },
    { id: 'professor-led', label: 'Professor Led', count: 3 },
    { id: 'student-led', label: 'Student Led', count: 3 },
    { id: 'open-spots', label: 'Open Spots', count: 5 }
  ];

  // Mock user stats and recommendations
  const userStats = {
    activeProjects: 2,
    completedProjects: 5,
    profileScore: 4.7
  };

  const recommendations = [
    {
      id: 101,
      title: "Machine Learning Research Lab",
      leader: { name: "Dr. Anderson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      department: "CS",
      vacancies: 2,
      matchScore: 95
    },
    {
      id: 102,
      title: "Data Science Bootcamp",
      leader: { name: "Prof. Garcia", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      department: "Stats",
      vacancies: 3,
      matchScore: 88
    },
    {
      id: 103,
      title: "Web Development Workshop",
      leader: { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      department: "CS",
      vacancies: 1,
      matchScore: 82
    }
  ];

  // Initialize projects on component mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Sort projects to prioritize professor-led projects
      const sortedProjects = [...mockProjects].sort((a, b) => {
        if (a.isProfessorLed && !b.isProfessorLed) return -1;
        if (!a.isProfessorLed && b.isProfessorLed) return 1;
        return 0;
      });
      setProjects(sortedProjects);
      setFilteredProjects(sortedProjects);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter projects based on active filters
  useEffect(() => {
    if (activeFilters.length === 0 || activeFilters.includes('all')) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(project => {
      return activeFilters.some(filter => {
        switch (filter) {
          case 'computer-science':
            return project.leader.department.toLowerCase().includes('computer');
          case 'engineering':
            return project.leader.department.toLowerCase().includes('engineering');
          case 'psychology':
            return project.leader.department.toLowerCase().includes('psychology');
          case 'professor-led':
            return project.isProfessorLed;
          case 'student-led':
            return !project.isProfessorLed;
          case 'open-spots':
            return project.vacancies > 0;
          default:
            return true;
        }
      });
    });

    setFilteredProjects(filtered);
  }, [activeFilters, projects]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const handleJoinRequest = (projectId) => {
    console.log('Join request for project:', projectId);
    // Here you would typically make an API call to submit the join request
    alert('Join request submitted successfully!');
  };

  const handleBookmark = (projectId, isBookmarked) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, isBookmarked }
          : project
      )
    );
    setFilteredProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, isBookmarked }
          : project
      )
    );
  };

  const handleLoadMore = () => {
    if (currentPage < 3) { // Simulate pagination
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoading(false);
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Discover Projects
            </h1>
            <p className="font-body text-muted-foreground">
              Find exciting collaboration opportunities and join projects that match your skills and interests.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <FilterChips
                filters={filterOptions}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
              />

              {/* Project Feed */}
              <ProjectFeed
                projects={filteredProjects}
                loading={loading}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                onJoinRequest={handleJoinRequest}
                onBookmark={handleBookmark}
              />
            </div>

            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <RecommendationPanel
                  recommendations={recommendations}
                  userStats={userStats}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton userType="student" />
    </div>
  );
};

export default DashboardHomepage;