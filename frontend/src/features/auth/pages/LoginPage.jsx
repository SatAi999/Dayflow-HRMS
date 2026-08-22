import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In to Dayflow</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your employee email and password credentials.</p>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-xs text-center text-blue-600 bg-blue-50 p-2 rounded">
            Developer: Member 1 (Auth + Employee)
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/employee/dashboard" className="w-full py-2 px-4 bg-primary-600 text-white rounded text-center font-medium hover:bg-primary-700">
              Mock Employee Login
            </Link>
            <Link to="/admin/dashboard" className="w-full py-2 px-4 bg-gray-800 text-white rounded text-center font-medium hover:bg-gray-900">
              Mock Admin Login
            </Link>
          </div>
          <div className="text-center text-sm mt-4">
            Don't have an account? <Link to="/signup" className="text-primary-600 font-medium hover:underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
