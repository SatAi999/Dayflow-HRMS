import React, { useState } from 'react';

export default function AttendanceWeeklyView({ records = [] }) {
  const [weekOffset, setWeekOffset] = useState(0);

  // Calculate dates for current week Monday -> Sunday based on weekOffset
  const getWeekDates = (offset = 0) => {
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday
    // Calculate Monday of current week
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    
    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMonday + offset * 7);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      const year = day.getFullYear();
      const month = String(day.getMonth() + 1).padStart(2, '0');
      const dateStr = String(day.getDate()).padStart(2, '0');
      
      const fullDate = `${year}-${month}-${dateStr}`;
      const dayName = day.toLocaleDateString(undefined, { weekday: 'short' });
      const displayDate = day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

      weekDays.push({ fullDate, dayName, displayDate });
    }
    return weekDays;
  };

  const weekDays = getWeekDates(weekOffset);

  const getRecordForDate = (dateStr) => {
    return records.find((r) => r.date === dateStr);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Weekly Attendance Grid</h3>
          <p className="text-xs text-gray-500">
            Showing week of {weekDays[0]?.displayDate} - {weekDays[6]?.displayDate}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors"
          >
            &larr; Previous Week
          </button>

          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="px-2.5 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold rounded-md transition-colors"
            >
              Current Week
            </button>
          )}

          <button
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors"
          >
            Next Week &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
        {weekDays.map((day) => {
          const record = getRecordForDate(day.fullDate);
          const isToday = new Date().toISOString().split('T')[0] === day.fullDate;

          return (
            <div
              key={day.fullDate}
              className={`p-3 rounded-lg border flex flex-col justify-between space-y-3 transition-all ${
                isToday
                  ? 'border-indigo-500 bg-indigo-50/40 shadow-sm'
                  : 'border-gray-200 bg-gray-50/50 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-500">{day.dayName}</span>
                <span className="text-xs text-gray-400 font-medium">{day.displayDate}</span>
              </div>

              {record ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">In:</span>
                    <span className="font-semibold text-gray-700">{formatTime(record.checkIn)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Out:</span>
                    <span className="font-semibold text-gray-700">{formatTime(record.checkOut)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Hours:</span>
                    <span className="font-mono font-bold text-indigo-600">
                      {record.workHours ? `${record.workHours}h` : '-'}
                    </span>
                  </div>

                  <div className="pt-1">
                    {record.status === 'PRESENT' && (
                      <span className="block text-center py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
                        PRESENT
                      </span>
                    )}
                    {record.status === 'HALF_DAY' && (
                      <span className="block text-center py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                        HALF DAY
                      </span>
                    )}
                    {record.status === 'ABSENT' && (
                      <span className="block text-center py-0.5 text-[10px] font-bold rounded bg-rose-100 text-rose-800">
                        ABSENT
                      </span>
                    )}
                    {record.status === 'LEAVE' && (
                      <span className="block text-center py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-800">
                        LEAVE
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <span className="text-[11px] text-gray-400 block font-medium">No Record</span>
                  <span className="text-[9px] text-gray-300">--:--</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
