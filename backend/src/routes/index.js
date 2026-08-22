import express from 'express';
import authRouter from '../modules/auth/auth.routes.js';
import employeeRouter from '../modules/employees/employee.routes.js';
import attendanceRouter from '../modules/attendance/attendance.routes.js';
import leaveRouter from '../modules/leave/leave.routes.js';
import payrollRouter from '../modules/payroll/payroll.routes.js';
import documentRouter from '../modules/documents/document.routes.js';
import notificationRouter from '../modules/notifications/notification.routes.js';
import reportRouter from '../modules/reports/report.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/employees', employeeRouter);
router.use('/attendance', attendanceRouter);
router.use('/leaves', leaveRouter);
router.use('/payroll', payrollRouter);
router.use('/documents', documentRouter);
router.use('/notifications', notificationRouter);
router.use('/reports', reportRouter);

export default router;
