import Employee from './employee.model.js';

export const getEmployeeByUserId = async (userId) => {
  return await Employee.findOne({ userId }).populate('userId', 'email employeeId role isVerified');
};

export const updateEmployeeProfile = async (userId, updateData) => {
  // Allow editing only specific allowed fields (address, phone, profilePicture)
  const allowedUpdates = {};
  if (updateData.phone !== undefined) allowedUpdates.phone = updateData.phone;
  if (updateData.address !== undefined) allowedUpdates.address = updateData.address;
  if (updateData.profilePicture !== undefined) allowedUpdates.profilePicture = updateData.profilePicture;

  const employee = await Employee.findOneAndUpdate(
    { userId },
    { $set: allowedUpdates },
    { new: true, runValidators: true }
  );

  if (!employee) {
    throw new Error('Employee profile not found.');
  }

  return employee;
};

export const getAllEmployees = async () => {
  return await Employee.find({}).populate('userId', 'employeeId email role');
};

export const getEmployeeById = async (id) => {
  return await Employee.findById(id).populate('userId', 'employeeId email role');
};

export const updateEmployeeAdminDetails = async (id, adminUpdates) => {
  // Full administrative edits
  const employee = await Employee.findByIdAndUpdate(
    id,
    { $set: adminUpdates },
    { new: true, runValidators: true }
  );

  if (!employee) {
    throw new Error('Employee profile not found.');
  }

  return employee;
};
