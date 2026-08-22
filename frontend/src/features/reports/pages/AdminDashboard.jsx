import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import StatCard from '../../dashboard/widgets/StatCard.jsx';
import ChartCard from '../../dashboard/widgets/ChartCard.jsx';
import ActivityCard from '../../dashboard/widgets/ActivityCard.jsx';
import QuickActionCard from '../../dashboard/widgets/QuickActionCard.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import ErrorState from '../../../components/ui/ErrorState.jsx';
import { getAdminDashboardData } from '../../../services/dashboardService.js';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminDashboardData();
      setData(res);
    } catch (err) {
      setError('Unable to load dashboard aggregate statistics.');
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
        <Spinner size="lg" label="Loading Executive Analytics Dashboard..." />
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Dashboard Error" description={error} onRetry={loadData} />;
  }

  const { kpis, attendanceBreakdown, attendanceTrend, departmentDistribution, recentActivity } = data;

  const quickActions = [
    { label: 'Add Employee', description: 'Register new team member', onClick: () => navigate('/admin/employees'), bgColor: 'bg-blue-600' },
    { label: 'Review Leave', description: `${kpis.pendingLeaveRequests} pending approvals`, onClick: () => navigate('/admin/leave'), bgColor: 'bg-amber-600' },
    { label: 'View Attendance', description: 'Real-time check-in logs', onClick: () => navigate('/admin/attendance'), bgColor: 'bg-emerald-600' },
    { label: 'Generate Reports', description: 'Export analytics summaries', onClick: () => navigate('/admin/reports'), bgColor: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR & Executive Dashboard"
        description="Comprehensive real-time insights across headcount, attendance, leaves, and payroll."
        breadcrumbs={[{ label: 'Home' }, { label: 'Admin Dashboard' }]}
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={kpis.totalEmployees}
          trend={kpis.totalEmployeesTrend}
          description="Active corporate workforce"
          bgGradient="bg-gradient-to-tr from-blue-600 to-indigo-600"
          onClick={() => navigate('/admin/employees')}
        />
        <StatCard
          title="Present Today"
          value={kpis.presentToday}
          trend={kpis.attendanceRate}
          description="Checked-in before 09:30 AM"
          bgGradient="bg-gradient-to-tr from-emerald-500 to-teal-600"
          onClick={() => navigate('/admin/attendance')}
        />
        <StatCard
          title="On Leave Today"
          value={kpis.onLeave}
          trend={`${kpis.pendingLeaveRequests} Pending`}
          trendColor="text-amber-600"
          description="Approved absence requests"
          bgGradient="bg-gradient-to-tr from-amber-500 to-orange-600"
          onClick={() => navigate('/admin/leave')}
        />
        <StatCard
          title="Monthly Payroll Total"
          value={kpis.monthlyPayrollTotal}
          trend="August 2026"
          trendColor="text-purple-600"
          description="Disbursed salaries summary"
          bgGradient="bg-gradient-to-tr from-purple-600 to-indigo-700"
          onClick={() => navigate('/admin/payroll')}
        />
      </div>

      {/* QUICK ACTIONS SHORTCUTS */}
      <QuickActionCard actions={quickActions} />

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Breakdown Bar Representation */}
        <ChartCard title="Attendance Distribution" subtitle="Today's live attendance status">
          <div className="w-full space-y-4">
            {attendanceBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>{item.status}</span>
                  <span>{item.count} employees ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Department Overview */}
        <ChartCard title="Department Distribution" subtitle="Headcount proportion by department">
          <div className="w-full space-y-3">
            {departmentDistribution.map((dept, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50 hover:bg-gray-100/80 transition-colors">
                <span className="font-semibold text-gray-800">{dept.department}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{dept.count} members</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">{dept.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* RECENT ACTIVITY LOG */}
      <ActivityCard activities={recentActivity} />
    </div>
  );
}
