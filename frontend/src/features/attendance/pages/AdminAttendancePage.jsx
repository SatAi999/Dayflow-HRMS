import React, { useState, useEffect } from 'react';
import api from '../../../services/api/axios.js';
import { ENDPOINTS } from '../../../services/api/endpoints.js';

export default function AdminAttendancePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCompanyAttendance = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterDate) params.date = filterDate;
      if (filterStatus !== 'ALL') params.status = filterStatus;

      const res = await api.get(ENDPOINTS.ATTENDANCE.LIST, { params });
      if (res.data.success) {
        setRecords(res.data.records || []);
      }
    } catch (error) {
      console.error('Error fetching admin attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyAttendance();
  }, [filterDate, filterStatus]);

  const filteredRecords = records.filter((rec) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const empName = `${rec.employeeId?.firstName || ''} ${rec.employeeId?.lastName || ''}`.toLowerCase();
    const empCode = (rec.employeeId?.employeeCode || '').toLowerCase();
    const dept = (rec.employeeId?.department || '').toLowerCase();

    return empName.includes(term) || empCode.includes(term) || dept.includes(term);
  });

  const presentCount = filteredRecords.filter(r => r.status === 'PRESENT').length;
  const halfDayCount = filteredRecords.filter(r => r.status === 'HALF_DAY').length;
  const leaveCount = filteredRecords.filter(r => r.status === 'LEAVE').length;
  const absentCount = filteredRecords.filter(r => r.status === 'ABSENT').length;

  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PRESENT':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">Present</span>;
      case 'HALF_DAY':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800">Half Day</span>;
      case 'ABSENT':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-rose-100 text-rose-800">Absent</span>;
      case 'LEAVE':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800">On Leave</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Attendance Audit</h1>
          <p className="text-sm text-gray-500">Monitor and manage daily check-ins and log history across all employees.</p>
        </div>

        <button
          onClick={fetchCompanyAttendance}
          className="self-start md:self-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs uppercase font-semibold text-gray-400">Total Checked In</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{presentCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs uppercase font-semibold text-gray-400">Half Days</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{halfDayCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs uppercase font-semibold text-gray-400">On Leave</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">{leaveCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs uppercase font-semibold text-gray-400">Absent</span>
          <div className="text-2xl font-bold text-rose-600 mt-1">{absentCount}</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Search Employee</label>
          <input
            type="text"
            placeholder="Name, Code, or Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Filter Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="PRESENT">Present</option>
            <option value="HALF_DAY">Half Day</option>
            <option value="ABSENT">Absent</option>
            <option value="LEAVE">Leave</option>
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm animate-pulse">
            Loading attendance records...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No attendance records match your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Employee</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Check In</th>
                  <th className="py-3.5 px-4">Check Out</th>
                  <th className="py-3.5 px-4">Work Hours</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((rec) => (
                  <tr key={rec._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">
                        {rec.employeeId?.firstName} {rec.employeeId?.lastName}
                      </div>
                      <div className="text-xs text-gray-400">{rec.employeeId?.employeeCode || 'N/A'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-gray-700">
                      {rec.employeeId?.department || 'General'}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-900">{rec.date}</td>
                    <td className="py-3.5 px-4">{formatTime(rec.checkIn)}</td>
                    <td className="py-3.5 px-4">{formatTime(rec.checkOut)}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold">
                      {rec.workHours ? `${rec.workHours} hrs` : '--'}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(rec.status)}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-500 truncate max-w-xs">{rec.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
