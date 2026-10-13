/**
 * Ambica Industries - Root Server Entry Point
 * 
 * Thin proxy launcher that delegates to the canonical backend server
 * at `backend/src/server.js` with the correct working directory context.
 * 
 * For direct backend startup, prefer running:
 *   npm --prefix backend start
 * or from root:
 *   npm start
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.join(__dirname, 'backend');

console.log('🚀 [Root Launcher] Forwarding to backend server (backend/src/server.js)...');

const child = spawn(process.execPath, ['src/server.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start backend server:', err);
  process.exit(1);
});
