import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import DashboardHomepage from "pages/dashboard-homepage";
import ExploreProjects from "pages/explore-projects";
import ProjectDetails from "pages/project-details";
import MyProjects from "pages/my-projects";
import CreateProject from "pages/create-project";
import ProfileManagement from "pages/profile-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardHomepage />} />
        <Route path="/dashboard-homepage" element={<DashboardHomepage />} />
        <Route path="/explore-projects" element={<ExploreProjects />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;