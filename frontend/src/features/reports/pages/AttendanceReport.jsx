import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import FilterBar from '../../../components/report/FilterBar.jsx';
import Table from '../../../components/ui/Table.jsx';
import Badge from '../../../components/ui/Badge.jsx';
import Button from '../../../components/ui/Button.jsx';
import StatCard from '../../dashboard/widgets/StatCard.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import ErrorState from '../../../components/ui/ErrorState.jsx';
import { fetchAttendanceReport } from '../../../services/reportService.js';
import { exportToCSV, printReport } from '../../../utils/exportHelpers.js';

export default function AttendanceReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', department: '', status: '' });

  const loadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAttendanceReport(filters);
      setReport(data);
    } catch (e) {
      setError('Unable to fetch attendance report data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const columns = [
    { header: 'Employee Name', accessor: 'employeeName', render: (r) => <span className="font-semibold text-gray-900">{r.employeeName}</span> },
    { header: 'ID', accessor: 'empId' },
    { header: 'Department', accessor: 'department' },
    { header: 'Date', accessor: 'date' },
    { header: 'Check-In', accessor: 'checkIn' },
    { header: 'Check-Out', accessor: 'checkOut' },
    { header: 'Hours', accessor: 'hours' },
    {
      header: 'Status',
      accessor: 'status',
      render: (r) => (
        <Badge variant={r.status === 'Present' ? 'success' : r.status === 'On Leave' ? 'warning' : 'danger'}>
          {r.status}
        </Badge>
      ),
    },
  ];

  const filteredRecords = (report?.records || []).filter((r) => {
    if (filters.search && !r.employeeName.toLowerCase().includes(filters.search.toLowerCase()) && !r.empId.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.department && r.department !== filters.department) return false;
    if (filters.status && r.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance & Check-in Report"
        description="Comprehensive summary of employee daily check-in times, working hours, and absence metrics."
        breadcrumbs={[{ label: 'Home' }, { label: 'Reports', href: '/admin/reports' }, { label: 'Attendance' }]}
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={printReport}>
              Print Report
            </Button>
            <Button variant="primary" size="sm" onClick={() => exportToCSV('Attendance_Report', filteredRecords, columns)}>
              Export CSV
            </Button>
          </div>
        }
      />

      {/* KPI SUMMARIES */}
      {report?.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Staff" value={report.summary.totalRecords} description="Logged for period" />
          <StatCard title="Present Count" value={report.summary.presentCount} trend={report.summary.attendanceRate} trendColor="text-emerald-600" />
          <StatCard title="On Leave" value={report.summary.leaveCount} />
          <StatCard title="Absent" value={report.summary.absentCount} trendColor="text-red-600" />
        </div>
      )}

      {/* FILTER BAR */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={loadReport}
        onReset={() => {
          setFilters({ search: '', startDate: '', endDate: '', department: '', status: '' });
          loadReport();
        }}
        statuses={['Present', 'On Leave', 'Absent', 'Late']}
      />

      {/* DATA TABLE */}
      {loading ? (
        <div className="py-12 flex justify-center"><Spinner size="lg" label="Generating Attendance Report..." /></div>
      ) : error ? (
        <ErrorState title="Error Loading Report" description={error} onRetry={loadReport} />
      ) : (
        <Table columns={columns} data={filteredRecords} emptyMessage="No attendance records match the selected filters." />
      )}
    </div>
  );
}
