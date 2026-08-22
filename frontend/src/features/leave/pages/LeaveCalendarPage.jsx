import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext.jsx';
import { ENDPOINTS } from '../../../services/api/endpoints.js';
import Spinner from '../../../components/ui/Spinner.jsx';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function LeaveCalendarPage() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Date controls
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      // If admin/HR, fetch all leaves; if employee, fetch only their own leaves
      const isAdmin = user?.role === 'ADMIN' || user?.role === 'HR';
      const url = isAdmin ? ENDPOINTS.LEAVE.LIST : ENDPOINTS.LEAVE.ME;
      
      const response = await axios.get(url);
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (err) {
      setError('Failed to fetch leave events for the calendar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLeaves();
    }
  }, [user]);

  // Calendar Math helper functions
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDayLeaves = (day) => {
    const currentDayDate = new Date(year, month, day);
    currentDayDate.setHours(0, 0, 0, 0);

    return leaves.filter(leave => {
      if (leave.status !== 'APPROVED') return false;
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return currentDayDate >= start && currentDayDate <= end;
    });
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" label="Loading leave schedule calendar..." />
      </div>
    );
  }

  // Create grid cells
  const calendarCells = [];
  // Empty cells for padding
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="bg-gray-50/50 min-h-[100px] border border-gray-150" />);
  }
  // Days cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayLeaves = getDayLeaves(day);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

    calendarCells.push(
      <div
        key={`day-${day}`}
        className={`min-h-[100px] p-2 border border-gray-200 bg-white flex flex-col justify-between transition hover:bg-blue-50/30 ${
          isToday ? 'bg-blue-50/50 ring-1 ring-blue-500/30' : ''
        }`}
      >
        <span className={`text-xs font-extrabold self-end ${
          isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700'
        }`}>
          {day}
        </span>
        <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
          {dayLeaves.map((leave, idx) => (
            <div
              key={idx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded truncate shadow-xs ${
                leave.leaveType === 'SICK' 
                  ? 'bg-red-100 text-red-800 border-l-2 border-red-500' 
                  : leave.leaveType === 'PAID'
                  ? 'bg-blue-100 text-blue-800 border-l-2 border-blue-500'
                  : 'bg-yellow-100 text-yellow-800 border-l-2 border-yellow-500'
              }`}
              title={`${leave.employeeId?.firstName || 'Employee'} - ${leave.leaveType}`}
            >
              {user?.role === 'ADMIN' || user?.role === 'HR' 
                ? `${leave.employeeId?.firstName || 'User'} (${leave.leaveType[0]})`
                : leave.leaveType
              }
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Leave Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'ADMIN' || user?.role === 'HR'
              ? 'Workforce absence schedules and coverage map.'
              : 'Track my approved leaves and time-off balance.'
            }
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-bold text-gray-700 transition"
          >
            &larr; Prev
          </button>
          <button
            onClick={handleToday}
            className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-extrabold transition"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-bold text-gray-700 transition"
          >
            Next &rarr;
          </button>
        </div>
      </div>

      {error && (
        <div className="text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3.5 rounded-r">
          {error}
        </div>
      )}

      {/* Month Label */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className="text-center font-extrabold text-lg text-gray-800 mb-4">
          {MONTHS[month]} {year}
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-px text-center mb-1 font-bold text-xs text-gray-500 uppercase tracking-wider">
          {WEEKDAYS.map(day => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        {/* Monthly Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-250">
          {calendarCells}
        </div>
      </div>
    </div>
  );
}
