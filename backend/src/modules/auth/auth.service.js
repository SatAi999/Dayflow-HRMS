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
