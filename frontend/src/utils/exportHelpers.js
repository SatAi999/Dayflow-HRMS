/**
 * Utility function to convert array of objects to CSV and trigger browser download
 */
export const exportToCSV = (filename, data, columns) => {
  if (!data || data.length === 0) {
    alert('No data available to export.');
    return;
  }

  const headers = columns.map((col) => col.header).join(',');
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        let val = col.accessor ? row[col.accessor] : row[col.key];
        if (val === undefined || val === null) val = '';
        // Escape quotes
        const stringified = String(val).replace(/"/g, '""');
        return `"${stringified}"`;
      })
      .join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Triggers native browser print dialog for current page
 */
export const printReport = () => {
  window.print();
};
