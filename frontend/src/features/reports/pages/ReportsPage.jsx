import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import Card from '../../../components/ui/Card.jsx';
import Button from '../../../components/ui/Button.jsx';
import { REPORT_TYPES } from '../../../config/reportConfig.js';

export default function ReportsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Reports & Analytics Center"
        description="Comprehensive exportable reports covering workforce attendance, leave balances, payroll disbursements, and employee directory."
        breadcrumbs={[{ label: 'Home' }, { label: 'Reports' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORT_TYPES.map((rep) => (
          <Card key={rep.id} className="h-full flex flex-col justify-between hover:border-blue-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${rep.iconColor} text-white flex items-center justify-center font-bold text-lg shadow-xs`}>
                  {rep.title[0]}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{rep.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{rep.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => navigate(rep.route)}>
                Open Report →
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
