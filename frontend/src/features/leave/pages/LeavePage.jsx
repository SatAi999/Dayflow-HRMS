import React, { useState, useEffect } from 'react';
import * as leaveService from '../services/leaveService.js';

export default function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: 'PAID',
    startDate: '',
    endDate: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch my leave history
  const fetchLeaves = async () => {
    try {
      const res = await leaveService.getMyLeaveRequests();
      if (res.success) {
        setLeaves(res.leaves);
      }
    } catch (err) {
      console.error('Error fetching leaves:', err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await leaveService.applyForLeave(formData);
      if (res.success) {
        setSuccess('Leave request submitted successfully!');
        setFormData({
          leaveType: 'PAID',
          startDate: '',
          endDate: '',
          remarks: ''
        });
        fetchLeaves(); // Refresh history
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit leave request. Please check input parameters.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = (start, end) => {
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const paidLeavesTaken = leaves
    .filter(l => l.leaveType === 'PAID' && l.status === 'APPROVED')
    .reduce((acc, curr) => acc + calculateDays(curr.startDate, curr.endDate), 0);

  const sickLeavesTaken = leaves
    .filter(l => l.leaveType === 'SICK' && l.status === 'APPROVED')
    .reduce((acc, curr) => acc + calculateDays(curr.startDate, curr.endDate), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
      case 'REJECTED':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leave Applications</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Paid Leaves Taken</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{paidLeavesTaken} Days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Sick Leaves Taken</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{sickLeavesTaken} Days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Pending Applications</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {leaves.filter(l => l.status === 'PENDING').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Application Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Apply for Leave</h2>
          
          {error && <div className="mb-4 text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">{error}</div>}
          {success && <div className="mb-4 text-sm bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="PAID">Paid Leave</option>
                <option value="SICK">Sick Leave</option>
                <option value="UNPAID">Unpaid Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks / Reasons</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Please describe your leave details..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded font-medium transition duration-150 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Leave Application'}
            </button>
          </form>
        </div>

        {/* Leave Request Logs */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2 overflow-hidden flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Leave History</h2>
          
          <div className="flex-1 overflow-x-auto">
            {leaves.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No leave requests filed yet. Your submissions will appear here.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {leaves.map((leave) => (
                    <tr key={leave._id || leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(leave.status)}</td>
                      <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{leave.remarks}</td>
                      <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{leave.adminComments || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
