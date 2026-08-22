/**
 * Validates attendance parameters (if needed during manual logging).
 */
export const validateAttendanceLog = (data) => {
  const errors = [];

  if (data.status && !['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE'].includes(data.status)) {
    errors.push('Invalid attendance status.');
  }

  if (errors.length > 0) {
    return { error: new Error(errors.join(' ')), value: data };
  }

  return { error: null, value: data };
};
