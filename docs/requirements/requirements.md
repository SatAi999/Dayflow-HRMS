# Requirements Specification - Dayflow HRMS

## 1. Introduction
Dayflow is a Human Resource Management System (HRMS) designed to digitize and streamline core HR operations, such as employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows.

---

## 2. User Classes & Roles
The system enforces strict Role-Based Access Control (RBAC) with two primary roles:

### 2.1 Employee
- Regular user with access limited to their own records.
- View and edit limited profile fields.
- Clock in/out to track attendance; view personal attendance history.
- Submit leave requests; view leave balance and status.
- View personal payroll slips (read-only).
- Upload and view personal documents.
- View personal notification alerts.

### 2.2 Admin / HR Officer
- User with full administrative and management privileges.
- Add and edit all employee records.
- View and track attendance for all employees.
- Approve or reject leave requests and add approval comments.
- View and update salary/payroll structures for all employees.
- Access and manage all employee documents.
- Trigger notifications/alerts and generate reports.

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization
- **Sign Up**:
  - Required fields: Employee ID, Email, Password, Role (Employee or Admin/HR).
  - Password must follow standard security practices (minimum length, hashing).
  - Email verification is required.
- **Sign In**:
  - Secure login using Email and Password.
  - Informative error handling for invalid credentials.
  - Redirect user to the appropriate dashboard (Employee vs Admin/HR Dashboard) upon successful authentication.
- **Log Out**:
  - Safe session termination and redirect to the Sign In page.

### 3.2 Employee Dashboard
- Quick-access widgets/cards:
  - **My Profile** (Link to profile details)
  - **Attendance** (Check in/out status and logs)
  - **Leave Requests** (Request flow and calendar)
- Recent activity feed and alert notifications.

### 3.3 Admin / HR Dashboard
- Quick-access widgets/cards:
  - **Employee List** (Total count and management link)
  - **Attendance Records** (Today's overview)
  - **Leave Approvals** (Pending queue count)
- Ability to switch views or search for specific employee dashboards/details.

### 3.4 Profile Management
- **View Profile**:
  - Shows personal details (name, DOB, contact, address).
  - Shows job details (designation, department, joining date).
  - Shows salary structure (basic salary, allowances, deductions).
  - Shows uploaded documents and profile picture.
- **Edit Profile (Employee)**:
  - Allowed fields: Address, Phone Number, Profile Picture. All other fields are read-only.
- **Edit Profile (Admin)**:
  - Full edit rights on all employee fields (job details, salary structure, department, role, status).

### 3.5 Attendance Management
- **Clock In / Clock Out**:
  - Interactive buttons on dashboard for real-time check-in and check-out.
- **Tracking Options**:
  - Daily and weekly views.
  - Status options: `PRESENT`, `ABSENT`, `HALF_DAY`, `LEAVE`.
- **Visibility**:
  - Employees only see their own attendance logs.
  - Admin/HR can see logs for all employees.

### 3.6 Leave & Time-Off Management
- **Apply for Leave (Employee)**:
  - Fields: Leave Type (`PAID`, `SICK`, `UNPAID`), Date Range (Start Date, End Date), Remarks.
  - Status tracking: `PENDING`, `APPROVED`, `REJECTED`.
- **Leave Approval (Admin/HR)**:
  - View list of all pending leave requests.
  - Approve or reject with optional reviewer comments.
  - Approved leaves immediately update the employee's attendance record and profile leave status.
- **Leave Calendar**:
  - Visual grid displaying scheduled time-offs for team awareness.

### 3.7 Payroll & Salary Management
- **Visibility**:
  - Employee: Read-only view of their own salary details and past pay slips.
  - Admin/HR: Full view of all employees' payroll details.
- **Modifications**:
  - Admin can update the salary structure (allowances, basic salary, tax deductions).

### 3.8 Document Management
- **Employee**: Upload and manage necessary files (e.g., ID proof, academic certificates) and set profile picture.
- **Admin/HR**: View, download, and audit documents for all employees.

### 3.9 Notifications & Reports
- **Alerts**: Real-time or system notifications for actions like "Leave approved", "Salary slip generated", or "Check-in missed".
- **Reports**: Analytical exports or visual summary dashboards for:
  - Attendance reports (daily/monthly percentage).
  - Leave consumption.
  - Monthly payroll budgets and salary slip generation.
