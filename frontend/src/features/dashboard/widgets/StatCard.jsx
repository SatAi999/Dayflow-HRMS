import React from 'react';
import PropTypes from 'prop-types';

export default function StatCard({ title, value, icon: Icon, trend, trendColor = 'text-emerald-600', description, onClick, bgGradient }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-blue-300' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-lg text-white shadow-xs ${bgGradient || 'bg-gradient-to-tr from-blue-600 to-indigo-500'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
        {trend && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 ${trendColor}`}>{trend}</span>}
      </div>

      {description && <p className="text-xs text-gray-500 mt-1.5">{description}</p>}
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  trend: PropTypes.string,
  trendColor: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  bgGradient: PropTypes.string,
};
