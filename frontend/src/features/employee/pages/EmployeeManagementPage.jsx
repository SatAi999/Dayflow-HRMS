import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../services/api/endpoints.js';
import Spinner from '../../../components/ui/Spinner.jsx';

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Editing state
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    designation: '',
    department: '',
    status: 'ACTIVE'
  });
  const [saving, setSaving] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.EMPLOYEES.LIST);
      if (response.data.success) {
        setEmployees(response.data.employees);
      }
    } catch (err) {
      setError('Failed to fetch employee list from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditClick = (emp) => {
    setEditingEmployee(emp);
    setEditForm({
      firstName: emp.firstName || '',
      lastName: emp.lastName || '',
      phone: emp.phone || '',
      address: emp.address || '',
      designation: emp.designation || '',
      department: emp.department || '',
      status: emp.status || 'ACTIVE'
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`${ENDPOINTS.EMPLOYEES.LIST}/${editingEmployee._id}`, editForm);
      if (response.data.success) {
        setSuccess('Employee profile updated successfully.');
        setEditingEmployee(null);
        fetchEmployees();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" label="Loading workforce registry..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employee Directory & Management</h1>
          <p className="mt-1 text-sm text-gray-500">Monitor active corporate profiles, structures, and system access roles.</p>
        </div>
      </div>

      {error && (
        <div className="text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3.5 rounded-r">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm bg-green-50 border-l-4 border-green-500 text-green-700 p-3.5 rounded-r">
          {success}
        </div>
      )}

      {/* Workforce Directory Table */}
      <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{emp.userId?.employeeId || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{emp.userId?.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{emp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{emp.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {emp.userId?.role || 'EMPLOYEE'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {emp.status === 'ACTIVE' ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-150">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-150">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(emp)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/60 px-3 py-1.5 rounded transition"
                    >
                      Edit Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                Edit profile: {editingEmployee.firstName} {editingEmployee.lastName}
              </h3>
              <button
                onClick={() => setEditingEmployee(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={editForm.designation}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Corporate Address</label>
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  required
                  rows={2}
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Employment Status</label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 border border-gray-350 text-gray-700 bg-white rounded font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
