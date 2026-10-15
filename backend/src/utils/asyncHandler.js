/**
 * Higher-order controller wrapper to eliminate repetitive try-catch blocks
 * Automatically forwards unhandled rejections to the global error middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
