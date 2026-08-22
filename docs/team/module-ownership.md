# Module & File Ownership - Dayflow HRMS

This document maps directories and files to specific developers. This division limits conflicts by restricting developers to their respective domains.

---

## 1. Developer Scopes

| Team Member | Area / Responsibility | Frontend Paths | Backend Paths |
| :--- | :--- | :--- | :--- |
| **MEMBER 1** | Auth + Employee | `frontend/src/features/auth/`<br/>`frontend/src/features/employee/`<br/>`frontend/src/context/AuthContext.jsx` | `backend/src/modules/auth/`<br/>`backend/src/modules/employees/` |
| **MEMBER 2** | Attendance | `frontend/src/features/attendance/` | `backend/src/modules/attendance/` |
| **MEMBER 3** | Leave + Payroll + Documents | `frontend/src/features/leave/`<br/>`frontend/src/features/payroll/`<br/>`frontend/src/features/documents/` | `backend/src/modules/leave/`<br/>`backend/src/modules/payroll/`<br/>`backend/src/modules/documents/` |
| **MEMBER 4** | Dashboard + Reports + Navigation | `frontend/src/features/reports/`<br/>`frontend/src/features/notifications/`<br/>`frontend/src/components/layout/`<br/>`frontend/src/components/navigation/`<br/>`frontend/src/styles/` | `backend/src/modules/reports/`<br/>`backend/src/modules/notifications/`<br/>`shared/` |

---

## 2. Shared File Boundaries

Certain files are modified by multiple developers or hold structural definitions. We assign specific caretakers and protocols to these files.

| Shared File / Directory | Owner / Caretaker | Change Protocol |
| :--- | :--- | :--- |
| `frontend/src/App.jsx` | Member 4 | Integration of route links. Coordination required. |
| `frontend/src/main.jsx` | Member 4 | React render wrapper. Direct changes prohibited. |
| `backend/src/app.js` | Member 1 | Express server setup. Coordinator must approve adding middleware. |
| `backend/src/routes/index.js` | Member 1 | Express route mounting point. Add new routes at endpoints agreed in contracts. |
| `shared/constants/*` | Team Coordination | Changing constants requires all 4 members' agreement. |
| `package.json` (Root, FE, BE) | Team Coordination | Package upgrades/additions must be documented and done with team consensus. |
| `.env.example` | Team Coordination | Coordinate when adding new backend environment flags. |
| Global CSS (`frontend/src/styles/index.css`) | Member 4 | Controls core layout patterns. Individual feature styles must use utility classes. |
