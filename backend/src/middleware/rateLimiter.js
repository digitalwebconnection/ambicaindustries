/**
 * In-memory IP rate limiter and temporary blocker middleware
 * Prevents brute-force credential attacks and form spam
 */

export const createRateLimiter = ({
  windowMs = 15 * 60 * 1000,       // Time window (15 minutes default)
  maxRequests = 20,                 // Max attempts allowed within window (20 attempts)
  blockDurationMs = 15 * 60 * 1000, // Duration to block IP once limit exceeded (15 minutes)
  message = 'Too many attempts from this IP. You have been temporarily blocked for 15 minutes. Please try again later.'
} = {}) => {
  const ipStore = new Map();

  // Periodic cleanup to avoid memory leaks
  const intervalId = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipStore.entries()) {
      const isBlockActive = data.blockedUntil && now < data.blockedUntil;
      const isWindowActive = now - data.firstRequest <= windowMs;

      if (!isBlockActive && !isWindowActive) {
        ipStore.delete(ip);
      }
    }
  }, Math.max(windowMs, blockDurationMs));

  if (intervalId?.unref) {
    intervalId.unref();
  }

  return (req, res, next) => {
    // Robust IP extraction supporting proxies (Vercel, Render, Cloudflare, Nginx)
    const forwarded = req.headers['x-forwarded-for'];
    const rawIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) ||
      req.ip ||
      req.socket?.remoteAddress ||
      'unknown';

    // Normalize IPv6 mapped IPv4 if present (e.g. ::ffff:127.0.0.1 -> 127.0.0.1)
    const ip = rawIp.replace(/^.*:/, '') || rawIp;
    const now = Date.now();

    let record = ipStore.get(ip);

    // 1. Check if IP is currently under an active block
    if (record && record.blockedUntil) {
      if (now < record.blockedUntil) {
        const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
        res.set('Retry-After', String(retryAfter));
        return res.status(429).json({
          success: false,
          message,
          retryAfterSeconds: retryAfter
        });
      }

      // Block period has expired -> reset record for a fresh start
      ipStore.delete(ip);
      record = null;
    }

    // 2. If new IP or the 15-minute sliding window has expired, start a fresh window
    if (!record || (now - record.firstRequest > windowMs)) {
      ipStore.set(ip, {
        count: 1,
        firstRequest: now,
        blockedUntil: null
      });
      return next();
    }

    // 3. Increment request count within the active window
    record.count += 1;

    // 4. If attempts exceed the limit (e.g. 21st attempt)
    if (record.count > maxRequests) {
      if (!record.blockedUntil) {
        record.blockedUntil = now + blockDurationMs;
      }
      const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({ 
        success: false,
        message,
        retryAfterSeconds: retryAfter
      });
    }

    next();
  };
};

// Login Limiter: Max 20 attempts in 15 minutes; if exceeded, block IP for 15 minutes
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,       // 15 minutes window
  maxRequests: 20,                 // 20 attempts
  blockDurationMs: 15 * 60 * 1000, // 15 minutes block
  message: 'Too many login attempts from this IP. You have been blocked for 15 minutes. Please try again later.'
});

export const leadLimiter = createRateLimiter({
  windowMs: 60 * 1000,             // 1 minute
  maxRequests: 5,                  // 5 attempts
  blockDurationMs: 5 * 60 * 1000,  // 5 minutes block
  message: 'Form submission limit reached. Please wait a moment before sending another request.'
});
