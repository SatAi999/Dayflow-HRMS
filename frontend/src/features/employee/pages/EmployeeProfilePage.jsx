import React from 'react';

export default function EmployeeProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <div className="bg-blue-50 text-blue-600 text-sm p-4 rounded-md">
        Developer: Member 1 (Auth + Employee)
      </div>
      <p className="text-gray-600">View and update your personal details.</p>
    </div>
  );
}
