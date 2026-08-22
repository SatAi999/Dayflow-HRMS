import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isManagement = user?.role === 'ADMIN' || user?.role === 'HR';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col justify-between">
        <div>
          <div className="h-16 flex items-center justify-center border-b border-gray-800">
            <span className="text-xl font-bold tracking-wider text-primary-400">Dayflow HRMS</span>
          </div>
          <nav className="mt-6 px-4 space-y-1">
            {isManagement ? (
              <>
                {/* Admin/HR Links */}
                <Link to="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Dashboard
                </Link>
                <Link to="/admin/employees" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Employees Management
                </Link>
                <Link to="/admin/attendance" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Attendance Logs
                </Link>
                <Link to="/admin/leave" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Leave Applications
                </Link>
                <Link to="/admin/payroll" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Payroll Controls
                </Link>
                <Link to="/admin/documents" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Documents Archive
                </Link>
                <Link to="/admin/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Analytics & Reports
                </Link>
                <Link to="/admin/notifications" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Notifications
                </Link>
              </>
            ) : (
              <>
                {/* Employee Links */}
                <Link to="/employee/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Dashboard
                </Link>
                <Link to="/employee/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  My Profile
                </Link>
                <Link to="/employee/attendance" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  My Attendance
                </Link>
                <Link to="/employee/leave" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Apply Leave
                </Link>
                <Link to="/employee/leave/calendar" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Leave Calendar
                </Link>
                <Link to="/employee/payroll" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Salary Structure
                </Link>
                <Link to="/employee/documents" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  My Documents
                </Link>
                <Link to="/employee/notifications" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                  Alerts
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* User Footer Profile & Logout */}
        <div className="p-4 border-t border-gray-800 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
              {user?.firstName?.charAt(0) || 'E'}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold truncate">{user?.firstName || 'Employee'} {user?.lastName || 'User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.role || 'EMPLOYEE'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full mt-2 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition duration-150">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="font-semibold text-gray-800 text-lg">
            Active Workspace: {user?.role || 'Guest'}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Session active
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
