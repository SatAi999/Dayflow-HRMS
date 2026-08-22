import * as employeeService from './employee.service.js';

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await employeeService.getEmployeeByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Employee profile not found.', errorCode: 'NOT_FOUND' });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const profile = await employeeService.updateEmployeeProfile(req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      profile
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeDetail = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.', errorCode: 'NOT_FOUND' });
    }
    res.status(200).json({ success: true, employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeByAdmin = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployeeAdminDetails(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Employee details updated successfully.',
      employee
    });
  } catch (error) {
    next(error);
  }
};
