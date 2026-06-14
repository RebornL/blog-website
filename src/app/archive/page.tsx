import { getAllPostMetas } from '@/lib/posts';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ArchivePage() {
  const posts = getAllPostMetas();

  // Group by year then month
  const groups: Record<number, Record<number, typeof posts>> = {};
  for (const post of posts) {
    if (!post.date) continue;
    const d = new Date(post.date);
    const y = d.getFullYear();
    const m = d.getMonth();
    if (!groups[y]) groups[y] = {};
    if (!groups[y][m]) groups[y][m] = [];
    groups[y][m].push(post);
  }

  const years = Object.entries(groups)
    .map(([year, months]) => ({
      year: parseInt(year),
      months: Object.entries(months)
        .map(([month, monthPosts]) => ({
          month: parseInt(month),
          monthName: MONTHS[parseInt(month)],
          posts: monthPosts.sort((a, b) => (b.date || '').localeCompare(a.date || '')),
          postCount: monthPosts.length,
        }))
        .sort((a, b) => b.month - a.month),
    }))
    .sort((a, b) => b.year - a.year);

  return (
    <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
      <Header />
      <main>
        <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">Archive</h1>
        <div className="space-y-12">
          {years.map(({ year, months }) => (
            <section key={year}>
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{year}</h2>
              <div className="space-y-8">
                {months.map(({ month, monthName, posts: monthPosts, postCount }) => (
                  <div key={month} className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      {monthName} <span className="text-slate-500">({postCount})</span>
                    </h3>
                    <ul className="space-y-4">
                      {monthPosts.map((post) => (
                        <li key={post.slug} className="group">
                          <Link
                            href={`/posts/${post.slug}`}
                            className="flex flex-col space-y-1"
                          >
                            <span className="text-base text-slate-900 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                              {post.title}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {post.date}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </Container>
  );
}
