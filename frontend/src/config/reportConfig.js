export const REPORT_TYPES = [
  {
    id: 'attendance',
    title: 'Attendance Report',
    description: 'Detailed analysis of daily employee attendance, working hours, check-ins, check-outs, and absence rates.',
    route: '/admin/reports/attendance',
    roles: ['ADMIN', 'HR'],
    iconColor: 'bg-blue-500',
  },
  {
    id: 'leave',
    title: 'Leave Report',
    description: 'Overview of employee leave applications, approvals, pending balances, and category distributions.',
    route: '/admin/reports/leave',
    roles: ['ADMIN', 'HR'],
    iconColor: 'bg-emerald-500',
  },
  {
    id: 'payroll',
    title: 'Payroll Summary Report',
    description: 'Financial report summarizing basic salaries, allowances, tax deductions, and net payouts across departments.',
    route: '/admin/reports/payroll',
    roles: ['ADMIN', 'HR'],
    iconColor: 'bg-purple-500',
  },
  {
    id: 'employee',
    title: 'Employee Directory Report',
    description: 'Comprehensive headcount report breakdown by department, designation, employment status, and join date.',
    route: '/admin/reports/employees',
    roles: ['ADMIN', 'HR'],
    iconColor: 'bg-amber-500',
  },
];
