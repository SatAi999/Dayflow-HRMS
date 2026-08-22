import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    basicSalary: {
      type: Number,
      required: true
    },
    allowances: {
      type: Number,
      default: 0
    },
    deductions: {
      type: Number,
      default: 0
    },
    netSalary: {
      type: Number,
      required: true
    },
    payPeriod: {
      type: String, // E.g. "August 2026"
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Payroll = mongoose.model('Payroll', payrollSchema);
export default Payroll;
