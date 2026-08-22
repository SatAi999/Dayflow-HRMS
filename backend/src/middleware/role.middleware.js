/**
 * Restricts access to specific user roles.
 * @param {...string} allowedRoles Roles that are permitted to access this route.
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Unauthenticated request.',
        errorCode: 'UNAUTHORIZED'
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permissions for this action.',
        errorCode: 'FORBIDDEN'
      });
    }

    next();
  };
};
