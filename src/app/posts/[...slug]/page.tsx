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
    <div className="container-narrow mx-auto max-w-3xl px-5 py-10">
      <header className="pb-2">
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          ← Back
        </Link>
      </header>

      <article className="pt-6 pb-12">
        <header className="mb-10">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
            {post.title}
          </h1>
          {post.date && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{post.date}</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>|</span>
                  <span>
                    {post.tags.map((tag, i) => (
                      <span key={tag}>
                        {i > 0 && ', '}
                        {tag}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        <MdxRenderer source={post.content} />
      </article>

      <nav className="pb-20">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex justify-between text-sm">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors max-w-[45%] truncate"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors max-w-[45%] truncate text-right"
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
