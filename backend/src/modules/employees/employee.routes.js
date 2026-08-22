import express from 'express';
import { getMyProfile, updateMyProfile, getEmployees, getEmployeeDetail, updateEmployeeByAdmin } from './employee.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';
import { validateRequest } from '../../middleware/validation.middleware.js';
import { validateEmployeeUpdate } from './employee.validation.js';

const router = express.Router();

router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth, validateRequest(validateEmployeeUpdate), updateMyProfile);

// Admin / HR Management routes
router.get('/', requireAuth, requireRole('ADMIN', 'HR'), getEmployees);
router.get('/:id', requireAuth, requireRole('ADMIN', 'HR'), getEmployeeDetail);
router.put('/:id', requireAuth, requireRole('ADMIN'), updateEmployeeByAdmin);

export default router;
