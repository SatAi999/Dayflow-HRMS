export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    VERIFY_EMAIL: '/api/auth/verify-email',
    LOGOUT: '/api/auth/logout'
  },
  EMPLOYEES: {
    ME: '/api/employees/me',
    LIST: '/api/employees',
    DETAIL: (id) => `/api/employees/${id}`
  },
  ATTENDANCE: {
    CHECK_IN: '/api/attendance/check-in',
    CHECK_OUT: '/api/attendance/check-out',
    ME: '/api/attendance/me',
    LIST: '/api/attendance',
    EMPLOYEE: (employeeId) => `/api/attendance/${employeeId}`
  },
  LEAVE: {
    CREATE: '/api/leaves',
    ME: '/api/leaves/me',
    LIST: '/api/leaves',
    APPROVE: (id) => `/api/leaves/${id}/approve`,
    REJECT: (id) => `/api/leaves/${id}/reject`
  },
  PAYROLL: {
    ME: '/api/payroll/me',
    LIST: '/api/payroll',
    UPDATE: (employeeId) => `/api/payroll/${employeeId}`
  },
  DOCUMENTS: {
    ME: '/api/documents/me',
    UPLOAD: '/api/documents',
    DELETE: (id) => `/api/documents/${id}`
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    READ: (id) => `/api/notifications/${id}/read`
  },
  REPORTS: {
    ATTENDANCE: '/api/reports/attendance',
    LEAVE: '/api/reports/leave',
    PAYROLL: '/api/reports/payroll'
  }
};
