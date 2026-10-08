/**
 * Image compression and WebP optimization script using sharp.
 * Run: node compress-images.mjs
 * 
 * Scans all asset image directories and optimizes WebP images to max 1920px width.
 */
import sharp from 'sharp';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIRS = [
  'src/assets/images/about',
  'src/assets/images/avatars',
  'src/assets/images/hero',
  'src/assets/images/industries',
  'src/assets/images/products',
  'src/assets/images/quote',
  'src/assets/images/rnd',
  'src/assets/images/slider',
  'src/assets/images/whyus',
];

const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeWebP(filePath) {
  const sizeBefore = statSync(filePath).size;
  try {
    const inputBuffer = readFileSync(filePath);
    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    if (outputBuffer.length < sizeBefore) {
      writeFileSync(filePath, outputBuffer);
      const sizeAfter = outputBuffer.length;
      const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
      console.log(`  ✓ ${filePath}: ${(sizeBefore / 1024).toFixed(0)} KB → ${(sizeAfter / 1024).toFixed(0)} KB (−${reduction}%)`);
    } else {
      console.log(`  • ${filePath}: already optimally compressed`);
    }
  } catch (err) {
    console.error(`  ✗ Error processing ${filePath}:`, err.message);
  }
}

async function main() {
  for (const dir of DIRS) {
    try {
      console.log(`\nProcessing: ${dir}`);
      const files = readdirSync(dir).filter(f => /\.webp$/i.test(f));
      for (const file of files) {
        await optimizeWebP(join(dir, file));
      }
    } catch (e) {
      console.warn(`Could not read ${dir}:`, e.message);
    }
  }
  console.log('\nDone! All images checked & optimized.');
}

main();
