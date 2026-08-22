import React, { useState } from 'react';

export default function AttendanceDailyView({ records = [] }) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredRecords = records.filter((rec) => {
    if (filterStatus === 'ALL') return true;
    return rec.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PRESENT':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Present</span>;
      case 'HALF_DAY':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Half Day</span>;
      case 'ABSENT':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">Absent</span>;
      case 'LEAVE':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">On Leave</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden space-y-4 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Daily Attendance History</h3>
          <p className="text-xs text-gray-500">Detailed list of your daily check-in and check-out logs.</p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-gray-500">Status Filter:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PRESENT">Present</option>
            <option value="HALF_DAY">Half Day</option>
            <option value="ABSENT">Absent</option>
            <option value="LEAVE">Leave</option>
          </select>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">
          No attendance logs recorded for this view.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Work Hours</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((rec) => (
                <tr key={rec._id || rec.date} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{rec.date}</td>
                  <td className="py-3 px-4">{formatTime(rec.checkIn)}</td>
                  <td className="py-3 px-4">{formatTime(rec.checkOut)}</td>
                  <td className="py-3 px-4 font-mono">
                    {rec.workHours ? `${rec.workHours} hrs` : '--'}
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(rec.status)}</td>
                  <td className="py-3 px-4 text-xs text-gray-500 truncate max-w-xs">{rec.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
