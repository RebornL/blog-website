import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.SITE_URL || 'https://blog.vercel.app';

  const items = posts
    .map(
      (post) => `
    <entry>
      <title><![CDATA[${post.title}]]></title>
      <link href="${siteUrl}/posts/${post.slug}"/>
      <id>${siteUrl}/posts/${post.slug}</id>
      <updated>${post.date || ''}</updated>
      <content type="html"><![CDATA[${post.content.slice(0, 2000)}]]></content>
    </entry>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Reborn's Blog</title>
  <link href="${siteUrl}"/>
  <id>${siteUrl}/</id>
  <updated>${new Date().toISOString()}</updated>
  ${items}
</feed>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
