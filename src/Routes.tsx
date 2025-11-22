import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminPanel from './pages/admin-panel';
import TextSimplificationTool from './pages/text-simplification-tool';
import Dashboard from './pages/dashboard';
import UserProfileSettings from './pages/user-profile-settings';
import TextAnalysisWorkspace from './pages/text-analysis-workspace';
import TeamCollaborationHub from './pages/team-collaboration-hub';
import Register from './pages/register';
import Login from './pages/login';
import DocumentHistory from './pages/document-history';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
        <Route path="/" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/document-history" element={<DocumentHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/text-simplification-tool" element={<TextSimplificationTool />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/text-analysis-workspace" element={<TextAnalysisWorkspace />} />
        <Route path="/team-collaboration-hub" element={<TeamCollaborationHub />} />
        <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
