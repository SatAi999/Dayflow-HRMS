/**
 * Validates signup request details.
 */
export const validateSignup = (data) => {
  const errors = [];

  if (!data.employeeId || typeof data.employeeId !== 'string') {
    errors.push('employeeId is required and must be a string.');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('A valid email address is required.');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  if (errors.length > 0) {
    return { error: new Error(errors.join(' ')), value: data };
  }

  return { error: null, value: data };
};

/**
 * Validates login request details.
 */
export const validateLogin = (data) => {
  const errors = [];

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('A valid email address is required.');
  }

  if (!data.password) {
    errors.push('Password is required.');
  }

  if (errors.length > 0) {
    return { error: new Error(errors.join(' ')), value: data };
  }

  return { error: null, value: data };
};
