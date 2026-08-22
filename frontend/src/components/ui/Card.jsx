import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ children, title, subtitle, action, className = '', headerClassName = '', bodyClassName = '' }) {
  return (
    <div className={`bg-gradient-to-b from-white to-slate-50/20 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_10px_35px_-8px_rgba(59,130,246,0.08)] hover:border-blue-500/20 hover:-translate-y-0.5 ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  action: PropTypes.node,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
};
