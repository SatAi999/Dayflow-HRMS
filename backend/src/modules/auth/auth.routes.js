import express from 'express';
import { signup, login, verifyEmail, logout } from './auth.controller.js';
import { validateRequest } from '../../middleware/validation.middleware.js';
import { validateSignup, validateLogin } from './auth.validation.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', validateRequest(validateSignup), signup);
router.post('/login', validateRequest(validateLogin), login);
router.post('/verify-email', verifyEmail);
router.post('/logout', requireAuth, logout);

export default router;
