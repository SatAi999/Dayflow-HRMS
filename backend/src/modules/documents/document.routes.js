import express from 'express';
import { getMyDocs, uploadDoc, deleteDoc, getAllDocs } from './document.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireRole } from '../../middleware/role.middleware.js';

const router = express.Router();

router.get('/me', requireAuth, getMyDocs);
router.post('/', requireAuth, uploadDoc);
router.delete('/:id', requireAuth, deleteDoc);

// Administrative access only
router.get('/', requireAuth, requireRole('ADMIN', 'HR'), getAllDocs);

export default router;
