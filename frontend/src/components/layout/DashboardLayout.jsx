import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/30 text-gray-900 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        user={user}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          user={user}
          onLogout={handleLogout}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Scrollable Page Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gradient-to-tr from-indigo-50/20 via-transparent to-blue-50/30 relative">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-400/8 blur-[100px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-purple-400/8 blur-[90px] rounded-full pointer-events-none z-0" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
