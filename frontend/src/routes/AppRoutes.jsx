import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import RoleRoute from './RoleRoute.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';

// Pages Import
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import SignupPage from '../features/auth/pages/SignupPage.jsx';
import VerifyEmailPage from '../features/auth/pages/VerifyEmailPage.jsx';

import EmployeeDashboard from '../features/employee/pages/EmployeeDashboard.jsx';
import EmployeeProfilePage from '../features/employee/pages/EmployeeProfilePage.jsx';
import EmployeeManagementPage from '../features/employee/pages/EmployeeManagementPage.jsx';
import EmployeeDetailPage from '../features/employee/pages/EmployeeDetailPage.jsx';

import AttendancePage from '../features/attendance/pages/AttendancePage.jsx';
import AdminAttendancePage from '../features/attendance/pages/AdminAttendancePage.jsx';

import LeavePage from '../features/leave/pages/LeavePage.jsx';
import LeaveCalendarPage from '../features/leave/pages/LeaveCalendarPage.jsx';
import AdminLeavePage from '../features/leave/pages/AdminLeavePage.jsx';

import PayrollPage from '../features/payroll/pages/PayrollPage.jsx';
import AdminPayrollPage from '../features/payroll/pages/AdminPayrollPage.jsx';

import DocumentsPage from '../features/documents/pages/DocumentsPage.jsx';
import AdminDocumentsPage from '../features/documents/pages/AdminDocumentsPage.jsx';

import NotificationsPage from '../features/notifications/pages/NotificationsPage.jsx';
import AdminNotificationsPage from '../features/notifications/pages/AdminNotificationsPage.jsx';

import AdminDashboard from '../features/reports/pages/AdminDashboard.jsx';
import ReportsPage from '../features/reports/pages/ReportsPage.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Employee Features Group */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['EMPLOYEE']}>
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<EmployeeProfilePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="leave/calendar" element={<LeaveCalendarPage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* HR/Admin Features Group */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['ADMIN', 'HR']}>
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<EmployeeManagementPage />} />
          <Route path="employees/:id" element={<EmployeeDetailPage />} />
          <Route path="attendance" element={<AdminAttendancePage />} />
          <Route path="leave" element={<AdminLeavePage />} />
          <Route path="payroll" element={<AdminPayrollPage />} />
          <Route path="documents" element={<AdminDocumentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
        </Route>

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
