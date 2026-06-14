export interface PostMeta {
  title: string;
  date: string; // YYYY-MM-DD
  slug: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
  year: string;
}
