// Client-safe types and data — no fs imports
import { PostMeta } from '@/types';

// This file is safe to import in client components
export function searchPosts(query: string, posts: PostMeta[]): PostMeta[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)))
  );
}
