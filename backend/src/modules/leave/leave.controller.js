import * as leaveService from './leave.service.js';

export const applyLeave = async (req, res, next) => {
  try {
    const leaveRequest = await leaveService.createLeaveRequest(req.user.id, req.body);
    res.status(201).json({ success: true, leaveRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};

export const getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await leaveService.getLeavesByUserId(req.user.id);
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    next(error);
  }
};

export const getAllLeaves = async (req, res, next) => {
  try {
    const leaves = await leaveService.getAllLeaveRequests();
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    next(error);
  }
};

export const approveLeave = async (req, res, next) => {
  try {
    const leaveRequest = await leaveService.updateLeaveStatus(req.params.id, 'APPROVED', req.body.comments, req.user.id);
    res.status(200).json({
      success: true,
      message: 'Leave request approved successfully.',
      leaveRequest
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};

export const rejectLeave = async (req, res, next) => {
  try {
    const leaveRequest = await leaveService.updateLeaveStatus(req.params.id, 'REJECTED', req.body.comments, req.user.id);
    res.status(200).json({
      success: true,
      message: 'Leave request rejected successfully.',
      leaveRequest
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};
