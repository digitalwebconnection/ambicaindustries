import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting frontend build process...');

// 1. Install frontend dependencies and build
execSync('npm --prefix frontend install', { stdio: 'inherit' });
execSync('npm --prefix frontend run build', { stdio: 'inherit' });

// 2. Mirror frontend/dist to root dist for Vercel/Netlify auto-detection
const frontendDist = path.resolve(process.cwd(), 'frontend', 'dist');
const rootDist = path.resolve(process.cwd(), 'dist');

if (fs.existsSync(frontendDist)) {
  if (fs.existsSync(rootDist)) {
    fs.rmSync(rootDist, { recursive: true, force: true });
  }
  fs.cpSync(frontendDist, rootDist, { recursive: true });
  console.log('Successfully mirrored frontend/dist to ./dist for root deployment');
}
