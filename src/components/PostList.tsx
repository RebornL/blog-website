'use client';

import { useState, useMemo } from 'react';
import { PostMeta } from '@/types';
import { PostCard } from '@/components/PostCard';

const PAGE_SIZE = 10;

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount]
  );
  const hasMore = visibleCount < posts.length;

  if (posts.length === 0) {
    return <p className="text-slate-400 italic">No posts yet.</p>;
  }

  return (
    <div>
      <section className="flex w-full flex-col items-stretch gap-6">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 cursor-pointer"
          >
            Load more
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {!hasMore && posts.length > PAGE_SIZE && (
        <p className="mt-8 text-center text-sm text-slate-400">
          All {posts.length} posts loaded
        </p>
      )}
    </div>
  );
}
