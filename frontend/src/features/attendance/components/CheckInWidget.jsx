import React, { useState, useEffect } from 'react';
import api from '../../../services/api/axios.js';
import { ENDPOINTS } from '../../../services/api/endpoints.js';

export default function CheckInWidget({ todayStatus, onStatusChange }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loadingCheckIn, setLoadingCheckIn] = useState(false);
  const [loadingCheckOut, setLoadingCheckOut] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoadingCheckIn(true);
    try {
      const res = await api.post(ENDPOINTS.ATTENDANCE.CHECK_IN, { notes });
      if (res.data.success) {
        setSuccessMsg('Check-in successful! Have a productive day.');
        setNotes('');
        if (onStatusChange) onStatusChange();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Check-in failed. Please try again.');
    } finally {
      setLoadingCheckIn(false);
    }
  };

  const handleCheckOut = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoadingCheckOut(true);
    try {
      const res = await api.post(ENDPOINTS.ATTENDANCE.CHECK_OUT, { notes });
      if (res.data.success) {
        setSuccessMsg('Check-out successful! Great job today.');
        setNotes('');
        if (onStatusChange) onStatusChange();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Check-out failed. Please try again.');
    } finally {
      setLoadingCheckOut(false);
    }
  };

  const isCheckedIn = !!todayStatus?.checkIn;
  const isCheckedOut = !!todayStatus?.checkOut;

  const formatTimeStr = (dateVal) => {
    if (!dateVal) return '--:--';
    return new Date(dateVal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Daily Attendance Punch</h2>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
          <svg className="w-5 h-5 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xl font-mono font-semibold text-gray-900">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="text-center md:text-left">
          <span className="text-xs uppercase font-semibold text-gray-400 block mb-1">Status Today</span>
          {!isCheckedIn ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Not Checked In
            </span>
          ) : isCheckedOut ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Checked Out
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              Checked In (Active)
            </span>
          )}
        </div>

        <div className="text-center md:text-left">
          <span className="text-xs uppercase font-semibold text-gray-400 block mb-1">Check In Time</span>
          <span className="text-sm font-medium text-gray-800">{formatTimeStr(todayStatus?.checkIn)}</span>
        </div>

        <div className="text-center md:text-left">
          <span className="text-xs uppercase font-semibold text-gray-400 block mb-1">Check Out Time</span>
          <span className="text-sm font-medium text-gray-800">{formatTimeStr(todayStatus?.checkOut)}</span>
        </div>
      </div>

      {!isCheckedOut && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Add optional note (e.g. Working on Attendance feature)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCheckIn}
              disabled={isCheckedIn || loadingCheckIn}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center space-x-2 ${
                isCheckedIn
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-sm'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>{loadingCheckIn ? 'Checking In...' : 'Check In'}</span>
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!isCheckedIn || isCheckedOut || loadingCheckOut}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm text-white transition-colors flex items-center justify-center space-x-2 ${
                !isCheckedIn || isCheckedOut
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-sm'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{loadingCheckOut ? 'Checking Out...' : 'Check Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
