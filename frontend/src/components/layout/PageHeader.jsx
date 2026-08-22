import React from 'react';
import PropTypes from 'prop-types';

export default function PageHeader({ title, description, breadcrumbs = [], action, className = '' }) {
  return (
    <div className={`mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200/80 pb-5 ${className}`}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-1 font-medium">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-300">/</span>}
                {b.href ? (
                  <a href={b.href} className="hover:text-blue-600 transition-colors">
                    {b.label}
                  </a>
                ) : (
                  <span className="text-gray-800 font-semibold">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-900 tracking-tight">{title}</h1>
        {description && <p className="text-xs sm:text-sm text-gray-500 mt-1">{description}</p>}
      </div>

      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  action: PropTypes.node,
  className: PropTypes.string,
};
