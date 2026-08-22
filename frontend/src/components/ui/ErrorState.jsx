import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Failed to fetch information. Please try again or contact support.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`py-10 px-4 text-center flex flex-col items-center justify-center bg-red-50/50 rounded-xl border border-red-100 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h4 className="text-base font-semibold text-red-900 mb-1">{title}</h4>
      <p className="text-xs text-red-600 max-w-sm mb-4">{description}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};
