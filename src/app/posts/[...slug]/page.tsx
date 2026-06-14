import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAdjacentPosts, getAllPostSlugs } from '@/lib/posts';
import { MdxRenderer } from '@/components/MdxRenderer';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';

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
    <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
      <Header />

      <article className="mx-auto w-full max-w-2xl pb-10">
        <header className="mb-8 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-slate-500 dark:text-slate-400">
            <span>{post.date}</span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span>·</span>
                <span>{post.tags.join(', ')}</span>
              </>
            )}
          </div>
        </header>

        <div className="prose prose-slate mx-auto dark:prose-invert">
          <MdxRenderer source={post.content} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <nav className="w-full">
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

      <Footer />
    </Container>
  );
}
