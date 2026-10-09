import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.join(__dirname, 'backend');

console.log('🚀 Forwarding to backend server from root entry point...');

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
