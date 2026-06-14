import { PostMeta } from '@/types';
import Link from 'next/link';

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post-list-item py-3">
      <Link href={`/posts/${post.slug}`} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 group">
        <time
          dateTime={post.date}
          className="text-sm text-zinc-400 whitespace-nowrap shrink-0 tabular-nums"
        >
          {post.date}
        </time>
        <span className="text-zinc-900 group-hover:text-blue-600 transition-colors">
          {post.title}
        </span>
      </Link>
    </article>
  );
}
