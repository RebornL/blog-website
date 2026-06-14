import { getAllPostMetas } from '@/lib/posts';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { SearchClient } from './SearchClient';

export default function SearchPage() {
  const posts = getAllPostMetas();

  return (
    <Container className="mx-auto flex max-w-3xl flex-col items-stretch gap-10 px-5 py-10">
      <Header />
      <SearchClient posts={posts} />
      <Footer />
    </Container>
  );
}
