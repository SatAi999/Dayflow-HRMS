import express from 'express';
import { applyLeave, getMyLeaves, getAllLeaves, approveLeave, rejectLeave } from './leave.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';

const router = express.Router();

router.post('/', requireAuth, applyLeave);
router.get('/me', requireAuth, getMyLeaves);

// Reviewer routes
router.get('/', requireAuth, requireRole('ADMIN', 'HR'), getAllLeaves);
router.put('/:id/approve', requireAuth, requireRole('ADMIN', 'HR'), approveLeave);
router.put('/:id/reject', requireAuth, requireRole('ADMIN', 'HR'), rejectLeave);

export default router;
