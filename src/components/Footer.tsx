export const Footer = () => {
  return (
    <footer className="border-t pt-10 pb-10 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      <div className="container mx-auto flex flex-col items-center gap-2 px-5">
        <div>© {new Date().getFullYear()} Reborn&apos;s Blog</div>
        <div className="flex items-center gap-2">
          <a href="/archive" className="hover:text-blue-600 dark:hover:text-blue-400">Archive</a>
          <span>·</span>
          <a href="/feed.xml" className="hover:text-blue-600 dark:hover:text-blue-400">RSS</a>
          <span>·</span>
          <a href="https://github.com/RebornL" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
