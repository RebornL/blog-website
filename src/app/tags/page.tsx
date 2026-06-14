import { getAllTags } from '@/lib/posts';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
      <Header />
      <main>
        <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">Tags</h1>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-block rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </Container>
  );
}
