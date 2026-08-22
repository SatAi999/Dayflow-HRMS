import api from '../../../services/api/axios.js';
import { ENDPOINTS } from '../../../services/api/endpoints.js';

export const getMyPayroll = async () => {
  const response = await api.get(ENDPOINTS.PAYROLL.ME);
  return response.data;
};

export const getEmployeePayrolls = async () => {
  const response = await api.get(ENDPOINTS.PAYROLL.LIST);
  return response.data;
};

export const updateSalaryStructure = async (employeeId, salaryData) => {
  const response = await api.put(ENDPOINTS.PAYROLL.UPDATE(employeeId), salaryData);
  return response.data;
};
