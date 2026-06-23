import fs from 'fs';
import path from 'path';

function getContentPath(filename: string): string {
  return path.join(process.cwd(), 'content', `${filename}.json`);
}

export function loadContent<T>(filename: string): T {
  try {
    const filePath = getContentPath(filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error loading content file: ${filename}`, error);
    return {} as T;
  }
}

export function saveContent<T>(filename: string, data: T): boolean {
  try {
    const filePath = getContentPath(filename);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error saving content file: ${filename}`, error);
    return false;
  }
}