import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.jsx';
import { ENDPOINTS } from '../../../services/api/endpoints.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(ENDPOINTS.AUTH.LOGIN, { email, password });
      if (response.data.success) {
        // Save session in AuthContext
        login(response.data.token, response.data.user);
        
        // Redirect dynamically based on user role
        const role = response.data.user.role;
        if (role === 'ADMIN' || role === 'HR') {
          navigate('/admin/dashboard');
        } else {
          navigate('/employee/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md border border-gray-100 animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In to Dayflow</h2>
          <p className="mt-2 text-sm text-gray-500">Dayflow Human Resource Management System</p>
        </div>

        {error && (
          <div className="text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. john.doe@dayflow.com"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded font-medium transition duration-150 disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm border-t border-gray-100 pt-4 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 font-semibold hover:underline">
            Register Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
