import LeaveRequest from './leave.model.js';
import Employee from '../employees/employee.model.js';
import Attendance from '../attendance/attendance.model.js';
import Notification from '../notifications/notification.model.js';

/**
 * Submits a new leave request with overlap check and past dates validation.
 */
export const createLeaveRequest = async (userId, requestData) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) throw new Error('Employee profile not found.');

  const startDate = new Date(requestData.startDate);
  const endDate = new Date(requestData.endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDate < today) {
    throw new Error('Leave start date cannot be in the past.');
  }

  if (startDate > endDate) {
    throw new Error('Start date must be on or before end date.');
  }

  // Overlapping leaves check
  const overlapping = await LeaveRequest.findOne({
    employeeId: employee._id,
    status: { $ne: 'REJECTED' },
    $or: [
      { startDate: { $gte: startDate, $lte: endDate } },
      { endDate: { $gte: startDate, $lte: endDate } },
      { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
    ]
  });

  if (overlapping) {
    throw new Error('You already have an active leave application matching this date range.');
  }

  const leaveRequest = new LeaveRequest({
    employeeId: employee._id,
    leaveType: requestData.leaveType,
    startDate,
    endDate,
    remarks: requestData.remarks,
    status: 'PENDING'
  });

  await leaveRequest.save();

  // Notify HR/Admin about new request (in real system, notify HR user group; here notify mock user)
  // Find admin or HR users
  return leaveRequest;
};

/**
 * Returns leave requests submitted by the logged-in employee.
 */
export const getLeavesByUserId = async (userId) => {
  const employee = await Employee.findOne({ userId });
  if (!employee) return [];
  return await LeaveRequest.find({ employeeId: employee._id }).sort({ startDate: -1 });
};

/**
 * Returns all leave requests for HR/Admin reviews.
 */
export const getAllLeaveRequests = async () => {
  return await LeaveRequest.find({})
    .populate({
      path: 'employeeId',
      select: 'firstName lastName designation department'
    })
    .sort({ createdAt: -1 });
};

/**
 * Approves or Rejects a leave request, sends notifications, and syncs attendance.
 */
export const updateLeaveStatus = async (id, status, comments, reviewerUserId) => {
  const leaveRequest = await LeaveRequest.findById(id).populate('employeeId');
  if (!leaveRequest) throw new Error('Leave request not found.');
  if (leaveRequest.status !== 'PENDING') throw new Error('Leave request is already processed.');

  leaveRequest.status = status;
  leaveRequest.adminComments = comments || '';
  leaveRequest.approvedBy = reviewerUserId;

  await leaveRequest.save();

  // 1. Create user notification
  const employee = leaveRequest.employeeId;
  const notification = new Notification({
    userId: employee.userId,
    title: `Leave Request ${status}`,
    message: `Your leave request for ${new Date(leaveRequest.startDate).toLocaleDateString()} to ${new Date(leaveRequest.endDate).toLocaleDateString()} has been ${status.toLowerCase()}. ${comments ? 'Comments: ' + comments : ''}`
  });
  await notification.save();

  // 2. If approved, pre-populate attendance records for those dates
  if (status === 'APPROVED') {
    let currentDate = new Date(leaveRequest.startDate);
    const end = new Date(leaveRequest.endDate);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      
      // Upsert attendance record for each date as 'LEAVE'
      await Attendance.findOneAndUpdate(
        { employeeId: employee._id, date: dateString },
        {
          $set: {
            status: 'LEAVE',
            checkIn: currentDate, // Mock check-in
            checkOut: currentDate
          }
        },
        { upsert: true }
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return leaveRequest;
};
