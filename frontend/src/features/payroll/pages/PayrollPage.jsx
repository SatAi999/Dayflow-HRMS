import React from 'react';

export default function PayrollPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Payroll Statements</h1>
      <div className="bg-blue-50 text-blue-600 text-sm p-4 rounded-md">
        Developer: Member 3 (Leave + Payroll + Documents)
      </div>
      <p className="text-gray-600">Read-only structural view of basic salary and allowances.</p>
    </div>
  );
}
