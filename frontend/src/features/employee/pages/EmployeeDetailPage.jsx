import React from 'react';
import { useParams } from 'react-router-dom';

export default function EmployeeDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Employee Details (ID: {id})</h1>
      <p className="text-gray-600">Review complete organizational files for this employee profile.</p>
    </div>
  );
}
