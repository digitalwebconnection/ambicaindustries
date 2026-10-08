/**
 * Security & Sanitization Utilities
 * Ambica Industry Web Application
 */

/**
 * Sanitizes user input string by stripping potential HTML, script tags,
 * and dangerous URI schemes to prevent XSS (Cross-Site Scripting).
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    // Strip script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Strip iframe tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Strip html tags
    .replace(/<[^>]+>/g, '')
    // Strip javascript: pseudo-protocols
    .replace(/javascript:/gi, '')
    // Strip data: text/html
    .replace(/data:text\/html/gi, '')
    // Strip dangerous event handler attributes if pasted
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Validates whether an input contains obvious XSS / script payload indicators.
 */
export function containsSuspiciousPayload(input: string): boolean {
  if (!input) return false;
  const lower = input.toLowerCase();
  const dangerousPatterns = [
    '<script',
    '</script',
    'javascript:',
    'onload=',
    'onerror=',
    'onclick=',
    'eval(',
    'document.cookie',
    'window.location',
    '<iframe',
    '<svg/onload',
  ];

  return dangerousPatterns.some((pattern) => lower.includes(pattern));
}

/**
 * Simple client-side submission rate limiter to mitigate bot flooding.
 * Returns true if allowed, false if submitted too quickly.
 */
export function checkSubmissionRateLimit(
  formKey = 'default_form',
  cooldownMs = 4000
): boolean {
  try {
    const key = `ambica_rate_limit_${formKey}`;
    const lastSubTime = sessionStorage.getItem(key);
    const now = Date.now();

    if (lastSubTime) {
      const elapsed = now - parseInt(lastSubTime, 10);
      if (elapsed < cooldownMs) {
        return false;
      }
    }

    sessionStorage.setItem(key, now.toString());
    return true;
  } catch {
    // If sessionStorage is unavailable, permit standard submission
    return true;
  }
}
