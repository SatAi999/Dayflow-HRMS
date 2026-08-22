# Dayflow – Human Resource Management System (HRMS)

Dayflow is a modern, responsive, and modular Human Resource Management System designed to streamline core HR operations, employee profile tracking, attendance, leave management, and payroll dashboards.

---

## 1. Project Overview & Problem Statement
In fast-paced organization settings, managing employee profiles, attendance logs, leave balances, and payroll structures across multiple sheets or disconnected systems causes data discrepancy, delays approval cycles, and creates security risks.

**Dayflow** solves these problems by providing a unified portal with Role-Based Access Control (RBAC), daily/weekly attendance logs, approval tracking for HR managers, and personal document hubs.

---

## 2. Tech Stack
- **Frontend**: React (Vite SPA client), React Router (for navigation guards), Axios (HTTP Client), Tailwind CSS (responsive styles).
- **Backend**: Node.js & Express.js (Modular REST API framework).
- **Database**: MongoDB & Mongoose ORM.
- **Authentication**: JWT (JSON Web Tokens) & secure hashing via `bcryptjs`.

---

## 3. Monorepo Folder Structure

```text
dayflow/
├── docs/                 # Documentation (Architecture, Requirements, Team Guides)
├── frontend/             # React SPA Client codebase
├── backend/              # Node/Express API codebase
├── shared/               # Shared constants and contracts (prevent API mismatch)
├── scripts/              # Local development and startup scripts
├── docker-compose.yml    # MongoDB Docker container orchestrator
└── README.md             # This guide
```

---

## 4. Local Setup & Quick Start

### 4.1 Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (installed locally or running via Docker)
- [Docker](https://www.docker.com/) (optional)

### 4.2 Start the Database
If you use Docker, spin up the MongoDB instance in the background:
```bash
docker-compose up -d
```

### 4.3 Configure Environment Variables
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Copy the template file to `.env`:
   ```bash
   cp .env.example .env
   # Or copy on Windows: copy .env.example .env
   ```
3. Open `.env` and adjust variables if necessary (e.g. database port or JWT secret).

### 4.4 Install Dependencies & Start Applications

#### Running Backend
From the repository root:
```bash
cd backend
npm install
npm run dev
# Server will start on http://localhost:5000
```

#### Running Frontend
From the repository root:
```bash
cd frontend
npm install
npm run dev
# Client will start on http://localhost:5173
```

---

## 5. Team Module Ownership
Our team of 4 developers owns distinct sections of the codebase to prevent merge conflicts. Refer to [module-ownership.md](file:///d:/Dayflow-HRMS/docs/team/module-ownership.md) for details:

- **Member 1 (Auth + Employee)**:
  - `frontend/src/features/auth/`
  - `frontend/src/features/employee/`
  - `backend/src/modules/auth/`
  - `backend/src/modules/employees/`
- **Member 2 (Attendance)**:
  - `frontend/src/features/attendance/`
  - `backend/src/modules/attendance/`
- **Member 3 (Leave + Payroll + Documents)**:
  - `frontend/src/features/leave/`
  - `frontend/src/features/payroll/`
  - `frontend/src/features/documents/`
  - `backend/src/modules/leave/`
  - `backend/src/modules/payroll/`
  - `backend/src/modules/documents/`
- **Member 4 (Dashboard + Reports + Shared UI)**:
  - Navigation layouts, dashboard widgets, reports feature, configurations, and root scripts.

---

## 6. Git Branching & Contribution Workflow
1. Pull the latest develop code:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Create your isolated feature branch:
   ```bash
   git checkout -b feature/<your-feature-name>
   ```
3. Commit using the **Conventional Commits** syntax:
   `feat(auth): implement signup form validation`
4. Prior to opening a Pull Request, merge the latest develop code locally and resolve conflicts:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/<your-feature-name>
   git merge develop
   ```
5. Open your PR from `feature/<name>` into `develop`.

---

## 7. Future Enhancements
- Automated email alerts on check-in failures.
- AI-based timesheet validation rules.
- Offline support and local database logging for attendance check-ins.
