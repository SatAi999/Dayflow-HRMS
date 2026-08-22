import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="bg-blue-50 text-blue-600 text-sm p-4 rounded-md">
        Developer: Member 4 (Dashboard + Reports + Shared UI)
      </div>
      <p className="text-gray-600">Company analytics feed, pending leaves counts, check-in percentages.</p>
    </div>
  );
}
