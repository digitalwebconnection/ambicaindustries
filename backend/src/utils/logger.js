/**
 * Structured Logger for Backend Services
 */
const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (msg, meta = {}) => {
    console.log(`[INFO]  [${getTimestamp()}] ${msg}`, Object.keys(meta).length ? meta : '');
  },
  warn: (msg, meta = {}) => {
    console.warn(`[WARN]  [${getTimestamp()}] ⚠️ ${msg}`, Object.keys(meta).length ? meta : '');
  },
  error: (msg, error = null) => {
    console.error(`[ERROR] [${getTimestamp()}] ❌ ${msg}`, error ? (error.stack || error) : '');
  },
  debug: (msg, meta = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] [${getTimestamp()}] 🔍 ${msg}`, Object.keys(meta).length ? meta : '');
    }
  },
};

export default logger;
