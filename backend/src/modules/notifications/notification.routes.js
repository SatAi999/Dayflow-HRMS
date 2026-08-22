import express from 'express';
import { getMyNotifications, readNotification } from './notification.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', requireAuth, getMyNotifications);
router.put('/:id/read', requireAuth, readNotification);

export default router;
