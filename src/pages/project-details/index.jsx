import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectHero from './components/ProjectHero';
import ProjectTabs from './components/ProjectTabs';
import JoinRequestModal from './components/JoinRequestModal';
import RelatedProjects from './components/RelatedProjects';
import CommentSection from './components/CommentSection';
import ProjectSidebar from './components/ProjectSidebar';

const ProjectDetails = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id') || '1';
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);

  // Mock project data
  const project = {
    id: projectId,
    title: "AI-Powered Student Performance Analytics Platform",
    shortDescription: "Developing a comprehensive analytics platform that uses machine learning to predict student performance and provide personalized learning recommendations for academic improvement.",
    fullDescription: `This project aims to create an innovative AI-powered platform that analyzes student performance data to provide actionable insights for both students and educators. The system will integrate multiple data sources including assignment scores, attendance records, engagement metrics, and learning patterns to generate comprehensive performance analytics.\n\nThe platform will feature predictive modeling capabilities to identify at-risk students early, personalized learning path recommendations, and real-time performance dashboards. We'll be implementing advanced machine learning algorithms including neural networks, decision trees, and clustering techniques to ensure accurate predictions and meaningful insights.\n\nThis is a research-oriented project with potential for publication and real-world implementation within our university's learning management system.`,
    leader: {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      year: "4th Year Computer Science",
      department: "Computer Science",
      email: "sarah.chen@university.edu"
    },
    professor: {
      id: 1,
      name: "Dr. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Computer Science Department",
      email: "m.rodriguez@university.edu"
    },
    status: "Open",
    department: "Computer Science",
    currentMembers: 3,
    maxMembers: 6,
    deadline: "Dec 20, 2024",
    duration: "6 months",
    timeCommitment: "15-20 hours per week during development phase, 10-15 hours during testing and deployment",
    views: 247,
    applications: 18,
    professorInvolved: true,
    objectives: [
      "Develop machine learning models for student performance prediction",
      "Create intuitive dashboards for students and educators",
      "Implement real-time data processing and analytics",
      "Design personalized learning recommendation engine",
      "Conduct comprehensive testing with real student data",
      "Prepare research paper for academic publication"
    ],
    timeline: [
      {
        title: "Research & Planning",
        duration: "Month 1-2"
      },
      {
        title: "Data Collection & Preprocessing",
        duration: "Month 2-3"
      },
      {
        title: "ML Model Development",
        duration: "Month 3-4"
      },
      {
        title: "Platform Development",
        duration: "Month 4-5"
      },
      {
        title: "Testing & Deployment",
        duration: "Month 6"
      }
    ],
    teamMembers: [
      {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        role: "Project Leader & ML Engineer",
        skills: ["Python", "TensorFlow", "Data Science", "Project Management"],
        isLeader: true
      },
      {
        id: 2,
        name: "Alex Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "Backend Developer",
        skills: ["Node.js", "MongoDB", "API Development", "Cloud Computing"],
        isLeader: false
      },
      {
        id: 3,
        name: "Emily Zhang",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        role: "Frontend Developer",
        skills: ["React", "TypeScript", "UI/UX Design", "Data Visualization"],
        isLeader: false
      }
    ],
    openRoles: [
      {
        title: "Data Scientist",
        description: "Focus on statistical analysis, feature engineering, and model validation",
        requiredSkills: ["Python", "Statistics", "Pandas", "Scikit-learn"]
      },
      {
        title: "DevOps Engineer",
        description: "Handle deployment, monitoring, and infrastructure management",
        requiredSkills: ["Docker", "AWS", "CI/CD", "Monitoring Tools"]
      },
      {
        title: "QA Engineer",
        description: "Develop testing strategies and ensure platform reliability",
        requiredSkills: ["Testing Frameworks", "Automation", "Quality Assurance"]
      }
    ],
    technicalRequirements: [
      { skill: "Python", level: 4, required: true },
      { skill: "Machine Learning", level: 4, required: true },
      { skill: "React/Frontend", level: 3, required: true },
      { skill: "Node.js/Backend", level: 3, required: true },
      { skill: "Database Design", level: 3, required: true },
      { skill: "Data Visualization", level: 3, required: false },
      { skill: "Cloud Platforms", level: 2, required: false },
      { skill: "DevOps", level: 2, required: false }
    ],
    softSkills: [
      "Strong analytical thinking",
      "Excellent communication",
      "Team collaboration",
      "Problem-solving mindset",
      "Attention to detail",
      "Research orientation"
    ]
  };

  // Mock related projects
  const relatedProjects = [
    {
      id: 2,
      title: "Smart Campus Navigation System",
      shortDescription: "AR-based navigation app for campus with real-time crowd density and optimal route suggestions.",
      leader: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      status: "Open",
      currentMembers: 2,
      maxMembers: 5,
      duration: "4 months",
      skills: ["React Native", "AR", "Node.js"],
      professorInvolved: false
    },
    {
      id: 3,
      title: "Blockchain-Based Academic Credentials",
      shortDescription: "Secure, verifiable digital credential system using blockchain technology for academic achievements.",
      leader: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
      },
      status: "Open",
      currentMembers: 4,
      maxMembers: 7,
      duration: "8 months",
      skills: ["Blockchain", "Solidity", "Web3"],
      professorInvolved: true
    },
    {
      id: 4,
      title: "Mental Health Support Chatbot",
      shortDescription: "AI-powered chatbot providing 24/7 mental health support and resources for students.",
      leader: {
        name: "James Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      status: "Recruiting",
      currentMembers: 3,
      maxMembers: 6,
      duration: "5 months",
      skills: ["NLP", "Python", "Psychology"],
      professorInvolved: true
    }
  ];

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      author: {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isLeader: false
      },
      content: "This looks like an amazing project! I have experience with TensorFlow and scikit-learn. What specific ML algorithms are you planning to use for the prediction models?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 5,
      replies: [
        {
          id: 11,
          author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            isLeader: true
          },
          content: "Great question! We're planning to start with ensemble methods like Random Forest and Gradient Boosting, then explore neural networks for more complex patterns. Your TensorFlow experience would be really valuable!",
          timestamp: new Date(Date.now() - 3000000) // 50 minutes ago
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Jennifer Liu",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isLeader: false
      },
      content: "I'm interested in the data visualization aspect. Will you be using any specific libraries like D3.js or Chart.js for the dashboards?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      likes: 3,
      replies: []
    },
    {
      id: 3,
      author: {
        name: "Robert Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        isLeader: false
      },
      content: "How will you handle data privacy and FERPA compliance when working with student performance data?",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      likes: 8,
      replies: [
        {
          id: 31,
          author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            isLeader: true
          },
          content: "Excellent point! We\'ll be working with anonymized data and following all university privacy guidelines. Dr. Rodriguez is helping us navigate the compliance requirements.",
          timestamp: new Date(Date.now() - 9600000) // 2.5 hours ago
        }
      ]
    }
  ];

  useEffect(() => {
    setComments(mockComments);
  }, []);

  const handleJoinRequest = async (formData) => {
    console.log('Join request submitted:', formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Your join request has been submitted successfully!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Project link copied to clipboard!');
    }
  };

  const handleMessage = () => {
    console.log('Message project leader');
    alert('Message functionality would open here');
  };

  const handleAddComment = async (content) => {
    const newComment = {
      id: comments.length + 1,
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        isLeader: false
      },
      content,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
    
    setComments(prev => [newComment, ...prev]);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/dashboard-homepage' },
    { label: 'Explore Projects', path: '/explore-projects' },
    { label: project.title, path: '/project-details', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ProjectHero
                project={project}
                onJoinRequest={() => setIsJoinModalOpen(true)}
                onBookmark={handleBookmark}
                onShare={handleShare}
                onMessage={handleMessage}
                isBookmarked={isBookmarked}
              />
              
              <ProjectTabs project={project} />
              
              <CommentSection
                comments={comments}
                onAddComment={handleAddComment}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProjectSidebar
                  project={project}
                  onJoinRequest={() => setIsJoinModalOpen(true)}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  isBookmarked={isBookmarked}
                />
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="mt-12">
            <RelatedProjects projects={relatedProjects} />
          </div>
        </div>
      </main>

      {/* Join Request Modal */}
      <JoinRequestModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinRequest}
        project={project}
      />
    </div>
  );
};

export default ProjectDetails;