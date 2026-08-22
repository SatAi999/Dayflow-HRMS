/**
 * Validates updates to salary configurations.
 */
export const validateSalaryUpdate = (data) => {
  const errors = [];

  if (data.basicSalary !== undefined && (typeof data.basicSalary !== 'number' || data.basicSalary < 0)) {
    errors.push('basicSalary must be a positive number.');
  }

  if (data.allowances !== undefined && (typeof data.allowances !== 'number' || data.allowances < 0)) {
    errors.push('allowances must be a positive number.');
  }

  if (data.deductions !== undefined && (typeof data.deductions !== 'number' || data.deductions < 0)) {
    errors.push('deductions must be a positive number.');
  }

  if (errors.length > 0) {
    return { error: new Error(errors.join(' ')), value: data };
  }

  return { error: null, value: data };
};
