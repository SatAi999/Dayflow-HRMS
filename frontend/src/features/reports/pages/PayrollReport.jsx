import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import FilterBar from '../../../components/report/FilterBar.jsx';
import Table from '../../../components/ui/Table.jsx';
import Badge from '../../../components/ui/Badge.jsx';
import Button from '../../../components/ui/Button.jsx';
import StatCard from '../../dashboard/widgets/StatCard.jsx';
import Spinner from '../../../components/ui/Spinner.jsx';
import ErrorState from '../../../components/ui/ErrorState.jsx';
import { fetchPayrollReport } from '../../../services/reportService.js';
import { exportToCSV, printReport } from '../../../utils/exportHelpers.js';

export default function PayrollReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '', department: '', status: '' });

  const loadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPayrollReport(filters);
      setReport(data);
    } catch (e) {
      setError('Unable to fetch payroll summary report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  const columns = [
    { header: 'Employee Name', accessor: 'employeeName', render: (r) => <span className="font-semibold text-gray-900">{r.employeeName}</span> },
    { header: 'ID', accessor: 'empId' },
    { header: 'Department', accessor: 'department' },
    { header: 'Basic Salary', accessor: 'basicSalary' },
    { header: 'Allowances', accessor: 'allowances' },
    { header: 'Deductions', accessor: 'deductions' },
    { header: 'Net Salary', accessor: 'netSalary', render: (r) => <span className="font-bold text-emerald-700">{r.netSalary}</span> },
    { header: 'Status', accessor: 'status', render: (r) => <Badge variant="success">{r.status}</Badge> },
  ];

  const filteredRecords = (report?.records || []).filter((r) => {
    if (filters.search && !r.employeeName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.department && r.department !== filters.department) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll & Financial Summary Report"
        description="Detailed breakdown of base salaries, monthly allowances, deductions, and net payouts."
        breadcrumbs={[{ label: 'Home' }, { label: 'Reports', href: '/admin/reports' }, { label: 'Payroll' }]}
        action={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={printReport}>
              Print Report
            </Button>
            <Button variant="primary" size="sm" onClick={() => exportToCSV('Payroll_Report', filteredRecords, columns)}>
              Export CSV
            </Button>
          </div>
        }
      />

      {report?.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Disbursed" value={report.summary.totalDisbursed} trend={report.summary.payPeriod} trendColor="text-purple-600" />
          <StatCard title="Average Salary" value={report.summary.averageSalary} />
          <StatCard title="Employee Count" value={report.summary.employeeCount} />
          <StatCard title="Pay Period" value={report.summary.payPeriod} />
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
        showStatus={false}
        showDateRange={false}
      />

      {loading ? (
        <div className="py-12 flex justify-center"><Spinner size="lg" label="Loading Payroll Data..." /></div>
      ) : error ? (
        <ErrorState title="Report Error" description={error} onRetry={loadReport} />
      ) : (
        <Table columns={columns} data={filteredRecords} emptyMessage="No payroll records available for display." />
      )}
    </div>
  );
}
