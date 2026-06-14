import { getPostsByYear } from '@/lib/posts';
import Link from 'next/link';

export default function ArchivePage() {
  const byYear = getPostsByYear();
  const years = Object.keys(byYear);

  return (
    <div className="flex-1">
      <header className="container-narrow pt-20 pb-2">
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          ← Home
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-4">Archive</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {Object.values(byYear).flat().length} posts across {years.length} years
        </p>
      </header>

      <main className="container-narrow pt-10 pb-20">
        {years.map((year) => (
          <section key={year} className="mb-10">
            <h2 className="text-lg font-semibold text-zinc-900 mb-3 sticky top-0 bg-white py-1">
              {year}{' '}
              <span className="text-sm font-normal text-zinc-400">
                ({byYear[year].length})
              </span>
            </h2>
            <ul className="space-y-1.5">
              {byYear[year].map((post) => (
                <li key={post.slug} className="flex items-baseline gap-3 post-list-item">
                  <time
                    dateTime={post.date}
                    className="text-sm text-zinc-400 whitespace-nowrap shrink-0 tabular-nums"
                  >
                    {post.date?.slice(5) || '—'}
                  </time>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-zinc-900 hover:text-blue-600 transition-colors truncate"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
