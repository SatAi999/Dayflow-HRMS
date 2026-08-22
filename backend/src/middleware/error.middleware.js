import { NODE_ENV } from '../config/environment.js';

const errorHandler = (err, req, res, next) => {
  console.error(`[Express Error Handler] Error: ${err.message}`, err.stack);

  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred.',
    errorCode,
    stack: NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
