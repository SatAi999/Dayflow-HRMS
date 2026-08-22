import express from 'express';
import { getMyDocs, uploadDoc, deleteDoc } from './document.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', requireAuth, getMyDocs);
router.post('/', requireAuth, uploadDoc);
router.delete('/:id', requireAuth, deleteDoc);

export default router;
