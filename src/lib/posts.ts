import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllPostSlugs(): string[] {
  const slugs: string[] = [];
  walkDir(CONTENT_DIR, (filePath) => {
    if (filePath.endsWith('.mdx') || filePath.endsWith('.md')) {
      const relative = path.relative(CONTENT_DIR, filePath);
      const slug = relative.replace(/\.(mdx|md)$/, '').replace(/\\/g, '/');
      slugs.push(slug);
    }
  });
  return slugs;
}

function walkDir(dir: string, callback: (filePath: string) => void): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function slugToFilePath(slug: string): string | null {
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (fs.existsSync(mdPath)) return mdPath;
  if (fs.existsSync(mdxPath)) return mdxPath;
  return null;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = slugToFilePath(slug);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    title: data.title || slug.split('/').pop() || 'Untitled',
    date: data.date || '',
    slug,
    tags: data.tags || [],
    content,
    year: (data.date || '').slice(0, 4) || slug.split('/')[0] || '',
  };
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map(getPostBySlug).filter((p): p is Post => p !== null);
  return posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getAllPostMetas(): PostMeta[] {
  return getAllPosts().map(({ content: _, ...meta }) => meta);
}

export function getPostsByYear(): Record<string, PostMeta[]> {
  const byYear: Record<string, PostMeta[]> = {};
  for (const post of getAllPostMetas()) {
    const year = post.date?.slice(0, 4) || 'unknown';
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(post);
  }
  // Sort years descending
  const sorted: Record<string, PostMeta[]> = {};
  Object.keys(byYear)
    .sort((a, b) => b.localeCompare(a))
    .forEach((y) => (sorted[y] = byYear[y]));
  return sorted;
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const all = getAllPostMetas();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
