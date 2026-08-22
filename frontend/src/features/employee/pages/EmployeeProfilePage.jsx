import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { ENDPOINTS } from '../../../services/api/endpoints';

export default function EmployeeProfilePage() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
    profilePicture: user?.profilePicture || ''
  });

  if (!user) {
    return <div className="p-6">Loading profile...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.put(ENDPOINTS.EMPLOYEES.ME, formData);
      if (response.data.success) {
        setSuccess('Profile updated successfully.');
        setIsEditing(false);
        // Update user context (needs token preservation)
        login(localStorage.getItem('token'), { ...user, ...response.data.profile });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-3 rounded">{success}</div>}

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 sm:flex sm:items-center sm:justify-between border-b border-gray-200">
          <div className="sm:flex sm:space-x-5 items-center">
            <div className="flex-shrink-0">
              {formData.profilePicture ? (
                <img className="mx-auto h-20 w-20 rounded-full object-cover" src={formData.profilePicture} alt="Profile" />
              ) : (
                <div className="mx-auto h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-2xl">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.firstName} {user.lastName}</p>
              <p className="text-sm font-medium text-gray-600">{user.designation} - {user.department}</p>
            </div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Edit Details</h3>
            <p className="text-sm text-gray-500">Only limited fields can be edited by employees.</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full" />
              {formData.profilePicture && (
                <img src={formData.profilePicture} alt="Preview" className="mt-2 h-16 w-16 rounded object-cover" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.userId?.employeeId || user.employeeId}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.userId?.email || user.email}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phone}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.address}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Joining Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(user.joiningDate).toLocaleDateString()}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Salary Structure</h3>
          <p className="text-sm text-gray-500 italic">No salary data available in this module view.</p>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">My Documents</h3>
          <p className="text-sm text-gray-500 italic">No documents uploaded yet.</p>
        </div>
      </div>
    </div>
  );
}
