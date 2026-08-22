import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Verifying permissions...</div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // If not allowed, redirect based on actual role
    if (user?.role === 'ADMIN' || user?.role === 'HR') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/employee/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
