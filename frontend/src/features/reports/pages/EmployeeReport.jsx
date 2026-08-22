import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import FilterBar from '../../../components/report/FilterBar.jsx';
import Table from '../../../components/ui/Table.jsx';
import Badge from '../../../components/ui/Badge.jsx';
import Button from '../../../components/ui/Button.jsx';
import StatCard from '../../dashboard/widgets/StatCard.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import ErrorState from '../../../components/ui/ErrorState.jsx';
import { fetchEmployeeReport } from '../../../services/reportService.js';
import { exportToCSV, printReport } from '../../../utils/exportHelpers.js';

export default function EmployeeReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', department: '', status: '' });

  const loadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmployeeReport(filters);
      setReport(data);
    } catch (e) {
      setError('Unable to fetch employee directory report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const columns = [
    { header: 'Employee ID', accessor: 'id', render: (r) => <span className="font-mono text-xs font-semibold text-gray-700">{r.id}</span> },
    { header: 'Full Name', accessor: 'name', render: (r) => <span className="font-semibold text-gray-900">{r.name}</span> },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Department', accessor: 'department' },
    { header: 'Designation', accessor: 'designation' },
    { header: 'Joining Date', accessor: 'joiningDate' },
    { header: 'Status', accessor: 'status', render: (r) => <Badge variant={r.status === 'ACTIVE' ? 'success' : 'gray'}>{r.status}</Badge> },
  ];

  const filteredRecords = (report?.records || []).filter((r) => {
    if (filters.search && !r.name.toLowerCase().includes(filters.search.toLowerCase()) && !r.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.department && r.department !== filters.department) return false;
    if (filters.status && r.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory & Headcount Report"
        description="Comprehensive summary of company headcount, department allocations, designations, and join dates."
        breadcrumbs={[{ label: 'Home' }, { label: 'Reports', href: '/admin/reports' }, { label: 'Employee Directory' }]}
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={printReport}>
              Print Report
            </Button>
            <Button variant="primary" size="sm" onClick={() => exportToCSV('Employee_Directory_Report', filteredRecords, columns)}>
              Export CSV
            </Button>
          </div>
        }
      />

      {report?.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Employees" value={report.summary.totalEmployees} />
          <StatCard title="Active Workforce" value={report.summary.activeEmployees} trendColor="text-emerald-600" />
          <StatCard title="Onboarding" value={report.summary.onBoarding} trendColor="text-blue-600" />
          <StatCard title="Terminated" value={report.summary.terminated} trendColor="text-gray-500" />
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
        statuses={['ACTIVE', 'INACTIVE', 'PROBATION']}
        showDateRange={false}
      />

      {loading ? (
        <div className="py-12 flex justify-center"><Spinner size="lg" label="Generating Directory Report..." /></div>
      ) : error ? (
        <ErrorState title="Report Error" description={error} onRetry={loadReport} />
      ) : (
        <Table columns={columns} data={filteredRecords} emptyMessage="No employees found matching filter criteria." />
      )}
    </div>
  );
}
