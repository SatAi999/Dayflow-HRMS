import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../ui/Dropdown.jsx';
import Avatar from '../ui/Avatar.jsx';
import Badge from '../ui/Badge.jsx';

export default function Navbar({ user, onLogout, onOpenMobileSidebar }) {
  const userName = `${user?.firstName || 'User'} ${user?.lastName || ''}`;

  const profileMenuItems = [
    {
      label: 'My Profile',
      onClick: () => {
        window.location.href = user?.role === 'ADMIN' || user?.role === 'HR' ? '/admin/employees' : '/employee/profile';
      },
    },
    {
      label: 'Notifications',
      onClick: () => {
        window.location.href = user?.role === 'ADMIN' || user?.role === 'HR' ? '/admin/notifications' : '/employee/notifications';
      },
    },
    { divider: true },
    {
      label: 'Sign Out',
      onClick: onLogout,
      danger: true,
    },
  ];

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-sm">
      {/* Mobile Sidebar Toggle & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open navigation drawer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Global Search Input */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search employees, reports, logs..."
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Navbar Controls: Role Badge, Notifications, User Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Badge variant={user?.role === 'ADMIN' ? 'indigo' : user?.role === 'HR' ? 'purple' : 'info'} size="md">
          {user?.role || 'EMPLOYEE'}
        </Badge>

        {/* Notification Bell */}
        <button
          onClick={() => {
            window.location.href = user?.role === 'ADMIN' || user?.role === 'HR' ? '/admin/notifications' : '/employee/notifications';
          }}
          className="relative text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Notifications"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        {/* User Profile Dropdown */}
        <Dropdown
          trigger={
            <div className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer">
              <Avatar name={userName} size="sm" />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-gray-800 leading-tight">{userName}</p>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">{user?.email || 'user@dayflow.com'}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          }
          items={profileMenuItems}
          align="right"
        />
      </div>
    </header>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  onOpenMobileSidebar: PropTypes.func.isRequired,
};
