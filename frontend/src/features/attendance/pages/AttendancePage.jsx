import React, { useState, useEffect } from 'react';
import api from '../../../services/api/axios.js';
import { ENDPOINTS } from '../../../services/api/endpoints.js';
import CheckInWidget from '../components/CheckInWidget.jsx';
import AttendanceStats from '../components/AttendanceStats.jsx';
import AttendanceDailyView from '../components/AttendanceDailyView.jsx';
import AttendanceWeeklyView from '../components/AttendanceWeeklyView.jsx';

export default function AttendancePage() {
  const [todayStatus, setTodayStatus] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly'

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const [todayRes, listRes] = await Promise.all([
        api.get(ENDPOINTS.ATTENDANCE.CHECK_IN ? '/api/attendance/today' : '/api/attendance/today'),
        api.get(ENDPOINTS.ATTENDANCE.ME)
      ]);

      if (todayRes.data.success) {
        setTodayStatus(todayRes.data.attendance);
      }
      if (listRes.data.success) {
        setRecords(listRes.data.records || []);
      }
    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Portal</h1>
        <p className="text-sm text-gray-500">Track daily check-ins, view attendance history, and analyze weekly logs.</p>
      </div>

      <CheckInWidget todayStatus={todayStatus} onStatusChange={fetchAttendanceData} />

      <AttendanceStats records={records} />

      <div className="space-y-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('daily')}
            className={`py-2.5 px-5 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'daily'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`py-2.5 px-5 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === 'weekly'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Weekly View
          </button>
        </div>

        {loading ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500 text-sm animate-pulse">
            Loading attendance records...
          </div>
        ) : activeTab === 'daily' ? (
          <AttendanceDailyView records={records} />
        ) : (
          <AttendanceWeeklyView records={records} />
        )}
      </div>
    </div>
  );
}
