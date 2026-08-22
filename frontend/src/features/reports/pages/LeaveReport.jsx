import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import FilterBar from '../../../components/report/FilterBar.jsx';
import Table from '../../../components/ui/Table.jsx';
import Badge from '../../../components/ui/Badge.jsx';
import Button from '../../../components/ui/Button.jsx';
import StatCard from '../../dashboard/widgets/StatCard.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import ErrorState from '../../../components/ui/ErrorState.jsx';
import { fetchLeaveReport } from '../../../services/reportService.js';
import { exportToCSV, printReport } from '../../../utils/exportHelpers.js';

export default function LeaveReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', department: '', status: '' });

  const loadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeaveReport(filters);
      setReport(data);
    } catch (e) {
      setError('Unable to fetch leave report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const columns = [
    { header: 'Employee Name', accessor: 'employeeName', render: (r) => <span className="font-semibold text-gray-900">{r.employeeName}</span> },
    { header: 'Department', accessor: 'department' },
    { header: 'Leave Type', accessor: 'leaveType' },
    { header: 'Start Date', accessor: 'startDate' },
    { header: 'End Date', accessor: 'endDate' },
    { header: 'Duration (Days)', accessor: 'days' },
    {
      header: 'Status',
      accessor: 'status',
      render: (r) => (
        <Badge variant={r.status === 'APPROVED' ? 'success' : r.status === 'PENDING' ? 'warning' : 'danger'}>
          {r.status}
        </Badge>
      ),
    },
  ];

  const filteredRecords = (report?.records || []).filter((r) => {
    if (filters.search && !r.employeeName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.department && r.department !== filters.department) return false;
    if (filters.status && r.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Applications & Balance Report"
        description="Audit leave balances, approved requests, and pending manager sign-offs."
        breadcrumbs={[{ label: 'Home' }, { label: 'Reports', href: '/admin/reports' }, { label: 'Leave' }]}
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={printReport}>
              Print Report
            </Button>
            <Button variant="primary" size="sm" onClick={() => exportToCSV('Leave_Report', filteredRecords, columns)}>
              Export CSV
            </Button>
          </div>
        }
      />

      {report?.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Applications" value={report.summary.totalRequests} />
          <StatCard title="Approved Leaves" value={report.summary.approvedCount} trendColor="text-emerald-600" />
          <StatCard title="Pending Requests" value={report.summary.pendingCount} trendColor="text-amber-600" />
          <StatCard title="Rejected Requests" value={report.summary.rejectedCount} trendColor="text-red-600" />
        </div>
      )}

      <FilterBar
        filters={filters}
        onFilterChange={(k, v) => setFilters((prev) => ({ ...prev, [k]: v }))}
        onApply={loadReport}
        onReset={() => {
          setFilters({ search: '', startDate: '', endDate: '', department: '', status: '' });
          loadReport();
        }}
        statuses={['APPROVED', 'PENDING', 'REJECTED']}
      />

      {loading ? (
        <div className="py-12 flex justify-center"><Spinner size="lg" label="Loading Leave Report..." /></div>
      ) : error ? (
        <ErrorState title="Report Error" description={error} onRetry={loadReport} />
      ) : (
        <Table columns={columns} data={filteredRecords} emptyMessage="No leave records found matching specified criteria." />
      )}
    </div>
  );
}
