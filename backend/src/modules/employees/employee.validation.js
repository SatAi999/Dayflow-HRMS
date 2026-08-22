/**
 * Validates updates to employee details.
 */
export const validateEmployeeUpdate = (data) => {
  const errors = [];

  if (data.phone && typeof data.phone !== 'string') {
    errors.push('Phone must be a string.');
  }

  if (data.address && typeof data.address !== 'string') {
    errors.push('Address must be a string.');
  }

  if (errors.length > 0) {
    return { error: new Error(errors.join(' ')), value: data };
  }

  return { error: null, value: data };
};
