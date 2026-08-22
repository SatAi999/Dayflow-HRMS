import * as payrollService from './payroll.service.js';

export const getMyPayroll = async (req, res, next) => {
  try {
    const payroll = await payrollService.getPayrollByUserId(req.user.id);
    if (!payroll) {
      return res.status(404).json({ success: false, message: 'Payroll details not found.', errorCode: 'NOT_FOUND' });
    }
    res.status(200).json({ success: true, payroll });
  } catch (error) {
    next(error);
  }
};

export const getEmployeePayrolls = async (req, res, next) => {
  try {
    const records = await payrollService.getAllPayrolls();
    res.status(200).json({ success: true, records });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeSalary = async (req, res, next) => {
  try {
    const record = await payrollService.updateSalaryStructure(req.params.employeeId, req.body);
    res.status(200).json({
      success: true,
      message: 'Salary structure updated successfully.',
      payroll: record
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};
