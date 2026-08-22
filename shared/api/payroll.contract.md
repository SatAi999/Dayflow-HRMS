# Payroll API Contract

## GET /api/payroll/me
- **Description**: Returns employee salary details. (Read-only for employee)
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "payroll": {
    "basicSalary": 5000,
    "allowances": 1200,
    "deductions": 450,
    "netSalary": 5750,
    "payPeriod": "August 2026"
  }
}
```

## GET /api/payroll
- **Description**: Returns salary info of all employees.
- **Headers**: `Authorization: Bearer <token>` (Admin Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "employeeId": "EMP1001",
      "employeeName": "John Doe",
      "basicSalary": 5000,
      "netSalary": 5750,
      "payPeriod": "August 2026"
    }
  ]
}
```

## PUT /api/payroll/:employeeId
- **Description**: Updates salary structure for a specific employee.
- **Headers**: `Authorization: Bearer <token>` (Admin Only)
- **Request Body**:
```json
{
  "basicSalary": 5500,
  "allowances": 1400,
  "deductions": 500
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Salary structure updated successfully."
}
```
