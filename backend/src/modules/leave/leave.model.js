import mongoose from 'mongoose';
import { LEAVE_TYPE_LIST, LEAVE_STATUS_LIST } from '../../config/constants.js';

const leaveRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    leaveType: {
      type: String,
      enum: LEAVE_TYPE_LIST,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    remarks: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: LEAVE_STATUS_LIST,
      default: 'PENDING'
    },
    adminComments: {
      type: String,
      default: ''
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
export default LeaveRequest;
