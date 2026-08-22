import * as attendanceService from './attendance.service.js';

export const checkIn = async (req, res, next) => {
  try {
    const { notes } = req.body || {};
    const record = await attendanceService.logCheckIn(req.user.id, notes);
    res.status(201).json({ success: true, attendance: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};

export const checkOut = async (req, res, next) => {
  try {
    const { notes } = req.body || {};
    const record = await attendanceService.logCheckOut(req.user.id, notes);
    res.status(200).json({ success: true, attendance: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};

export const getTodayStatus = async (req, res, next) => {
  try {
    const record = await attendanceService.getTodayStatus(req.user.id);
    res.status(200).json({ success: true, attendance: record });
  } catch (error) {
    next(error);
  }
};

export const getMyAttendance = async (req, res, next) => {
  try {
    const records = await attendanceService.getAttendanceByUserId(req.user.id, req.query);
    res.status(200).json({ success: true, records });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceList = async (req, res, next) => {
  try {
    const records = await attendanceService.getAllAttendanceRecords(req.query);
    res.status(200).json({ success: true, records });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeAttendance = async (req, res, next) => {
  try {
    const records = await attendanceService.getAttendanceByEmployeeId(req.params.employeeId, req.query);
    res.status(200).json({ success: true, records });
  } catch (error) {
    next(error);
  }
};
