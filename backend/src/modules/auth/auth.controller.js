import * as authService from './auth.service.js';

export const signup = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      user: {
        id: user._id,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    const token = authService.generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message, errorCode: 'UNAUTHORIZED' });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    // Placeholder verification
    res.status(200).json({
      success: true,
      message: 'Email verified successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (error) {
    next(error);
  }
};
