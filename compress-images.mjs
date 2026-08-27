/**
 * Image compression script using sharp.
 * Run: node compress-images.mjs
 * 
 * Compresses all hero and product JPGs to max 1920px width, quality 75, progressive.
 * Overwrites originals in-place.
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIRS = [
  'src/assets/images/hero',
  'src/assets/images/products',
];

const MAX_WIDTH = 1920;
const QUALITY = 75;

async function compressImage(filePath) {
  const sizeBefore = statSync(filePath).size;
  if (sizeBefore < 300_000) {
    console.log(`  SKIP ${filePath} (${(sizeBefore / 1024).toFixed(0)} KB — already small)`);
    return;
  }

  try {
    const { readFileSync, writeFileSync } = await import('fs');
    const inputBuffer = readFileSync(filePath);

    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer();

    writeFileSync(filePath, outputBuffer);
    const sizeAfter = outputBuffer.length;
    const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
    console.log(`  ✓ ${filePath}: ${(sizeBefore / 1024 / 1024).toFixed(1)} MB → ${(sizeAfter / 1024).toFixed(0)} KB (−${reduction}%)`);
  } catch (err) {
    console.error(`  ✗ Error processing ${filePath}:`, err.message);
  }
}

async function main() {
  for (const dir of DIRS) {
    console.log(`\nProcessing: ${dir}`);
    const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    for (const file of files) {
      await compressImage(join(dir, file));
    }
  }
  console.log('\nDone! All images compressed.');
}

main();
