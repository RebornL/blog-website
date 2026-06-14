import { getPostsByYear } from '@/lib/posts';
import Link from 'next/link';

export default function ArchivePage() {
  const byYear = getPostsByYear();
  const years = Object.keys(byYear);

  return (
    <div className="container-narrow mx-auto max-w-3xl px-5 py-10">
      <header className="pb-2">
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          ← Home
        </Link>
        <h1 className="text-2xl font-bold tracking-tight mt-4 text-slate-900 dark:text-white">
          Archive
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {Object.values(byYear).flat().length} posts across {years.length} years
        </p>
      </header>

      <main className="pt-10 pb-20">
        {years.map((year) => (
          <section key={year} className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-3 sticky top-0 bg-white dark:bg-slate-950 dark:text-white py-1">
              {year}{' '}
              <span className="text-sm font-normal text-slate-400">
                ({byYear[year].length})
              </span>
            </h2>
            <ul className="space-y-1.5">
              {byYear[year].map((post) => (
                <li key={post.slug} className="flex items-baseline gap-3 group">
                  <time
                    dateTime={post.date}
                    className="text-sm text-slate-400 whitespace-nowrap shrink-0 tabular-nums"
                  >
                    {post.date?.slice(5) || '—'}
                  </time>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400 transition-colors truncate"
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
