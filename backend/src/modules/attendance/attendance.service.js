import Attendance from './attendance.model.js';
import Employee from '../employees/employee.model.js';

const getLocalDateString = () => {
  return new Date().toISOString().split('T')[0];
};

export const logCheckIn = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const today = getLocalDateString();
  const existing = await Attendance.findOne({ employeeId: employee._id, date: today });
  if (existing) throw new Error('Already checked in for today.');

  const attendance = new Attendance({
    employeeId: employee._id,
    date: today,
    checkIn: new Date(),
    status: 'PRESENT'
  });

  await attendance.save();
  return attendance;
};

export const logCheckOut = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const today = getLocalDateString();
  const attendance = await Attendance.findOne({ employeeId: employee._id, date: today });
  if (!attendance) throw new Error('No check-in record found for today.');
  if (attendance.checkOut) throw new Error('Already checked out for today.');

  attendance.checkOut = new Date();
  await attendance.save();
  return attendance;
};

export const getAttendanceByUserId = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return [];
  return await Attendance.find({ employeeId: employee._id }).sort({ date: -1 });
};

export const getAllAttendanceRecords = async () => {
  return await Attendance.find({}).populate('employeeId', 'firstName lastName').sort({ date: -1 });
};

export const getAttendanceByEmployeeId = async (employeeId) => {
  return await Attendance.find({ employeeId }).sort({ date: -1 });
};
