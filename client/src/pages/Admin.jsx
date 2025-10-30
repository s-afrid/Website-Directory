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
import AdminUpdate from "../components/admin_components/AdminUpdate";

const SIDEBAR_WIDTH = 240;

export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Side + Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        <SidePanel isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Admin Content */}
        <div
          className="flex-1 overflow-auto bg-gray-100 p-4 transition-all duration-300"
          style={{
            marginLeft: window.innerWidth >= 768 ? SIDEBAR_WIDTH : 0,
          }}
        >
          <Routes>
  <Route index element={<div className="text-lg font-semibold text-gray-700 p-4">
    Welcome to the Admin Dashboard 👋
  </div>} />
  <Route path="stats" element={<AnalyticsDashboard />} />
  <Route path="manage" element={<Manage />} />
  <Route path="privacy" element={<Privacy />} />
  <Route path="newsletter" element={<Newsletter />} />
  <Route path="sponsors" element={<Sponsor />} />
  <Route path="about" element={<AboutUpdate />} />
  <Route path="updateadmin" element={<AdminUpdate />} />
  <Route path="*" element={<Navigate to="." replace />} />
</Routes>

        </div>
      </div>
    </div>
  );
}
