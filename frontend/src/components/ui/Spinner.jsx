import React from 'react';
import PropTypes from 'prop-types';

export default function Spinner({ size = 'md', label, className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-blue-600 border-t-transparent ${sizeClasses}`}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <span className="text-xs text-gray-500 font-medium">{label}</span>}
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  className: PropTypes.string,
};
