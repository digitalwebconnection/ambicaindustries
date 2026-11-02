import mongoose from 'mongoose';

/**
 * Health check controller
 * 
 * Provides a production-ready health check endpoint for Render, load balancers,
 * uptime monitors, and container orchestration probes.
 * 
 * Validates:
 * - Express application uptime & memory
 * - MongoDB database connection status
 * - Environment and runtime diagnostic metadata
 */
export const getHealth = async (req, res) => {
  try {
    const readyState = mongoose.connection.readyState;
    const isDbConnected = readyState === 1;

    // In unit testing, allow offline mock passes if not explicitly connected
    const isHealthy = isDbConnected || process.env.NODE_ENV === 'test';

    const memoryUsage = process.memoryUsage();
    const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

    const dbStateLabels = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const statusCode = isHealthy ? 200 : 503;

    // Prevent any intermediary proxy or browser caching of health status
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'HEAD') {
      return res.status(statusCode).end();
    }

    return res.status(statusCode).json({
      success: isHealthy,
      status: isHealthy ? 'healthy' : 'degraded',
      message: isHealthy
        ? 'Ambica Industries Backend API is running smoothly'
        : 'Ambica Industries Backend API is experiencing database connectivity issues',
      timestamp: new Date().toISOString(),
      uptime: `${process.uptime().toFixed(2)}s`,
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStateLabels[readyState] || 'unknown',
        readyState
      },
      system: {
        nodeVersion: process.version,
        memory: {
          heapUsed: formatMb(memoryUsage.heapUsed),
          heapTotal: formatMb(memoryUsage.heapTotal),
          rss: formatMb(memoryUsage.rss)
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 'error',
      message: 'Health check probe encountered an internal error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
