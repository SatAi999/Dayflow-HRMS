import axios from 'axios';

const API_BASE = '/api/reports';

export const fetchAttendanceReport = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_BASE}/attendance`, { params: filters });
    if (res.data?.success) return res.data.report;
  } catch (e) {
    console.warn('Using report mock fallback data for attendance');
  }

  return {
    summary: {
      totalRecords: 248,
      presentCount: 221,
      absentCount: 10,
      leaveCount: 17,
      attendanceRate: '89.1%',
    },
    records: [
      { id: 'ATT-101', employeeName: 'Sarah Jenkins', empId: 'EMP-001', department: 'Engineering', date: '2026-08-22', checkIn: '08:58 AM', checkOut: '05:02 PM', status: 'Present', hours: '8.0' },
      { id: 'ATT-102', employeeName: 'Michael Chen', empId: 'EMP-002', department: 'Product Design', date: '2026-08-22', checkIn: '09:12 AM', checkOut: '05:15 PM', status: 'Present', hours: '8.0' },
      { id: 'ATT-103', employeeName: 'Emily Watson', empId: 'EMP-003', department: 'Human Resources', date: '2026-08-22', checkIn: '--', checkOut: '--', status: 'On Leave', hours: '0.0' },
      { id: 'ATT-104', employeeName: 'David Rodriguez', empId: 'EMP-004', department: 'Sales', date: '2026-08-22', checkIn: '09:45 AM', checkOut: '05:30 PM', status: 'Late', hours: '7.75' },
      { id: 'ATT-105', employeeName: 'Jessica Taylor', empId: 'EMP-005', department: 'Finance', date: '2026-08-22', checkIn: '--', checkOut: '--', status: 'Absent', hours: '0.0' },
    ],
  };
};

export const fetchLeaveReport = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_BASE}/leave`, { params: filters });
    if (res.data?.success) return res.data.report;
  } catch (e) {
    console.warn('Using report mock fallback data for leave');
  }

  return {
    summary: {
      totalRequests: 32,
      approvedCount: 22,
      pendingCount: 7,
      rejectedCount: 3,
    },
    records: [
      { id: 'LV-201', employeeName: 'Sarah Jenkins', empId: 'EMP-001', department: 'Engineering', leaveType: 'Sick Leave', startDate: '2026-08-24', endDate: '2026-08-25', days: 2, status: 'PENDING' },
      { id: 'LV-202', employeeName: 'Robert Martinez', empId: 'EMP-008', department: 'Marketing', leaveType: 'Casual Leave', startDate: '2026-08-20', endDate: '2026-08-20', days: 1, status: 'APPROVED' },
      { id: 'LV-203', employeeName: 'Amanda Lopez', empId: 'EMP-012', department: 'Finance', leaveType: 'Maternity Leave', startDate: '2026-09-01', endDate: '2026-11-30', days: 90, status: 'APPROVED' },
      { id: 'LV-204', employeeName: 'Kevin Patel', empId: 'EMP-019', department: 'Engineering', leaveType: 'Paid Leave', startDate: '2026-08-15', endDate: '2026-08-18', days: 4, status: 'REJECTED' },
    ],
  };
};

export const fetchPayrollReport = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_BASE}/payroll`, { params: filters });
    if (res.data?.success) return res.data.report;
  } catch (e) {
    console.warn('Using report mock fallback data for payroll');
  }

  return {
    summary: {
      totalDisbursed: '$1,245,000',
      averageSalary: '$5,020',
      employeeCount: 248,
      payPeriod: 'August 2026',
    },
    records: [
      { id: 'PAY-301', employeeName: 'Sarah Jenkins', empId: 'EMP-001', department: 'Engineering', basicSalary: '$6,500', allowances: '$800', deductions: '$950', netSalary: '$6,350', status: 'Paid' },
      { id: 'PAY-302', employeeName: 'Michael Chen', empId: 'EMP-002', department: 'Product Design', basicSalary: '$5,800', allowances: '$600', deductions: '$820', netSalary: '$5,580', status: 'Paid' },
      { id: 'PAY-303', employeeName: 'Emily Watson', empId: 'EMP-003', department: 'Human Resources', basicSalary: '$5,200', allowances: '$500', deductions: '$700', netSalary: '$5,000', status: 'Paid' },
      { id: 'PAY-304', employeeName: 'David Rodriguez', empId: 'EMP-004', department: 'Sales', basicSalary: '$4,900', allowances: '$1,200', deductions: '$800', netSalary: '$5,300', status: 'Paid' },
    ],
  };
};

export const fetchEmployeeReport = async (filters = {}) => {
  try {
    const res = await axios.get('/api/employees', { params: filters });
    if (res.data?.success) return res.data;
  } catch (e) {
    console.warn('Using report mock fallback data for employees');
  }

  return {
    summary: {
      totalEmployees: 248,
      activeEmployees: 240,
      onBoarding: 5,
      terminated: 3,
    },
    records: [
      { id: 'EMP-001', name: 'Sarah Jenkins', email: 'sarah.j@dayflow.com', department: 'Engineering', designation: 'Lead Frontend Developer', joiningDate: '2023-03-15', status: 'ACTIVE' },
      { id: 'EMP-002', name: 'Michael Chen', email: 'michael.c@dayflow.com', department: 'Product Design', designation: 'Senior Product Designer', joiningDate: '2023-06-01', status: 'ACTIVE' },
      { id: 'EMP-003', name: 'Emily Watson', email: 'emily.w@dayflow.com', department: 'Human Resources', designation: 'HR Business Partner', joiningDate: '2022-11-10', status: 'ACTIVE' },
      { id: 'EMP-004', name: 'David Rodriguez', email: 'david.r@dayflow.com', department: 'Sales', designation: 'Account Executive', joiningDate: '2024-01-20', status: 'ACTIVE' },
    ],
  };
};
