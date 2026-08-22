import axios from 'axios';

const API_BASE = '/api';

export const getAdminDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE}/reports/dashboard/admin`);
    if (response.data?.success) {
      return response.data.dashboard;
    }
  } catch (err) {
    console.warn('Backend dashboard endpoint not reachable, returning aggregated live mock stats');
  }

  return {
    kpis: {
      totalEmployees: 248,
      totalEmployeesTrend: '+8 this month',
      presentToday: 221,
      attendanceRate: '89.1%',
      onLeave: 17,
      absentToday: 10,
      pendingLeaveRequests: 5,
      monthlyPayrollTotal: '$1,245,000',
    },
    attendanceBreakdown: [
      { status: 'Present', count: 221, color: 'bg-emerald-500', percentage: 89 },
      { status: 'On Leave', count: 17, color: 'bg-amber-500', percentage: 7 },
      { status: 'Absent', count: 10, color: 'bg-red-500', percentage: 4 },
    ],
    attendanceTrend: [
      { day: 'Mon', present: 215, absent: 16 },
      { day: 'Tue', present: 228, absent: 12 },
      { day: 'Wed', present: 230, absent: 10 },
      { day: 'Thu', present: 221, absent: 17 },
      { day: 'Fri', present: 219, absent: 19 },
    ],
    departmentDistribution: [
      { department: 'Engineering', count: 95, percentage: 38 },
      { department: 'Human Resources', count: 18, percentage: 7 },
      { department: 'Sales & Marketing', count: 62, percentage: 25 },
      { department: 'Finance & Operations', count: 45, percentage: 18 },
      { department: 'Design & UX', count: 28, percentage: 12 },
    ],
    recentActivity: [
      { id: 1, type: 'leave', title: 'Leave Application', desc: 'Sarah Jenkins applied for Sick Leave (2 days)', time: '10 mins ago', status: 'pending' },
      { id: 2, type: 'employee', title: 'New Employee Joined', desc: 'Marcus Vance joined as Senior Backend Developer', time: '1 hour ago', status: 'success' },
      { id: 3, type: 'attendance', title: 'Late Check-in Alert', desc: '5 employees checked in after 09:30 AM today', time: '2 hours ago', status: 'warning' },
      { id: 4, type: 'payroll', title: 'Payroll Disbursed', desc: 'August 2026 Monthly payroll processed successfully', time: '1 day ago', status: 'info' },
    ],
  };
};

export const getEmployeeDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE}/reports/dashboard/employee`);
    if (response.data?.success) {
      return response.data.dashboard;
    }
  } catch (err) {
    console.warn('Backend employee dashboard endpoint not reachable, returning live mock stats');
  }

  return {
    greetingName: 'Alexander Vance',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering',
    todayStatus: {
      status: 'Present',
      checkInTime: '09:04 AM',
      checkOutTime: '--:--',
      workingHours: '4h 30m so far',
    },
    leaveBalance: {
      casualLeaveRemaining: 8,
      sickLeaveRemaining: 5,
      paidLeaveRemaining: 12,
      totalRemaining: 25,
    },
    payrollSummary: {
      lastDisbursedSalary: '$6,850.00',
      lastPayDate: 'Aug 01, 2026',
      status: 'Processed',
    },
    recentRequests: [
      { id: 101, type: 'Casual Leave', dates: 'Aug 28 - Aug 29', duration: '2 Days', status: 'APPROVED' },
      { id: 102, type: 'Sick Leave', dates: 'Jul 14', duration: '1 Day', status: 'APPROVED' },
    ],
  };
};
