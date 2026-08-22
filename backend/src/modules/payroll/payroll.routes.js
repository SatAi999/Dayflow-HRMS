import express from 'express';
import { getMyPayroll, getEmployeePayrolls, updateEmployeeSalary } from './payroll.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';

const router = express.Router();

router.get('/me', requireAuth, getMyPayroll);

// Administrative access only
router.get('/', requireAuth, requireRole('ADMIN'), getEmployeePayrolls);
router.put('/:employeeId', requireAuth, requireRole('ADMIN'), updateEmployeeSalary);

export default router;
