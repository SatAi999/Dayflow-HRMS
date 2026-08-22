import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../components/ui/Card.jsx';

export default function ChartCard({ title, subtitle, filter, children, className = '' }) {
  return (
    <Card
      title={title}
      subtitle={subtitle}
      action={filter}
      className={`h-full ${className}`}
      bodyClassName="flex flex-col justify-center"
    >
      <div className="w-full min-h-[220px] flex items-center justify-center">
        {children}
      </div>
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  filter: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
