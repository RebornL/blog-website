'use client';

import { useState, useMemo } from 'react';
import { PostMeta } from '@/types';
import { searchPosts } from '@/lib/posts-data';
import Link from 'next/link';

export function SearchClient({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchPosts(query, posts), [query, posts]);

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">Search</h1>

      <div className="relative mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        >
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
        </svg>
        <input
          type="text"
          placeholder="Search posts by title or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-base text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-400"
          autoFocus
        />
      </div>

      {query.trim() && (
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-6">
          {results.map((post) => (
            <article key={post.slug} className="group relative rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400">No posts found matching &ldquo;{query}&rdquo;</p>
      )}
    </main>
  );
}
