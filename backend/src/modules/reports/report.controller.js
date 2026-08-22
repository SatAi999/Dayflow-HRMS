import * as reportService from './report.service.js';

export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const dashboard = await reportService.generateAdminDashboardSummary();
    res.status(200).json({ success: true, dashboard });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeDashboardStats = async (req, res, next) => {
  try {
    const dashboard = await reportService.generateEmployeeDashboardSummary(req.user?.id);
    res.status(200).json({ success: true, dashboard });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceReport = async (req, res, next) => {
  try {
    const report = await reportService.generateAttendanceSummary();
    res.status(200).json({ success: true, report });
  } catch (error) {
    next(error);
  }
};

export const getLeaveReport = async (req, res, next) => {
  try {
    const report = await reportService.generateLeaveSummary();
    res.status(200).json({ success: true, report });
  } catch (error) {
    next(error);
  }
};

export const getPayrollReport = async (req, res, next) => {
  try {
    const report = await reportService.generatePayrollSummary();
    res.status(200).json({ success: true, report });
  } catch (error) {
    next(error);
  }
};
