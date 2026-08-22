import express from 'express';
import { checkIn, checkOut, getMyAttendance, getAttendanceList, getEmployeeAttendance } from './attendance.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';

const router = express.Router();

router.post('/check-in', requireAuth, checkIn);
router.post('/check-out', requireAuth, checkOut);
router.get('/me', requireAuth, getMyAttendance);

// HR and Admin view options
router.get('/', requireAuth, requireRole('ADMIN', 'HR'), getAttendanceList);
router.get('/:employeeId', requireAuth, requireRole('ADMIN', 'HR'), getEmployeeAttendance);

export default router;
