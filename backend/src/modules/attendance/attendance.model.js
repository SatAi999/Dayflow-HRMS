import mongoose from 'mongoose';
import { ATTENDANCE_STATUS_LIST } from '../../config/constants.js';

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    date: {
      type: String, // format YYYY-MM-DD
      required: true
    },
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date
    },
    status: {
      type: String,
      enum: ATTENDANCE_STATUS_LIST,
      default: 'PRESENT'
    }
  },
  {
    timestamps: true
  }
);

// Create compound index for single daily entry per employee
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
