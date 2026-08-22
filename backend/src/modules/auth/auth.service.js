import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/environment.js';
import User from './auth.model.js';
import Employee from '../employees/employee.model.js';

/**
 * Generates JWT authorization tokens.
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      employeeId: user.employeeId,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Registers new user and synchronizes their Employee profile document.
 */
export const registerUser = async (userData) => {
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { employeeId: userData.employeeId }]
  });

  if (existingUser) {
    throw new Error('User with this email or Employee ID already exists.');
  }

  // 1. Create and save the User credentials document
  const newUser = new User({
    employeeId: userData.employeeId,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'EMPLOYEE'
  });
  await newUser.save();

  // 2. Synchronize by creating the associated Employee profile document
  const defaultEmployee = new Employee({
    userId: newUser._id,
    firstName: userData.firstName || 'Employee',
    lastName: userData.lastName || 'User',
    phone: userData.phone || '0000000000',
    address: userData.address || 'Address Placeholder',
    designation: userData.role === 'ADMIN' || userData.role === 'HR' ? 'HR Specialist' : 'Staff Associate',
    department: 'Operations',
    joiningDate: new Date()
  });
  await defaultEmployee.save();

  return newUser;
};

/**
 * Authenticates user credentials.
 */
export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  return user;
};
