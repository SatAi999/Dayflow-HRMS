import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/environment.js';

/**
 * Ensures user is authenticated via JWT Bearer token.
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
      errorCode: 'UNAUTHORIZED'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, employeeId, email, role }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Invalid or expired token.',
      errorCode: 'INVALID_TOKEN'
    });
  }
};

/**
 * Validates ownership of the resource or checks if requester is an Admin/HR.
 * Expects resource owner's ID to match req.user.id.
 */
export const requireOwnership = (req, res, next) => {
  const resourceEmployeeId = req.params.employeeId || req.params.id;
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Unauthenticated request.',
      errorCode: 'UNAUTHORIZED'
    });
  }

  // Admin and HR bypass individual ownership checks
  if (user.role === 'ADMIN' || user.role === 'HR') {
    return next();
  }

  // Regular employee can only access their own records
  if (user.id === resourceEmployeeId || user.employeeId === resourceEmployeeId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied. You do not own this resource.',
    errorCode: 'FORBIDDEN'
  });
};
