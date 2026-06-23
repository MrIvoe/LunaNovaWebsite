'use client';

import { useState, useEffect } from 'react';

// Client-side content loader for static export
export function useContent<T>(filename: string): T | null {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    fetch(`${basePath}/content/${filename}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${filename}`);
        return res.json();
      })
      .then(data => {
        setContent(data as T);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.error(`Error loading content: ${filename}`, err);
      });
  }, [filename]);

  if (loading) return null;
  if (error) return null;
  return content;
}

// For build-time/ssr loading (when not using static export)
// This is the original server-side loader - keep for reference
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