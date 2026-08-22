import Payroll from './payroll.model.js';
import Employee from '../employees/employee.model.js';

export const getPayrollByUserId = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return null;
  
  let payroll = await Payroll.findOne({ employeeId: employee._id }).sort({ createdAt: -1 });
  
  if (!payroll) {
    const basicSalary = 4500;
    const allowances = 500;
    const deductions = 300;
    const netSalary = (basicSalary + allowances) - deductions;
    const payPeriod = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    payroll = new Payroll({
      employeeId: employee._id,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      payPeriod
    });
    await payroll.save();
  }
  
  return payroll;
};

export const getAllPayrolls = async () => {
  return await Payroll.find({}).populate('employeeId', 'firstName lastName');
};

export const updateSalaryStructure = async (employeeId, salaryData) => {
  const { basicSalary, allowances = 0, deductions = 0, payPeriod } = salaryData;
  
  if (basicSalary === undefined || basicSalary < 0) {
    throw new Error('Basic salary must be a positive number.');
  }

  const netSalary = (Number(basicSalary) + Number(allowances)) - Number(deductions);
  const currentPeriod = payPeriod || new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  // Update or insert payroll config
  const payroll = await Payroll.findOneAndUpdate(
    { employeeId },
    {
      $set: {
        basicSalary,
        allowances,
        deductions,
        netSalary,
        payPeriod: currentPeriod
      }
    },
    { new: true, upsert: true }
  );

  return payroll;
};
