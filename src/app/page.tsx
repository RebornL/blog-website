import { getAllPostMetas } from '@/lib/posts';
import { PostList } from '@/components/PostList';

export default function HomePage() {
  const posts = getAllPostMetas();
  return (
    <div className="flex-1">
      <header className="container-narrow pt-20 pb-12">
        <h1 className="text-2xl font-semibold tracking-tight">Reborn&apos;s Blog</h1>
        <p className="mt-2 text-zinc-500 text-base">
          Notes on software, systems, and learning.
        </p>
      </header>
      <main className="container-narrow pb-20">
        <PostList posts={posts} />
      </main>
      <footer className="container-narrow pb-12 text-sm text-zinc-400">
        <div className="flex gap-6 border-t border-zinc-100 pt-6">
          <a href="/archive">Archive</a>
          <a href="/feed.xml">RSS</a>
        </div>
      </footer>
    </div>
  );
}
