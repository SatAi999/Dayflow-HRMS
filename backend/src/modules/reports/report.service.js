import User from '../auth/auth.model.js';
import Employee from '../employees/employee.model.js';
import Attendance from '../attendance/attendance.model.js';
import LeaveRequest from '../leave/leave.model.js';
import Payroll from '../payroll/payroll.model.js';

/**
 * Generates dynamic executive dashboard KPIs and workforce breakdowns.
 */
export const generateAdminDashboardSummary = async () => {
  const today = new Date().toISOString().split('T')[0];

  // Headcount Stats
  const totalEmployees = await Employee.countDocuments({ status: 'ACTIVE' });

  // Today Attendance Stats
  const presentToday = await Attendance.countDocuments({ date: today, status: 'PRESENT' });
  const onLeave = await Attendance.countDocuments({ date: today, status: 'LEAVE' });
  const absentToday = Math.max(0, totalEmployees - presentToday - onLeave);
  const attendanceRate = totalEmployees > 0 
    ? `${Math.round((presentToday / totalEmployees) * 100)}%` 
    : '0%';

  // Pending Leave Requests
  const pendingLeaveRequests = await LeaveRequest.countDocuments({ status: 'PENDING' });

  // Disbursed Payroll Summary
  const payrollAggregate = await Payroll.aggregate([
    { $group: { _id: null, total: { $sum: '$netSalary' } } }
  ]);
  const monthlyPayrollTotalVal = payrollAggregate[0]?.total || 0;
  const monthlyPayrollTotal = `$${monthlyPayrollTotalVal.toLocaleString()}`;

  // Department distribution headcount
  const departmentAggregate = await Employee.aggregate([
    { $match: { status: 'ACTIVE' } },
    { $group: { _id: '$department', count: { $sum: 1 } } }
  ]);

  const departmentDistribution = departmentAggregate.map(dept => ({
    department: dept._id || 'Operations',
    count: dept.count,
    percentage: totalEmployees > 0 ? Math.round((dept.count / totalEmployees) * 100) : 0
  }));

  // Default distribution if db is thin
  if (departmentDistribution.length === 0) {
    departmentDistribution.push({ department: 'Operations', count: 0, percentage: 0 });
  }

  // Recent leave requests and status logs
  const recentLeaves = await LeaveRequest.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .populate('employeeId', 'firstName lastName');

  const recentActivity = recentLeaves.map((leave, idx) => ({
    id: leave._id,
    type: 'leave',
    title: `${leave.leaveType} Request`,
    desc: `${leave.employeeId?.firstName || 'Employee'} ${leave.employeeId?.lastName || 'User'} requested leave (${leave.status})`,
    time: new Date(leave.createdAt).toLocaleDateString(),
    status: leave.status === 'PENDING' ? 'pending' : leave.status === 'APPROVED' ? 'success' : 'warning'
  }));

  // Fallback default activity logs if empty
  if (recentActivity.length === 0) {
    recentActivity.push({
      id: 'default-activity',
      type: 'info',
      title: 'Portal Ready',
      desc: 'System connected and initialized. Awaiting new check-ins.',
      time: 'Just now',
      status: 'info'
    });
  }

  return {
    kpis: {
      totalEmployees,
      totalEmployeesTrend: '+1 this month',
      presentToday,
      attendanceRate,
      onLeave,
      absentToday,
      pendingLeaveRequests,
      monthlyPayrollTotal
    },
    attendanceBreakdown: [
      { status: 'Present', count: presentToday, color: 'bg-emerald-500', percentage: totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0 },
      { status: 'On Leave', count: onLeave, color: 'bg-amber-500', percentage: totalEmployees > 0 ? Math.round((onLeave / totalEmployees) * 100) : 0 },
      { status: 'Absent', count: absentToday, color: 'bg-red-500', percentage: totalEmployees > 0 ? Math.round((absentToday / totalEmployees) * 100) : 0 }
    ],
    attendanceTrend: [
      { day: 'Mon', present: presentToday, absent: absentToday },
      { day: 'Tue', present: presentToday, absent: absentToday },
      { day: 'Wed', present: presentToday, absent: absentToday },
      { day: 'Thu', present: presentToday, absent: absentToday },
      { day: 'Fri', present: presentToday, absent: absentToday }
    ],
    departmentDistribution,
    recentActivity
  };
};

/**
 * Generates dynamic employee portal statistics and check-in greeting data.
 */
export const generateEmployeeDashboardSummary = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const employee = await Employee.findOne({ userId });

  if (!employee) {
    throw new Error('Employee profile not found.');
  }

  // Live Attendance Status
  const attendance = await Attendance.findOne({ employeeId: employee._id, date: today });
  const todayStatus = {
    status: attendance?.status || 'Absent',
    checkInTime: attendance?.checkIn || '--:--',
    checkOutTime: attendance?.checkOut || '--:--',
    workingHours: attendance?.workHours ? `${attendance.workHours}h active` : '--'
  };

  // Leave Balances
  const approvedLeaves = await LeaveRequest.find({ employeeId: employee._id, status: 'APPROVED' });
  const calculateDays = (start, end) => {
    const diff = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const paidTaken = approvedLeaves
    .filter(l => l.leaveType === 'PAID')
    .reduce((acc, curr) => acc + calculateDays(curr.startDate, curr.endDate), 0);

  const sickTaken = approvedLeaves
    .filter(l => l.leaveType === 'SICK')
    .reduce((acc, curr) => acc + calculateDays(curr.startDate, curr.endDate), 0);

  const leaveBalance = {
    casualLeaveRemaining: Math.max(0, 10 - paidTaken),
    sickLeaveRemaining: Math.max(0, 8 - sickTaken),
    paidLeaveRemaining: Math.max(0, 12 - paidTaken),
    totalRemaining: Math.max(0, (10 + 8 + 12) - (paidTaken + sickTaken))
  };

  // Salary statement summaries
  const payroll = await Payroll.findOne({ employeeId: employee._id }).sort({ createdAt: -1 });
  const payrollSummary = {
    lastDisbursedSalary: payroll ? `$${payroll.netSalary.toLocaleString()}` : '$0.00',
    lastPayDate: payroll?.payPeriod || 'N/A',
    status: payroll ? 'Processed' : 'N/A'
  };

  // Recent leave requests submitted
  const recentLeaves = await LeaveRequest.find({ employeeId: employee._id })
    .sort({ createdAt: -1 })
    .limit(5);

  const recentRequests = recentLeaves.map(leave => ({
    id: leave._id,
    type: leave.leaveType,
    dates: `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}`,
    duration: `${calculateDays(leave.startDate, leave.endDate)} Days`,
    status: leave.status
  }));

  return {
    greetingName: `${employee.firstName} ${employee.lastName}`,
    designation: employee.designation,
    department: employee.department,
    todayStatus,
    leaveBalance,
    payrollSummary,
    recentRequests
  };
};

/**
 * Returns dynamic analytical reports metrics.
 */
export const generateAttendanceSummary = async () => {
  const totalRecords = await Attendance.countDocuments();
  const presentCount = await Attendance.countDocuments({ status: 'PRESENT' });
  const leaveCount = await Attendance.countDocuments({ status: 'LEAVE' });
  const absentCount = await Attendance.countDocuments({ status: 'ABSENT' });

  const total = presentCount + leaveCount + absentCount;
  const attendanceRate = total > 0 ? `${Math.round((presentCount / total) * 100)}%` : '0%';

  const logs = await Attendance.find()
    .sort({ date: -1 })
    .limit(20)
    .populate({
      path: 'employeeId',
      select: 'firstName lastName department designation'
    });

  const records = logs.map((log) => ({
    id: log._id,
    employeeName: log.employeeId ? `${log.employeeId.firstName} ${log.employeeId.lastName}` : 'System User',
    empId: log.employeeId?._id || 'N/A',
    department: log.employeeId?.department || 'Operations',
    date: log.date,
    checkIn: log.checkIn || '--',
    checkOut: log.checkOut || '--',
    status: log.status,
    hours: log.workHours || '0.0'
  }));

  return {
    summary: {
      totalRecords,
      presentCount,
      absentCount,
      leaveCount,
      attendanceRate
    },
    records
  };
};

export const generateLeaveSummary = async () => {
  const totalRequests = await LeaveRequest.countDocuments();
  const approvedCount = await LeaveRequest.countDocuments({ status: 'APPROVED' });
  const pendingCount = await LeaveRequest.countDocuments({ status: 'PENDING' });
  const rejectedCount = await LeaveRequest.countDocuments({ status: 'REJECTED' });

  const logs = await LeaveRequest.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .populate('employeeId', 'firstName lastName department');

  const calculateDays = (start, end) => {
    const diff = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const records = logs.map((log) => ({
    id: log._id,
    employeeName: log.employeeId ? `${log.employeeId.firstName} ${log.employeeId.lastName}` : 'System User',
    empId: log.employeeId?._id || 'N/A',
    department: log.employeeId?.department || 'Operations',
    leaveType: log.leaveType,
    startDate: new Date(log.startDate).toLocaleDateString(),
    endDate: new Date(log.endDate).toLocaleDateString(),
    days: calculateDays(log.startDate, log.endDate),
    status: log.status
  }));

  return {
    summary: {
      totalRequests,
      approvedCount,
      pendingCount,
      rejectedCount
    },
    records
  };
};

export const generatePayrollSummary = async () => {
  const payrolls = await Payroll.find()
    .populate('employeeId', 'firstName lastName department designation');

  const totalEmployees = payrolls.length;
  const totalSalaryVal = payrolls.reduce((acc, curr) => acc + curr.netSalary, 0);
  const totalDisbursed = `$${totalSalaryVal.toLocaleString()}`;

  const records = payrolls.map((log) => ({
    id: log._id,
    employeeName: log.employeeId ? `${log.employeeId.firstName} ${log.employeeId.lastName}` : 'System User',
    empId: log.employeeId?._id || 'N/A',
    department: log.employeeId?.department || 'Operations',
    basicSalary: `$${log.basicSalary.toLocaleString()}`,
    allowances: `$${log.allowances.toLocaleString()}`,
    deductions: `$${log.deductions.toLocaleString()}`,
    netSalary: `$${log.netSalary.toLocaleString()}`,
    payPeriod: log.payPeriod
  }));

  return {
    summary: {
      totalEmployees,
      totalDisbursed,
      payPeriod: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
    },
    records
  };
};
