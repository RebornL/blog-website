'use client';

import { useState, useMemo } from 'react';
import { PostMeta } from '@/types';
import { PostCard } from '@/components/PostCard';

const PAGE_SIZE = 10;

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const pagePosts = useMemo(
    () => posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [posts, page]
  );

  if (posts.length === 0) {
    return (
      <p className="text-zinc-400 italic">
        No posts yet. Content will appear here after syncing from SiYuan.
      </p>
    );
  }

  return (
    <div>
      <div className="divide-y divide-zinc-100">
        {pagePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-between mt-10 text-sm">
          {page > 1 ? (
            <button
              onClick={() => setPage(page - 1)}
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              ← Older
            </button>
          ) : (
            <span />
          )}
          <span className="text-zinc-400">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <button
              onClick={() => setPage(page + 1)}
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Newer →
            </button>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
