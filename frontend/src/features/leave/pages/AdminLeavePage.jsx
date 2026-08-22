import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../services/api/endpoints.js';
import Spinner from '../../../components/ui/Spinner.jsx';

export default function AdminLeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Approval review state
  const [reviewId, setReviewId] = useState(null);
  const [adminComments, setAdminComments] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.LEAVE.LIST);
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (err) {
      setError('Failed to fetch leave applications from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const calculateDays = (start, end) => {
    const diff = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleReviewAction = async (id, action) => {
    setProcessing(true);
    setError('');
    setSuccess('');

    try {
      const url = action === 'APPROVE' 
        ? ENDPOINTS.LEAVE.APPROVE(id) 
        : ENDPOINTS.LEAVE.REJECT(id);

      const response = await axios.put(url, { adminComments });
      if (response.data.success) {
        setSuccess(`Leave request successfully ${action.toLowerCase()}d.`);
        setReviewId(null);
        setAdminComments('');
        fetchLeaves();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit leave status update.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" label="Loading leave requests log..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Workforce Leave Approvals</h1>
        <p className="mt-1 text-sm text-gray-500">Audit, approve, or reject employee paid and sick time-off applications.</p>
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

      {/* Applications list */}
      <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee Remarks</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Admin Comments</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
              {leaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {leave.employeeId?.firstName} {leave.employeeId?.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      leave.leaveType === 'SICK' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600">
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    {calculateDays(leave.startDate, leave.endDate)} Days
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{leave.remarks}</td>
                  <td className="px-6 py-4 max-w-xs truncate font-medium italic text-gray-500">
                    {leave.adminComments || '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leave.status === 'APPROVED' ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-150">Approved</span>
                    ) : leave.status === 'REJECTED' ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-150">Rejected</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-150">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leave.status === 'PENDING' ? (
                      <button
                        onClick={() => {
                          setReviewId(leave._id);
                          setAdminComments('');
                        }}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/60 px-3 py-1.5 rounded transition"
                      >
                        Review Application
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium italic">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Dialog Modal */}
      {reviewId && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Review Leave Request</h3>
              <button
                onClick={() => setReviewId(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Reviewer Comments</label>
                <textarea
                  value={adminComments}
                  onChange={(e) => setAdminComments(e.target.value)}
                  placeholder="e.g. Approved. Team cover arranged."
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end">
                <button
                  type="button"
                  onClick={() => setReviewId(null)}
                  className="px-4 py-2 border border-gray-350 text-gray-700 bg-white rounded font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => handleReviewAction(reviewId, 'REJECT')}
                  className="px-4 py-2 bg-red-600 text-white rounded font-medium text-sm hover:bg-red-700 disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => handleReviewAction(reviewId, 'APPROVE')}
                  className="px-4 py-2 bg-green-600 text-white rounded font-medium text-sm hover:bg-green-700 disabled:opacity-50"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
