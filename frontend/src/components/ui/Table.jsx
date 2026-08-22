import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner.jsx';
import EmptyState from './EmptyState.jsx';

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}) {
  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <Spinner size="lg" label="Loading data..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title="No Records" description={emptyMessage} />;
  }

  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-gray-200 bg-white ${className}`}>
      <table className="w-full text-left text-sm text-gray-600 border-collapse">
        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={col.key || idx} className={`px-4 py-3 ${col.headerClassName || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIdx) => (
            <tr key={row.id || rowIdx} className="hover:bg-gray-50/80 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={col.key || colIdx} className={`px-4 py-3.5 ${col.className || ''}`}>
                  {col.render ? col.render(row, rowIdx) : row[col.accessor || col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      key: PropTypes.string,
      accessor: PropTypes.string,
      render: PropTypes.func,
      headerClassName: PropTypes.string,
      className: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
};
