'use client';

import { useState, useEffect } from 'react';

// Client-side content loader for static export / client-side navigation
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

  if (loading || error) return null;
  return content;
}