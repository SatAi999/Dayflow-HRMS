import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '../ui/Avatar.jsx';
import { NAV_ITEMS } from '../../config/navigationConfig.js';

export default function Sidebar({ user, onLogout, isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) {
  const location = useLocation();
  const isManagement = user?.role === 'ADMIN' || user?.role === 'HR';
  const role = user?.role || 'EMPLOYEE';

  const itemsToRender = NAV_ITEMS.filter((item) => item.roles.includes(role));

  const content = (
    <aside
      className={`bg-gray-900 text-gray-100 flex flex-col justify-between transition-all duration-300 z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      } h-full border-r border-gray-800`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md">
                D
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Dayflow<span className="text-blue-400 font-normal text-sm ml-1">HRMS</span>
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md">
              D
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="hidden md:flex text-gray-400 hover:text-white p-1.5 rounded-md hover:bg-gray-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 px-3 space-y-1">
          {itemsToRender.map((item) => {
            const targetPath = isManagement ? item.adminPath || item.employeePath : item.employeePath || item.adminPath;
            const isActive = location.pathname === targetPath || location.pathname.startsWith(`${targetPath}/`);

            return (
              <Link
                key={item.id}
                to={targetPath}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <span className="text-base font-bold">{item.label[0]}</span>
                </div>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-3 border-t border-gray-800 flex flex-col gap-2">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <Avatar name={`${user?.firstName || ''} ${user?.lastName || ''}`} size={isCollapsed ? 'sm' : 'md'} />
          {!isCollapsed && (
            <div className="truncate flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {user?.firstName || 'Employee'} {user?.lastName || 'User'}
              </p>
              <p className="text-xs text-blue-400 font-medium truncate">{user?.role || 'EMPLOYEE'}</p>
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          className={`mt-2 flex items-center justify-center gap-2 w-full py-2 bg-red-600/90 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition duration-150 ${
            isCollapsed ? 'px-0' : 'px-3'
          }`}
          title="Logout"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">{content}</div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 max-w-xs w-full bg-gray-900 h-full z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
  isMobileOpen: PropTypes.bool,
  onCloseMobile: PropTypes.func,
};
