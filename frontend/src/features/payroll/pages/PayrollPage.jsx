import React, { useState, useEffect } from 'react';
import * as payrollService from '../services/payrollService.js';

export default function PayrollPage() {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await payrollService.getMyPayroll();
        if (res.success) {
          setPayroll(res.payroll);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'No active payroll record found for the current period.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value || 0);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Retrieving payroll information, please wait...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Payroll & Salary Structure</h1>
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Developer: Member 3</span>
      </div>

      {error ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700 rounded shadow-sm">
          <p className="font-semibold">Notice</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Net Salary Card */}
          <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-lg p-6 text-white shadow-md">
            <p className="text-sm font-medium opacity-80">Net Salary ({payroll.payPeriod})</p>
            <p className="text-4xl font-bold mt-1">{formatCurrency(payroll.netSalary)}</p>
            <div className="mt-4 flex justify-between text-xs opacity-90 border-t border-white/20 pt-4">
              <span>Basic Salary: {formatCurrency(payroll.basicSalary)}</span>
              <span>Allowances: +{formatCurrency(payroll.allowances)}</span>
              <span>Deductions: -{formatCurrency(payroll.deductions)}</span>
            </div>
          </div>

          {/* Breakdown Sheet */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payslip Breakdown</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Basic Pay</span>
                <span className="text-gray-950 font-semibold">{formatCurrency(payroll.basicSalary)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Allowances (Medical, Conveyance)</span>
                <span className="text-green-600 font-semibold">+{formatCurrency(payroll.allowances)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Deductions (Professional Tax, Insurance)</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(payroll.deductions)}</span>
              </div>
              <div className="flex justify-between py-3 font-semibold text-lg border-t border-gray-200 mt-2">
                <span className="text-gray-900">Total Take-Home Pay</span>
                <span className="text-primary-600">{formatCurrency(payroll.netSalary)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => alert('Download slip triggers generating a PDF copy of this payroll period statement.')}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium text-sm transition duration-150"
              >
                Download Salary Slip (PDF)
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded text-xs text-gray-500">
            <strong>Important Notice:</strong> Payroll data is read-only for employees. For corrections or modifications to your salary structure, contact your HR Officer or System Administrator.
          </div>
        </div>
      )}
    </div>
  );
}
