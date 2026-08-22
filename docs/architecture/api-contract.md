# API Contract - Dayflow HRMS

This document lists all API endpoints, parameters, request body schemas, and expected responses for the Dayflow HRMS REST API.

---

## 1. Authentication Endpoints

### 1.1 Sign Up
- **Endpoint**: `POST /api/auth/signup`
- **Authentication**: None
- **Request Body**:
```json
{
  "employeeId": "EMP1001",
  "email": "user@dayflow.com",
  "password": "SecurePassword123!",
  "role": "EMPLOYEE"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "employeeId": "EMP1001",
    "email": "user@dayflow.com",
    "role": "EMPLOYEE",
    "isVerified": false
  }
}
```

### 1.2 Sign In
- **Endpoint**: `POST /api/auth/login`
- **Authentication**: None
- **Request Body**:
```json
{
  "email": "user@dayflow.com",
  "password": "SecurePassword123!"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "employeeId": "EMP1001",
    "email": "user@dayflow.com",
    "role": "EMPLOYEE"
  }
}
```

### 1.3 Verify Email
- **Endpoint**: `POST /api/auth/verify-email`
- **Authentication**: None
- **Request Body**:
```json
{
  "email": "user@dayflow.com",
  "token": "verification-token-string"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Email verified successfully."
}
```

### 1.4 Log Out
- **Endpoint**: `POST /api/auth/logout`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## 2. Employee Endpoints

### 2.1 Get Current Employee Profile
- **Endpoint**: `GET /api/employees/me`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "profile": {
    "id": "60d0fe4f5311236168a109cb",
    "employeeId": "EMP1001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@dayflow.com",
    "phone": "+1234567890",
    "address": "123 Main St, Tech City",
    "profilePicture": "https://cdn.dayflow.com/profiles/emp1001.png",
    "designation": "Software Engineer",
    "department": "Engineering",
    "joiningDate": "2025-01-15T00:00:00.000Z",
    "status": "ACTIVE",
    "role": "EMPLOYEE"
  }
}
```

### 2.2 Update Current Employee Profile
- **Endpoint**: `PUT /api/employees/me`
- **Authentication**: Required (JWT Bearer Token)
- **Description**: Allows modifying only `phone`, `address`, and `profilePicture`.
- **Request Body**:
```json
{
  "phone": "+9876543210",
  "address": "456 Side St, Dev City",
  "profilePicture": "https://cdn.dayflow.com/profiles/emp1001_new.png"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "profile": {
    "id": "60d0fe4f5311236168a109cb",
    "employeeId": "EMP1001",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+9876543210",
    "address": "456 Side St, Dev City",
    "profilePicture": "https://cdn.dayflow.com/profiles/emp1001_new.png"
  }
}
```

### 2.3 Get All Employees (Admin/HR Only)
- **Endpoint**: `GET /api/employees`
- **Authentication**: Required (JWT, Admin or HR)
- **Response (200 OK)**:
```json
{
  "success": true,
  "employees": [
    {
      "id": "60d0fe4f5311236168a109cb",
      "employeeId": "EMP1001",
      "firstName": "John",
      "lastName": "Doe",
      "designation": "Software Engineer"
    }
  ]
}
```

### 2.4 Get Specific Employee Details (Admin/HR Only)
- **Endpoint**: `GET /api/employees/:id`
- **Authentication**: Required (JWT, Admin or HR)
- **Response (200 OK)**:
```json
{
  "success": true,
  "employee": {
    "id": "60d0fe4f5311236168a109cb",
    "employeeId": "EMP1001",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "123 Main St, Tech City",
    "designation": "Software Engineer",
    "department": "Engineering",
    "joiningDate": "2025-01-15T00:00:00.000Z",
    "status": "ACTIVE"
  }
}
```

### 2.5 Update Specific Employee Details (Admin Only)
- **Endpoint**: `PUT /api/employees/:id`
- **Authentication**: Required (JWT, Admin Only)
- **Request Body**:
```json
{
  "designation": "Senior Software Engineer",
  "department": "R&D",
  "status": "ACTIVE"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Employee details updated successfully."
}
```

---

## 3. Attendance Endpoints

### 3.1 Check In
- **Endpoint**: `POST /api/attendance/check-in`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK / 201 Created)**:
```json
{
  "success": true,
  "attendance": {
    "id": "60d0fe4f5311236168a109cc",
    "date": "2026-08-22",
    "checkIn": "2026-08-22T09:00:00.000Z",
    "status": "PRESENT"
  }
}
```

### 3.2 Check Out
- **Endpoint**: `POST /api/attendance/check-out`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "attendance": {
    "id": "60d0fe4f5311236168a109cc",
    "date": "2026-08-22",
    "checkIn": "2026-08-22T09:00:00.000Z",
    "checkOut": "2026-08-22T17:00:00.000Z",
    "status": "PRESENT"
  }
}
```

### 3.3 Get My Attendance Logs
- **Endpoint**: `GET /api/attendance/me`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "date": "2026-08-22",
      "checkIn": "2026-08-22T09:00:00.000Z",
      "checkOut": "2026-08-22T17:00:00.000Z",
      "status": "PRESENT"
    }
  ]
}
```

### 3.4 Get Attendance Logs of All Employees (Admin/HR Only)
- **Endpoint**: `GET /api/attendance`
- **Authentication**: Required (JWT, Admin or HR)
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "employeeId": "60d0fe4f5311236168a109cb",
      "date": "2026-08-22",
      "checkIn": "2026-08-22T09:00:00.000Z",
      "checkOut": "2026-08-22T17:00:00.000Z",
      "status": "PRESENT"
    }
  ]
}
```

### 3.5 Get Attendance Logs of Specific Employee (Admin/HR Only)
- **Endpoint**: `GET /api/attendance/:employeeId`
- **Authentication**: Required (JWT, Admin or HR)
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "date": "2026-08-22",
      "checkIn": "2026-08-22T09:00:00.000Z",
      "status": "PRESENT"
    }
  ]
}
```

---

## 4. Leave Endpoints

### 4.1 Apply for Leave
- **Endpoint**: `POST /api/leaves`
- **Authentication**: Required (JWT Bearer Token)
- **Request Body**:
```json
{
  "leaveType": "SICK",
  "startDate": "2026-08-25T00:00:00.000Z",
  "endDate": "2026-08-26T00:00:00.000Z",
  "remarks": "Fever and doctor consultation"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "leaveRequest": {
    "id": "60d0fe4f5311236168a109cd",
    "leaveType": "SICK",
    "startDate": "2026-08-25T00:00:00.000Z",
    "endDate": "2026-08-26T00:00:00.000Z",
    "remarks": "Fever and doctor consultation",
    "status": "PENDING"
  }
}
```

### 4.2 Get My Leave Requests
- **Endpoint**: `GET /api/leaves/me`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "leaves": [
    {
      "id": "60d0fe4f5311236168a109cd",
      "leaveType": "SICK",
      "startDate": "2026-08-25T00:00:00.000Z",
      "endDate": "2026-08-26T00:00:00.000Z",
      "status": "PENDING"
    }
  ]
}
```

### 4.3 Get All Leave Requests (Admin/HR Only)
- **Endpoint**: `GET /api/leaves`
- **Authentication**: Required (JWT, Admin or HR)
- **Response (200 OK)**:
```json
{
  "success": true,
  "leaves": [
    {
      "id": "60d0fe4f5311236168a109cd",
      "employeeName": "John Doe",
      "leaveType": "SICK",
      "startDate": "2026-08-25T00:00:00.000Z",
      "endDate": "2026-08-26T00:00:00.000Z",
      "status": "PENDING"
    }
  ]
}
```

### 4.4 Approve Leave Request (Admin/HR Only)
- **Endpoint**: `PUT /api/leaves/:id/approve`
- **Authentication**: Required (JWT, Admin or HR)
- **Request Body**:
```json
{
  "comments": "Approved. Ensure handoff is done."
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Leave request approved successfully.",
  "leaveRequest": {
    "id": "60d0fe4f5311236168a109cd",
    "status": "APPROVED",
    "adminComments": "Approved. Ensure handoff is done."
  }
}
```

### 4.5 Reject Leave Request (Admin/HR Only)
- **Endpoint**: `PUT /api/leaves/:id/reject`
- **Authentication**: Required (JWT, Admin or HR)
- **Request Body**:
```json
{
  "comments": "Rejected due to project release deadline."
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Leave request rejected successfully.",
  "leaveRequest": {
    "id": "60d0fe4f5311236168a109cd",
    "status": "REJECTED",
    "adminComments": "Rejected due to project release deadline."
  }
}
```

---

## 5. Payroll Endpoints

### 5.1 Get My Salary Structure
- **Endpoint**: `GET /api/payroll/me`
- **Authentication**: Required (JWT Bearer Token)
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

### 5.2 Get Payroll Details of All Employees (Admin Only)
- **Endpoint**: `GET /api/payroll`
- **Authentication**: Required (JWT, Admin Only)
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

### 5.3 Update Salary Structure of Employee (Admin Only)
- **Endpoint**: `PUT /api/payroll/:employeeId`
- **Authentication**: Required (JWT, Admin Only)
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

---

## 6. Document Endpoints

### 6.1 Get My Uploaded Documents
- **Endpoint**: `GET /api/documents/me`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "documents": [
    {
      "id": "60d0fe4f5311236168a109ce",
      "fileName": "Aadhar_Card.pdf",
      "fileUrl": "https://storage.dayflow.com/docs/EMP1001_Aadhar.pdf",
      "fileType": "pdf",
      "createdAt": "2026-08-22T04:10:00.000Z"
    }
  ]
}
```

### 6.2 Upload a Document
- **Endpoint**: `POST /api/documents`
- **Authentication**: Required (JWT Bearer Token)
- **Request Body (Multipart Form-Data)**:
  - `file`: (Binary data)
  - `fileName`: "Passport_Size_Photo.jpg"
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Document uploaded successfully.",
  "document": {
    "id": "60d0fe4f5311236168a109cf",
    "fileName": "Passport_Size_Photo.jpg",
    "fileUrl": "https://storage.dayflow.com/docs/EMP1001_Photo.jpg",
    "fileType": "jpg"
  }
}
```

### 6.3 Delete a Document (Employee / Admin)
- **Endpoint**: `DELETE /api/documents/:id`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Document deleted successfully."
}
```

---

## 7. Notification Endpoints

### 7.1 Get My Notifications
- **Endpoint**: `GET /api/notifications`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "notifications": [
    {
      "id": "60d0fe4f5311236168a109d0",
      "title": "Leave Approved",
      "message": "Your leave request for 25th Aug - 26th Aug has been approved.",
      "isRead": false,
      "createdAt": "2026-08-22T08:00:00.000Z"
    }
  ]
}
```

### 7.2 Mark Notification as Read
- **Endpoint**: `PUT /api/notifications/:id/read`
- **Authentication**: Required (JWT Bearer Token)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Notification marked as read."
}
```

---

## 8. Report Endpoints (Admin/HR Only)

### 8.1 Get Attendance Reports
- **Endpoint**: `GET /api/reports/attendance`
- **Authentication**: Required (JWT, Admin or HR)
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

### 8.2 Get Leave Reports
- **Endpoint**: `GET /api/reports/leave`
- **Authentication**: Required (JWT, Admin or HR)
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

### 8.3 Get Payroll Reports
- **Endpoint**: `GET /api/reports/payroll`
- **Authentication**: Required (JWT, Admin or HR)
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
