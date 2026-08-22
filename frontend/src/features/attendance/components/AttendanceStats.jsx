import React from 'react';

export default function AttendanceStats({ records = [] }) {
  const totalDays = records.length;
  const presentDays = records.filter(r => r.status === 'PRESENT').length;
  const halfDays = records.filter(r => r.status === 'HALF_DAY').length;
  const leaves = records.filter(r => r.status === 'LEAVE').length;
  const absent = records.filter(r => r.status === 'ABSENT').length;

  const totalHours = records.reduce((acc, r) => acc + (r.workHours || 0), 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
        <span className="text-xs font-semibold uppercase text-gray-400">Present</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-emerald-600">{presentDays}</span>
          <span className="text-xs text-gray-500">Days</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
        <span className="text-xs font-semibold uppercase text-gray-400">Half Days</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-amber-600">{halfDays}</span>
          <span className="text-xs text-gray-500">Days</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
        <span className="text-xs font-semibold uppercase text-gray-400">Leaves / Absent</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-rose-600">{leaves + absent}</span>
          <span className="text-xs text-gray-500">Days</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-1">
        <span className="text-xs font-semibold uppercase text-gray-400">Total Work Hours</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-indigo-600">{totalHours.toFixed(1)}</span>
          <span className="text-xs text-gray-500">Hours</span>
        </div>
      </div>
    </div>
  );
}
