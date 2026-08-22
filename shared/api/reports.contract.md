# Reports API Contract

## GET /api/reports/attendance
- **Description**: Returns consolidated statistics for attendance.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "report": {
    "totalPresent": 45,
    "totalAbsent": 3,
    "totalHalfDays": 2,
    "totalOnLeave": 1,
    "attendanceRate": "90.0%"
  }
}
```

## GET /api/reports/leave
- **Description**: Returns consolidated statistics for leaves.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "report": {
    "pendingRequests": 5,
    "approvedRequests": 18,
    "rejectedRequests": 2
  }
}
```

## GET /api/reports/payroll
- **Description**: Returns corporate-wide salary metrics.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "report": {
    "totalSalaryDisbursed": 250000,
    "averageSalary": 5500,
    "payPeriod": "August 2026"
  }
}
```
