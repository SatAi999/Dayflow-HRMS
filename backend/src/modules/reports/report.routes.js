import express from 'express';
import {
  getAttendanceReport,
  getLeaveReport,
  getPayrollReport,
  getAdminDashboardStats,
  getEmployeeDashboardStats,
} from './report.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';

const router = express.Router();

router.get('/dashboard/admin', requireAuth, requireRole('ADMIN', 'HR'), getAdminDashboardStats);
router.get('/dashboard/employee', requireAuth, getEmployeeDashboardStats);
router.get('/attendance', requireAuth, requireRole('ADMIN', 'HR'), getAttendanceReport);
router.get('/leave', requireAuth, requireRole('ADMIN', 'HR'), getLeaveReport);
router.get('/payroll', requireAuth, requireRole('ADMIN', 'HR'), getPayrollReport);

export default router;
