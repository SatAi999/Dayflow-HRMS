import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-600 text-white',
  }[type] || 'bg-gray-800 text-white';

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center justify-between px-4 py-3 rounded-lg shadow-xl text-sm font-medium ${typeStyles} max-w-sm w-full animate-bounce-short`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 text-white/80 hover:text-white rounded p-0.5 focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  duration: PropTypes.number,
};
