import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../services/api/endpoints';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post(ENDPOINTS.AUTH.VERIFY_EMAIL, { token: 'mock-token' });
      if (response.data.success) {
        setMessage(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Email Verification</h2>
        <p className="text-sm text-gray-600">
          Click the button below to verify your email address. In a real application, this page would automatically verify based on a token in the URL.
        </p>

        {error && <div className="text-red-600 bg-red-50 p-2 rounded">{error}</div>}
        {message && <div className="text-green-600 bg-green-50 p-2 rounded">{message}</div>}

        <button
          onClick={handleVerify}
          disabled={loading || message !== ''}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : (message ? 'Verified' : 'Simulate Verification')}
        </button>
      </div>
    </div>
  );
}
