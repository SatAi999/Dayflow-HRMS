import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/environment.js';
import User from './auth.model.js';

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

import Employee from '../employees/employee.model.js';

/**
 * Registers new user.
 */
export const registerUser = async (userData) => {
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { employeeId: userData.employeeId }]
  });

  if (existingUser) {
    throw new Error('User with this email or Employee ID already exists.');
  }

  const newUser = new User(userData);
  await newUser.save();

  // Create an associated Employee profile with placeholder data
  const newEmployee = new Employee({
    userId: newUser._id,
    firstName: 'New',
    lastName: 'User',
    phone: 'Not Provided',
    address: 'Not Provided',
    designation: 'Not Provided',
    department: 'Not Provided',
    joiningDate: new Date()
  });
  await newEmployee.save();

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
