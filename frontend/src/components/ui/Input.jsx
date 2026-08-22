import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-md border text-sm transition-colors py-2 px-3 focus:outline-none focus:ring-2 ${
            Icon ? 'pl-10' : 'pl-3'
          } ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200 text-red-900 bg-red-50'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 text-gray-900 bg-white'
          }`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-red-600 mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  id: PropTypes.string,
};
