import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/ui/Card.jsx';
import Badge from '../../../components/ui/Badge.jsx';

export default function ActivityCard({ activities = [], title = 'Recent Corporate Activity' }) {
  return (
    <Card title={title} subtitle="Real-time timeline across departments">
      <div className="space-y-4">
        {activities.map((act) => {
          const badgeVariant =
            act.status === 'pending'
              ? 'warning'
              : act.status === 'success'
              ? 'success'
              : act.status === 'danger'
              ? 'danger'
              : 'info';

          return (
            <div key={act.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100/60 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{act.title}</p>
                  <Badge variant={badgeVariant} size="sm">
                    {act.type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{act.desc}</p>
              </div>
              <span className="text-[11px] font-medium text-gray-400 shrink-0 ml-3">{act.time}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

ActivityCard.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};
