import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import AchievementBadges from './components/AchievementBadges';
import PrivacySettings from './components/PrivacySettings';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const ProfileManagement = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: "John Doe",
    title: "Computer Science Student",
    bio: `Passionate full-stack developer with a keen interest in artificial intelligence and machine learning. Currently pursuing my Bachelor's degree in Computer Science with a focus on software engineering and data science. I enjoy collaborating on innovative projects that solve real-world problems and am always eager to learn new technologies.`,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    department: "Computer Science",
    year: "3rd Year",
    location: "University Campus",
    profileViews: 1247,
    searchAppearances: 892,
    stats: {
      projectsCompleted: 12,
      completionRate: 94,
      averageRating: 4.8,
      collaborations: 28
    }
  });

  // Mock skills data
  const [userSkills, setUserSkills] = useState([
    { id: 1, name: "React", level: 4, category: "technical", endorsements: 24, verified: true },
    { id: 2, name: "JavaScript", level: 4, category: "technical", endorsements: 22, verified: true },
    { id: 3, name: "Python", level: 5, category: "technical", endorsements: 18, verified: true },
    { id: 4, name: "Node.js", level: 3, category: "technical", endorsements: 15, verified: false },
    { id: 5, name: "MongoDB", level: 3, category: "technical", endorsements: 12, verified: false },
    { id: 6, name: "Git", level: 4, category: "tools", endorsements: 20, verified: true },
    { id: 7, name: "Docker", level: 2, category: "tools", endorsements: 8, verified: false },
    { id: 8, name: "Team Leadership", level: 4, category: "soft", endorsements: 16, verified: true },
    { id: 9, name: "Problem Solving", level: 5, category: "soft", endorsements: 19, verified: true },
    { id: 10, name: "Communication", level: 4, category: "soft", endorsements: 14, verified: true }
  ]);

  // Mock portfolio projects
  const [portfolioProjects, setPortfolioProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, payment integration, and admin dashboard.",
      fullDescription: `A comprehensive e-commerce platform built from scratch using modern web technologies. The project includes user registration and authentication, product catalog management, shopping cart functionality, secure payment processing through Stripe, order management, and a complete admin dashboard for inventory and user management.\n\nThe frontend is built with React and styled with Tailwind CSS, providing a responsive and intuitive user interface. The backend uses Node.js with Express framework and MongoDB for data storage. The application also includes real-time notifications, email integration, and comprehensive error handling.`,
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Tailwind CSS"],
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2024-12-15",
      teamSize: 4,
      achievements: [
        "Successfully processed over 1000 test transactions",
        "Achieved 99.9% uptime during testing phase",
        "Implemented advanced security features"
      ],
      artifacts: [
        { name: "Live Demo", url: "https://demo.example.com", type: "demo" },
        { name: "Source Code", url: "https://github.com/johndoe/ecommerce", type: "code" },
        { name: "Documentation", url: "https://docs.example.com", type: "docs" }
      ]
    },
    {
      id: 2,
      title: "AI-Powered Study Assistant",
      description: "Machine learning application that helps students organize study materials and provides personalized learning recommendations.",
      fullDescription: `An intelligent study assistant that leverages machine learning algorithms to help students optimize their learning experience. The application analyzes study patterns, tracks progress, and provides personalized recommendations for study materials and schedules.\n\nKey features include automatic content categorization, progress tracking with visual analytics, spaced repetition algorithms for optimal retention, collaborative study groups, and integration with popular learning platforms. The ML model was trained on anonymized student data to provide accurate predictions and recommendations.`,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      technologies: ["Python", "TensorFlow", "Flask", "React", "PostgreSQL", "scikit-learn"],
      status: "in-progress",
      startDate: "2024-10-01",
      endDate: null,
      teamSize: 3,
      achievements: [
        "Achieved 85% accuracy in learning pattern prediction",
        "Reduced study time by 30% for beta users"
      ],
      artifacts: [
        { name: "Research Paper", url: "https://research.example.com", type: "docs" },
        { name: "Beta Version", url: "https://beta.studyai.com", type: "demo" }
      ]
    },
    {
      id: 3,
      title: "Campus Event Management System",
      description: "Web application for managing college events, including registration, ticketing, and real-time updates for attendees.",
      fullDescription: `A comprehensive event management system designed specifically for college campuses. The platform allows event organizers to create, manage, and promote events while providing students with an easy way to discover and register for activities.\n\nFeatures include event creation with rich media support, automated registration and ticketing, real-time capacity management, push notifications for updates, QR code-based check-ins, analytics dashboard for organizers, and integration with college calendar systems. The system has been successfully used for over 50 campus events.`,
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "WebSocket", "PWA"],
      status: "completed",
      startDate: "2024-06-01",
      endDate: "2024-08-30",
      teamSize: 5,
      achievements: [
        "Managed 50+ events with 5000+ total attendees",
        "Reduced event registration time by 60%",
        "Won Best Innovation Award at College Tech Fair"
      ],
      artifacts: [
        { name: "Live Platform", url: "https://events.college.edu", type: "demo" },
        { name: "Source Code", url: "https://github.com/johndoe/campus-events", type: "code" },
        { name: "User Guide", url: "https://guide.events.college.edu", type: "docs" }
      ]
    }
  ]);

  // Mock achievements data
  const userAchievements = [
    {
      id: 1,
      type: "team-player",
      title: "Team Player",
      earnedDate: "2024-11-15"
    },
    {
      id: 2,
      type: "innovator",
      title: "Innovator",
      earnedDate: "2024-10-22"
    },
    {
      id: 3,
      type: "collaborator",
      title: "Cross-Department Collaborator",
      earnedDate: "2024-09-08"
    },
    {
      id: 4,
      type: "early-adopter",
      title: "Early Adopter",
      earnedDate: "2024-08-14"
    }
  ];

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "college",
    contactVisibility: "connections",
    projectVisibility: "public",
    projectInvitations: true,
    skillEndorsements: true,
    profileViews: true,
    projectUpdates: true,
    marketingEmails: false,
    twoFactorEnabled: false
  });

  // Mock analytics data
  const analyticsData = {
    totalViews: 1247,
    searchAppearances: 892,
    totalEndorsements: 168,
    projectInvites: 23
  };

  const handleProfileSave = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleSkillsUpdate = (updatedSkills) => {
    setUserSkills(updatedSkills);
  };

  const handleProjectsUpdate = (updatedProjects) => {
    setPortfolioProjects(updatedProjects);
  };

  const handlePrivacyUpdate = (updatedSettings) => {
    setPrivacySettings(updatedSettings);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb />
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              <ProfileHeader
                profile={userProfile}
                isEditing={isEditingProfile}
                onEditToggle={() => setIsEditingProfile(!isEditingProfile)}
                onSave={handleProfileSave}
              />
              
              <SkillsSection
                skills={userSkills}
                onSkillsUpdate={handleSkillsUpdate}
              />
              
              <PortfolioSection
                projects={portfolioProjects}
                onProjectsUpdate={handleProjectsUpdate}
              />
              
              <AnalyticsDashboard analytics={analyticsData} />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <AchievementBadges achievements={userAchievements} />
              
              <PrivacySettings
                settings={privacySettings}
                onSettingsUpdate={handlePrivacyUpdate}
              />
              
              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors duration-200 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">CV</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Download Resume</p>
                      <p className="text-xs text-muted-foreground">Export your profile as PDF</p>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors duration-200 flex items-center gap-3">
                    <div className="w-8 h-8 bg-success/10 text-success rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">+</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Add Project</p>
                      <p className="text-xs text-muted-foreground">Showcase your latest work</p>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors duration-200 flex items-center gap-3">
                    <div className="w-8 h-8 bg-warning/10 text-warning rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">?</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Profile Tips</p>
                      <p className="text-xs text-muted-foreground">Improve your visibility</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManagement;