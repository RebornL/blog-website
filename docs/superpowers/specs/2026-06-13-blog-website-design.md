# Blog Website — Design Spec

**Date:** 2026-06-13
**Status:** In Progress

## Overview

A minimal tech blog powered by Next.js + MDX, deployed on Vercel. Content is authored in SiYuan Notes and synced to the repository via a sync script. 109 existing articles will be migrated.

## Architecture

```
SiYuan API → sync script → MDX files (content/) → Next.js SSG → Vercel
```

## Directory Structure

```
blogWebsite/
├── content/                    # Synced MDX articles (YY/MM-DD-slug.mdx)
├── public/images/              # Article images
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home — paginated post list
│   │   ├── posts/[slug]/page.tsx  # Article detail
│   │   ├── archive/page.tsx    # Year-grouped archive
│   │   └── feed.xml/route.ts   # RSS
│   ├── components/             # PostList, PostCard, Header, Footer, etc.
│   ├── lib/                    # posts.ts, siyuan.ts, sync.ts
│   ├── styles/globals.css      # Global styles
│   └── types/index.ts          # Post type
├── scripts/sync.mts            # Sync entry point
├── next.config.ts
├── mdx-components.tsx
├── tailwind.config.ts
└── package.json
```

## Pages

1. **Home `/`** — Paginated post list (10/page), Older/Newer nav
2. **Archive `/archive`** — Timeline grouped by year
3. **Post `/posts/[slug]`** — MDX-rendered article, prev/next nav
4. **RSS `/feed.xml`** — Generated RSS feed

## Tech Stack

- Next.js 15 App Router (SSG)
- MDX via next-mdx-remote
- Tailwind CSS
- System font stack
- Vercel deployment (default domain)

## Sync Strategy

1. Read all articles from SiYuan `/学习` notebook via MCP
2. Convert to MDX with frontmatter (title, date, slug, tags)
3. Write to `content/YYYY/MM-DD-slug.mdx`
4. Incremental: compare hashes, only update changed

## Future

- Dark mode toggle
- Tag/category filtering
- Full-text search
- Custom domain binding
