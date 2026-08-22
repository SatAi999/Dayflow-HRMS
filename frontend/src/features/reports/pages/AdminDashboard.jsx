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

// SVG Icon Components for KPI cards
const HeadcountIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LeaveIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PayrollIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16c1.657 0 3-.895 3-2s-1.343-2-3-2-3-.895-3-2 1.343-2 3-2m0 8V7" />
  </svg>
);

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

  const { kpis, attendanceBreakdown, departmentDistribution, recentActivity } = data;

  const quickActions = [
    { label: 'Manage Employees', description: 'View and edit user list', onClick: () => navigate('/admin/employees'), bgColor: 'bg-indigo-600' },
    { label: 'Review Leaves', description: `${kpis.pendingLeaveRequests} pending approvals`, onClick: () => navigate('/admin/leave'), bgColor: 'bg-amber-600' },
    { label: 'Attendance Audit', description: 'Monitor daily check-ins', onClick: () => navigate('/admin/attendance'), bgColor: 'bg-emerald-600' },
    { label: 'Payroll Statements', description: 'Update salary configurations', onClick: () => navigate('/admin/payroll'), bgColor: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR & Executive Dashboard"
        description="Comprehensive real-time insights across headcount, attendance, leaves, and payroll."
        breadcrumbs={[{ label: 'Home' }, { label: 'Admin Dashboard' }]}
      />

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={kpis.totalEmployees}
          icon={HeadcountIcon}
          trend={kpis.totalEmployeesTrend}
          description="Active corporate workforce"
          bgGradient="bg-gradient-to-tr from-indigo-500 to-blue-600"
          onClick={() => navigate('/admin/employees')}
        />
        <StatCard
          title="Present Today"
          value={kpis.presentToday}
          icon={ClockIcon}
          trend={kpis.attendanceRate}
          description="Total checked-in employees"
          bgGradient="bg-gradient-to-tr from-emerald-500 to-teal-600"
          onClick={() => navigate('/admin/attendance')}
        />
        <StatCard
          title="On Leave Today"
          value={kpis.onLeave}
          icon={LeaveIcon}
          trend={`${kpis.pendingLeaveRequests} Pending`}
          trendColor="text-amber-700 bg-amber-50"
          description="Approved time-off schedules"
          bgGradient="bg-gradient-to-tr from-amber-500 to-orange-600"
          onClick={() => navigate('/admin/leave')}
        />
        <StatCard
          title="Monthly Payroll Total"
          value={kpis.monthlyPayrollTotal}
          icon={PayrollIcon}
          trend="Real-time Sum"
          trendColor="text-purple-700 bg-purple-50"
          description="Combined salary structures"
          bgGradient="bg-gradient-to-tr from-purple-500 to-indigo-600"
          onClick={() => navigate('/admin/payroll')}
        />
      </div>

      {/* QUICK ACTIONS SHORTCUTS */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Quick Navigation Shortcuts</h3>
        <QuickActionCard actions={quickActions} />
      </div>

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Breakdown Bar Representation */}
        <ChartCard title="Attendance Distribution" subtitle="Today's live attendance status">
          <div className="w-full space-y-5 py-2">
            {attendanceBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    {item.status}
                  </span>
                  <span>{item.count} members ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Department Overview */}
        <ChartCard title="Department Distribution" subtitle="Headcount proportion by department">
          <div className="w-full space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {departmentDistribution.map((dept, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200">
                <span className="font-bold text-gray-700">{dept.department}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-medium">{dept.count} members</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-150">{dept.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* RECENT ACTIVITY LOG */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs">
        <div className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">System Activity Log</h3>
          <span className="px-2.5 py-0.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-full">Live Feed</span>
        </div>
        <ActivityCard activities={recentActivity} />
      </div>
    </div>
  );
}
