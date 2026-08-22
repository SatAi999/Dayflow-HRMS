import React from 'react';
import { useParams } from 'react-router-dom';

export default function EmployeeDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Employee Details (ID: {id})</h1>
      <div className="bg-blue-50 text-blue-600 text-sm p-4 rounded-md">
        Developer: Member 1 (Auth + Employee)
      </div>
      <p className="text-gray-600">Review complete organizational files for this employee profile.</p>
    </div>
  );
}
