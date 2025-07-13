import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard-homepage': 'Home',
    '/explore-projects': 'Explore Projects',
    '/project-details': 'Project Details',
    '/my-projects': 'My Projects',
    '/profile-management': 'Profile',
    '/create-project': 'Create Project',
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard-homepage' }];

    if (location.pathname !== '/dashboard-homepage') {
      const currentRoute = `/${pathSegments.join('/')}`;
      const currentLabel = routeMap[currentRoute] || 'Current Page';
      
      if (location.pathname === '/project-details') {
        breadcrumbs.push({ label: 'Explore Projects', path: '/explore-projects' });
      }
      
      breadcrumbs.push({ label: currentLabel, path: currentRoute, isActive: true });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-muted-foreground" 
            />
          )}
          {item.isActive ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;