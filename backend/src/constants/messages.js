/**
 * Centralized Application Messages
 */
export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Admin logged in successfully',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Access denied. Valid authentication token required.',
    FORBIDDEN: 'Access forbidden. You do not possess the required permissions.',
    TOKEN_EXPIRED: 'Session expired. Please log in again.',
  },
  BLOG: {
    CREATED: 'Blog post created successfully',
    UPDATED: 'Blog post updated successfully',
    DELETED: 'Blog post deleted successfully',
    NOT_FOUND: 'Blog post not found',
    SLUG_EXISTS: 'A blog post with this title or URL slug already exists',
  },
  LEAD: {
    SUBMITTED: 'Inquiry received successfully. Our export desk will get in touch.',
    NOT_FOUND: 'Inquiry not found',
    UPDATED: 'Inquiry status updated successfully',
  },
  SERVER: {
    INTERNAL_ERROR: 'An unexpected internal server error occurred',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again in a few minutes.',
  },
};

export default MESSAGES;
