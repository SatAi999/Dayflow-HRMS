import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import StatCard from '../../dashboard/widgets/StatCard.jsx';
import QuickActionCard from '../../dashboard/widgets/QuickActionCard.jsx';
import Card from '../../../components/ui/Card.jsx';
import Badge from '../../../components/ui/Badge.jsx';
import Button from '../../../components/ui/Button.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import ErrorState from '../../../components/ui/ErrorState.jsx';
import { getEmployeeDashboardData } from '../../../services/dashboardService.js';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getEmployeeDashboardData();
      setData(res);
    } catch (err) {
      setError('Failed to load employee portal dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner size="lg" label="Loading Employee Dashboard..." />
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Dashboard Load Error" description={error} onRetry={loadData} />;
  }

  const { todayStatus, leaveBalance, payrollSummary, recentRequests } = data;
  const displayName = user?.firstName || 'Employee';

  const employeeActions = [
    { label: 'Check In / Out', description: 'Log today attendance', onClick: () => navigate('/employee/attendance'), bgColor: 'bg-emerald-600' },
    { label: 'Apply for Leave', description: 'Submit leave request', onClick: () => navigate('/employee/leave'), bgColor: 'bg-blue-600' },
    { label: 'View Pay Slip', description: 'Salary breakdown & tax info', onClick: () => navigate('/employee/payroll'), bgColor: 'bg-purple-600' },
    { label: 'My Profile', description: 'Update profile details', onClick: () => navigate('/employee/profile'), bgColor: 'bg-amber-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-750 to-purple-800 text-white shadow-lg transform hover:scale-[1.002] transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Hello, {displayName}!</h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1.5 font-medium">
              Welcome back to Dayflow HRMS. Your workforce portal is active.
            </p>
          </div>
          <Button variant="secondary" size="md" onClick={() => navigate('/employee/attendance')}>
            View Attendance Log
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Attendance"
          value={todayStatus.status}
          trend={todayStatus.checkInTime}
          trendColor="text-emerald-600"
          description={todayStatus.workingHours}
          bgGradient="bg-gradient-to-tr from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Leave Balance"
          value={`${leaveBalance.totalRemaining} Days`}
          trend="Available"
          trendColor="text-blue-600"
          description="Paid & casual leaves remaining"
          bgGradient="bg-gradient-to-tr from-blue-600 to-indigo-600"
        />
        <StatCard
          title="Paid Leave Left"
          value={`${leaveBalance.paidLeaveRemaining} Days`}
          description="Annual leave balance"
          bgGradient="bg-gradient-to-tr from-purple-600 to-pink-600"
        />
        <StatCard
          title="Last Disbursed Salary"
          value={payrollSummary.lastDisbursedSalary}
          trend={payrollSummary.status}
          trendColor="text-emerald-600"
          description={`Paid on ${payrollSummary.lastPayDate}`}
          bgGradient="bg-gradient-to-tr from-amber-500 to-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <QuickActionCard actions={employeeActions} />

      {/* Recent Requests Section */}
      <Card title="My Recent Leave Applications" subtitle="Track your pending and approved leave requests">
        <div className="space-y-3">
          {recentRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-3.5 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100/70 transition-colors">
              <div>
                <p className="text-sm font-semibold text-gray-900">{req.type}</p>
                <p className="text-xs text-gray-500">{req.dates} ({req.duration})</p>
              </div>
              <Badge variant={req.status === 'APPROVED' ? 'success' : req.status === 'REJECTED' ? 'danger' : 'warning'}>
                {req.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
