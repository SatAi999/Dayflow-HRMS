import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../services/api/endpoints.js';
import Spinner from '../../../components/ui/Spinner.jsx';

export default function AdminPayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Edit salary configuration state
  const [editTarget, setEditTarget] = useState(null); // Employee record
  const [editForm, setEditForm] = useState({
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payPeriod: ''
  });
  const [saving, setSaving] = useState(false);

  const fetchPayrolls = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.PAYROLL.LIST);
      if (response.data.success) {
        setPayrolls(response.data.records);
      }
    } catch (err) {
      setError('Failed to retrieve corporate payroll records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleEditClick = (record) => {
    setEditTarget(record.employeeId); // Contains employee document with _id, firstName, lastName
    setEditForm({
      basicSalary: record.basicSalary || 0,
      allowances: record.allowances || 0,
      deductions: record.deductions || 0,
      payPeriod: record.payPeriod || new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
    });
  };

  const handleFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(ENDPOINTS.PAYROLL.UPDATE(editTarget._id), {
        basicSalary: Number(editForm.basicSalary),
        allowances: Number(editForm.allowances),
        deductions: Number(editForm.deductions),
        payPeriod: editForm.payPeriod
      });

      if (response.data.success) {
        setSuccess(`Salary structure for ${editTarget.firstName} updated successfully.`);
        setEditTarget(null);
        fetchPayrolls();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update salary details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" label="Loading payroll configurations..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Corporate Payroll Management</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor salaries, bonuses, tax deductions, and update workforce payment structures.</p>
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

      {/* Payroll Table */}
      <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Basic Salary</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Allowances</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Net take-home</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Pay Period</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
              {payrolls.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {record.employeeId?.firstName} {record.employeeId?.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    ${record.basicSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">
                    +${record.allowances.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-500 font-semibold">
                    -${record.deductions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-950">
                    ${record.netSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                    {record.payPeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <button
                      onClick={() => handleEditClick(record)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/60 px-3 py-1.5 rounded transition"
                    >
                      Update Structure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Salary Modal */}
      {editTarget && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                Update Salary: {editTarget.firstName} {editTarget.lastName}
              </h3>
              <button
                onClick={() => setEditTarget(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Basic Salary ($)</label>
                <input
                  type="number"
                  name="basicSalary"
                  value={editForm.basicSalary}
                  onChange={handleFormChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Allowances ($)</label>
                <input
                  type="number"
                  name="allowances"
                  value={editForm.allowances}
                  onChange={handleFormChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deductions ($)</label>
                <input
                  type="number"
                  name="deductions"
                  value={editForm.deductions}
                  onChange={handleFormChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pay Period</label>
                <input
                  type="text"
                  name="payPeriod"
                  value={editForm.payPeriod}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. August 2026"
                  className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 border border-gray-350 text-gray-700 bg-white rounded font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
