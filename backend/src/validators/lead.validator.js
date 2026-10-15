import { ApiError } from '../utils/apiError.js';

export const validateLead = (req, res, next) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !fullName.trim()) {
    throw ApiError.badRequest('Contact full name is required');
  }

  if (!email || !email.trim()) {
    throw ApiError.badRequest('Email address is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw ApiError.badRequest('Please enter a valid email address');
  }

  if (!message || !message.trim()) {
    throw ApiError.badRequest('Inquiry message is required');
  }

  next();
};
