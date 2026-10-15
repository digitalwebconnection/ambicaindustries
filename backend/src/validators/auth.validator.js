import { ApiError } from '../utils/apiError.js';

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    throw ApiError.badRequest('Admin email is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw ApiError.badRequest('Invalid email format');
  }

  if (!password || typeof password !== 'string') {
    throw ApiError.badRequest('Password is required');
  }

  if (password.length < 6) {
    throw ApiError.badRequest('Password must be at least 6 characters');
  }

  next();
};
