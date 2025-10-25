import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidePanel from "../components/admin_components/SidePanel";
import AnalyticsDashboard from "../components/admin_components/AnalyticsDashboard";
import Manage from "../components/admin_components/Manage";
import Privacy from "../components/admin_components/Privacy";
import Newsletter from "../components/admin_components/Newsletter";
import Sponsor from "../components/admin_components/Sponsor";
import AboutUpdate from "../components/admin_components/AboutUpdate";

const SIDEBAR_WIDTH = 240;

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <SidePanel isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className="flex-1 overflow-auto bg-gray-100 p-4 transition-all duration-300"
          style={{ marginLeft: window.innerWidth >= 768 ? SIDEBAR_WIDTH : 0 }} // push content on desktop
        >
          <Routes>
  <Route index element={<Navigate to="stats" replace />} />
  <Route path="stats" element={<AnalyticsDashboard />} />
  <Route path="manage" element={<Manage />} />
  <Route path="privacy" element={<Privacy />} />
  <Route path="newsletter" element={<Newsletter />} />
  <Route path="sponsors" element={<Sponsor />} />
  <Route path="about" element={<AboutUpdate />} />
  <Route path="*" element={<Navigate to="stats" replace />} />
</Routes>

        </div>
      </div>
    </div>
  );
};

export default Admin;
