import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags
    .filter((t) => !t.startsWith('.'))
    .map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) notFound();

  return (
    <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
      <Header />
      <main>
        <div className="mb-8">
          <Link href="/tags" className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            ← All tags
          </Link>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
          #{decodedTag}
        </h1>
        <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="group relative rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </Container>
  );
}
