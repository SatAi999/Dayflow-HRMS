import api from '../../../services/api/axios.js';
import { ENDPOINTS } from '../../../services/api/endpoints.js';

export const applyForLeave = async (leaveData) => {
  const response = await api.post(ENDPOINTS.LEAVE.CREATE, leaveData);
  return response.data;
};

export const getMyLeaveRequests = async () => {
  const response = await api.get(ENDPOINTS.LEAVE.ME);
  return response.data;
};

export const getAllLeaveRequests = async () => {
  const response = await api.get(ENDPOINTS.LEAVE.LIST);
  return response.data;
};

export const approveLeaveRequest = async (id, comments) => {
  const response = await api.put(ENDPOINTS.LEAVE.APPROVE(id), { comments });
  return response.data;
};

export const rejectLeaveRequest = async (id, comments) => {
  const response = await api.put(ENDPOINTS.LEAVE.REJECT(id), { comments });
  return response.data;
};
