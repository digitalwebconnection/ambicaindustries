import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Get the secret key from environment variables (.env)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('⚠️ Warning: JWT_SECRET is not defined in .env file!');
}

/**
 * 1. Create (Sign) a new JWT token
 *
 * @param {Object} payload - The data you want to store in the token (e.g., { userId: "123" })
 * @param {string} expiresIn - How long the token is valid for (e.g., '1h', '7d', '15m')
 * @returns {string} The signed JWT token
 */
export const createToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * 2. Verify an incoming JWT token
 *
 * @param {string} token - The JWT string to verify
 * @returns {Object|null} The decoded payload if valid, or null if invalid/expired
 */
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

/**
 * -------------------------------------------------------------
 * Quick Test & Usage Example
 * -------------------------------------------------------------
 * Payload example as requested: { userId: "123" }
 */
export const runJwtExample = () => {
  console.log('--- JWT Example Demonstration ---');

  // Step 1: Define payload
  const payload = { userId: '123' };
  console.log('1. Original Payload:', payload);

  // Step 2: Sign the token using jwt.sign()
  const token = createToken(payload, '1h');
  console.log('2. Generated JWT Token:\n', token);

  // Step 3: Verify the token using jwt.verify()
  const verificationResult = verifyToken(token);
  console.log('3. Verification Result:', verificationResult);

  return { token, verificationResult };
};
