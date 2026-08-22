import Attendance from './attendance.model.js';
import Employee from '../employees/employee.model.js';

const getLocalDateString = (dateObj = new Date()) => {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const logCheckIn = async (userId, notes = '') => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const today = getLocalDateString();
  const existing = await Attendance.findOne({ employeeId: employee._id, date: today });
  if (existing) throw new Error('Already checked in for today.');

  const attendance = new Attendance({
    employeeId: employee._id,
    date: today,
    checkIn: new Date(),
    status: 'PRESENT',
    notes
  });

  await attendance.save();
  return attendance;
};

export const logCheckOut = async (userId, notes = '') => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const today = getLocalDateString();
  const attendance = await Attendance.findOne({ employeeId: employee._id, date: today });
  if (!attendance) throw new Error('No check-in record found for today.');
  if (attendance.checkOut) throw new Error('Already checked out for today.');

  const now = new Date();
  attendance.checkOut = now;
  
  // Calculate hours worked
  const diffMs = now - new Date(attendance.checkIn);
  const diffHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
  attendance.workHours = diffHours;

  // Auto-set HALF_DAY if total work hours are under 4 hours
  if (diffHours < 4 && attendance.status === 'PRESENT') {
    attendance.status = 'HALF_DAY';
  }

  if (notes) {
    attendance.notes = attendance.notes ? `${attendance.notes} | ${notes}` : notes;
  }

  await attendance.save();
  return attendance;
};

export const getTodayStatus = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return null;

  const today = getLocalDateString();
  return await Attendance.findOne({ employeeId: employee._id, date: today });
};

export const getAttendanceByUserId = async (userId, query = {}) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return [];

  const filter = { employeeId: employee._id };

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = query.startDate;
    if (query.endDate) filter.date.$lte = query.endDate;
  }

  if (query.status) {
    filter.status = query.status;
  }

  return await Attendance.find(filter).sort({ date: -1 });
};

export const getAllAttendanceRecords = async (query = {}) => {
  const filter = {};

  if (query.date) {
    filter.date = query.date;
  } else if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = query.startDate;
    if (query.endDate) filter.date.$lte = query.endDate;
  }

  if (query.employeeId) {
    filter.employeeId = query.employeeId;
  }

  if (query.status) {
    filter.status = query.status;
  }

  return await Attendance.find(filter)
    .populate('employeeId', 'firstName lastName employeeCode department designation')
    .sort({ date: -1 });
};

export const getAttendanceByEmployeeId = async (employeeId, query = {}) => {
  const filter = { employeeId };

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = query.startDate;
    if (query.endDate) filter.date.$lte = query.endDate;
  }

  if (query.status) {
    filter.status = query.status;
  }

  return await Attendance.find(filter).sort({ date: -1 });
};
