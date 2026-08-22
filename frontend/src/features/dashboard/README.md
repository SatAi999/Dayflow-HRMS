# Member 4 — Dashboard Architecture & Shared UI

This directory contains the central entry point and executive widgets for Dayflow HRMS:

- **Admin & Executive Dashboard**: KPI stats cards, attendance distribution, department headcount, quick shortcuts, activity timeline.
- **Employee Portal Dashboard**: Personal attendance status, leave balances, pay slip summaries, recent leave requests.
- **Shared UI Component Integration**: All widgets leverage `frontend/src/components/ui/` (`Button`, `Card`, `Badge`, `Spinner`, `ErrorState`, `StatCard`, `ChartCard`, `ActivityCard`, `QuickActionCard`).
- **Data Layer**: Consumes `frontend/src/services/dashboardService.js`.
