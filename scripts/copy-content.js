import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const sourceDir = path.join(projectRoot, 'content');
const destDir = path.join(projectRoot, 'public', 'content');

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyJsonRecursive(currentSource, currentDest) {
  ensureDirectory(currentDest);

  const entries = fs.readdirSync(currentSource, { withFileTypes: true });
  entries.forEach((entry) => {
    const sourcePath = path.join(currentSource, entry.name);
    const destPath = path.join(currentDest, entry.name);

    if (entry.isDirectory()) {
      copyJsonRecursive(sourcePath, destPath);
      return;
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      fs.copyFileSync(sourcePath, destPath);
      const relativePath = path.relative(sourceDir, sourcePath).replace(/\\/g, '/');
      console.log(`Copied ${relativePath} to public/content/`);
    }
  });
}

if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}

ensureDirectory(destDir);
copyJsonRecursive(sourceDir, destDir);

const hasCopiedFiles = fs.readdirSync(destDir, { withFileTypes: true }).some((entry) => {
  if (entry.isFile() && entry.name.endsWith('.json')) {
    return true;
  }
  return entry.isDirectory();
});

if (!hasCopiedFiles) {
  throw new Error('No JSON content files were copied.');
}

console.log('Content files copied successfully (recursive).');