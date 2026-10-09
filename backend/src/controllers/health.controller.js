/**
 * Health check controller
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sunny Solar Backend API is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`
  });
};
