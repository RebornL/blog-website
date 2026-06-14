import { getAllPostMetas } from '@/lib/posts';
import { PostList } from '@/components/PostList';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const posts = getAllPostMetas();
  const totalCount = posts.length;

  return (
    <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
      <Header />

      {/* Author / About card */}
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            R
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">Reborn</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Software Engineer</p>
          </div>
        </div>
        <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
          <p>Notes on software, systems, and learning.</p>
        </div>
        <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">About this blog</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {totalCount} posts covering Java, HarmonyOS, Machine Learning, System Design, and more.
          </p>
        </div>
      </div>

      {/* Posts */}
      <PostList posts={posts} />
      <Footer />
    </Container>
  );
}
