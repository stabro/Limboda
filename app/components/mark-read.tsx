'use client';
import { useEffect } from 'react';

export function MarkRead({ newsId }: { newsId: string }) {
  useEffect(() => {
    const t = setTimeout(() => {
      fetch('/api/news/read', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ newsId }) });
    }, 2000);
    return () => clearTimeout(t);
  }, [newsId]);
  return null;
}
