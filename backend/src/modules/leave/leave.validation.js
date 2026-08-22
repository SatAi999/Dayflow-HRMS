/**
 * Validates leave request parameters.
 */
export const validateLeaveRequest = (data) => {
  const errors = [];

  if (!data.leaveType || !['PAID', 'SICK', 'UNPAID'].includes(data.leaveType)) {
    errors.push('A valid leave type (PAID, SICK, UNPAID) is required.');
  }

  if (!data.startDate || isNaN(Date.parse(data.startDate))) {
    errors.push('A valid start date is required.');
  }

  if (!data.endDate || isNaN(Date.parse(data.endDate))) {
    errors.push('A valid end date is required.');
  }

  if (!data.remarks || typeof data.remarks !== 'string') {
    errors.push('Remarks reasons are required.');
  }

  if (errors.length > 0) {
    return { error: new Error(errors.join(' ')), value: data };
  }

  return { error: null, value: data };
};
