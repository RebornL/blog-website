import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAdjacentPosts, getAllPostSlugs } from '@/lib/posts';
import { MdxRenderer } from '@/components/MdxRenderer';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  const post = getPostBySlug(slugStr);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slugStr);

  return (
    <div className="flex-1">
      <header className="container-narrow pt-8 pb-2">
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          ← Back
        </Link>
      </header>

      <article className="container-narrow pt-6 pb-12">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold leading-snug tracking-tight">
            {post.title}
          </h1>
          {post.date && (
            <time
              dateTime={post.date}
              className="mt-2 inline-block text-sm text-zinc-400"
            >
              {post.date}
            </time>
          )}
        </header>

        <MdxRenderer source={post.content} />
      </article>

      <nav className="container-narrow pb-20">
        <div className="border-t border-zinc-100 pt-6 flex justify-between text-sm">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="text-zinc-500 hover:text-zinc-900 transition-colors max-w-[45%] truncate"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="text-zinc-500 hover:text-zinc-900 transition-colors max-w-[45%] truncate text-right"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </div>
  );
}
