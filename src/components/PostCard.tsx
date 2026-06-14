import { PostMeta } from '@/types';
import Link from 'next/link';

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        {post.tags && post.tags.length > 0 && (
          <p className="line-clamp-2 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {post.tags.join(', ')}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 text-sm text-slate-500 dark:text-slate-400">
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
}
