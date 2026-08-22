import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/ui/Card.jsx';
import Button from '../../../components/ui/Button.jsx';

export default function QuickActionCard({ actions = [] }) {
  return (
    <Card title="Quick Management Actions" subtitle="Frequently used shortcuts">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={act.onClick}
            className="flex flex-col items-start p-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-50/50 hover:border-blue-300 transition-all text-left group"
          >
            <div className={`p-2.5 rounded-lg text-white mb-3 shadow-xs ${act.bgColor || 'bg-blue-600'} group-hover:scale-105 transition-transform`}>
              <span className="text-lg font-bold">{act.label[0]}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {act.label}
            </span>
            <span className="text-xs text-gray-500 mt-1">{act.description}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

QuickActionCard.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      bgColor: PropTypes.string,
    })
  ),
};
