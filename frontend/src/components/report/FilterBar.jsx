import React from 'react';
import PropTypes from 'prop-types';
import Select from '../ui/Select.jsx';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function FilterBar({
  filters = {},
  onFilterChange,
  onApply,
  onReset,
  departments = [],
  statuses = [],
  showSearch = true,
  showDateRange = true,
  showDepartment = true,
  showStatus = true,
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {showSearch && (
          <Input
            label="Search"
            placeholder="Search by name or ID..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        )}

        {showDateRange && (
          <Input
            label="Start Date"
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
          />
        )}

        {showDateRange && (
          <Input
            label="End Date"
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
          />
        )}

        {showDepartment && (
          <Select
            label="Department"
            placeholder="All Departments"
            options={departments.length ? departments : ['Engineering', 'Human Resources', 'Sales', 'Finance', 'Design']}
            value={filters.department || ''}
            onChange={(e) => onFilterChange('department', e.target.value)}
          />
        )}

        {showStatus && (
          <Select
            label="Status"
            placeholder="All Statuses"
            options={statuses.length ? statuses : ['Present', 'Absent', 'On Leave', 'Late', 'APPROVED', 'PENDING', 'REJECTED']}
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
          />
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
        <Button variant="secondary" size="sm" onClick={onReset}>
          Reset
        </Button>
        <Button variant="primary" size="sm" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  departments: PropTypes.array,
  statuses: PropTypes.array,
  showSearch: PropTypes.bool,
  showDateRange: PropTypes.bool,
  showDepartment: PropTypes.bool,
  showStatus: PropTypes.bool,
};
