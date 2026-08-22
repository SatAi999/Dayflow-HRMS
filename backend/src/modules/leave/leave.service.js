import LeaveRequest from './leave.model.js';
import Employee from '../employees/employee.model.js';

export const createLeaveRequest = async (userId, requestData) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const leaveRequest = new LeaveRequest({
    employeeId: employee._id,
    leaveType: requestData.leaveType,
    startDate: new Date(requestData.startDate),
    endDate: new Date(requestData.endDate),
    remarks: requestData.remarks,
    status: 'PENDING'
  });

  await leaveRequest.save();
  return leaveRequest;
};

export const getLeavesByUserId = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return [];
  return await LeaveRequest.find({ employeeId: employee._id }).sort({ createdAt: -1 });
};

export const getAllLeaveRequests = async () => {
  return await LeaveRequest.find({})
    .populate({
      path: 'employeeId',
      select: 'firstName lastName designation'
    })
    .sort({ createdAt: -1 });
};

export const updateLeaveStatus = async (id, status, comments, reviewerUserId) => {
  const leaveRequest = await LeaveRequest.findById(id);
  if (!leaveRequest) throw new Error('Leave request not found.');
  if (leaveRequest.status !== 'PENDING') throw new Error('Leave request is already processed.');

  leaveRequest.status = status;
  leaveRequest.adminComments = comments || '';
  leaveRequest.approvedBy = reviewerUserId;

  await leaveRequest.save();
  return leaveRequest;
};
