import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Register a new employee/HR system profile.</p>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-xs text-center text-blue-600 bg-blue-50 p-2 rounded">
            Developer: Member 1 (Auth + Employee)
          </p>
          <div className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
