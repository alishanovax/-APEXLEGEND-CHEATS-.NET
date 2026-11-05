export type { BlogBlock, BlogPostFull } from './blog/types';
export { blogPosts } from './blog/posts';

import type { BlogBlock } from './blog/types';
import { blogPosts } from './blog/posts';

const WORDS_PER_MINUTE = 200;

function blockPlainText(block: BlogBlock): string {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return block.text;
    case 'ul':
      return block.items.join(' ');
    case 'table':
      return [...block.headers, ...block.rows.flat()].join(' ');
    case 'cta':
      return `${block.title} ${block.text}`;
    default:
      return '';
  }
}

/** Estimate read time from post body (200 wpm); falls back to stored readTime. */
export function getPostReadTime(post: {
  readTime: string;
  desc?: string;
  body?: BlogBlock[];
}): string {
  if (!post.body?.length) return post.readTime;
  const text = [post.desc ?? '', ...post.body.map(blockPlainText)].join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs() {
  return blogPosts.map((p) => p.slug);
}

export function getFeaturedBlogPost() {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getNonFeaturedBlogPosts() {
  const featured = getFeaturedBlogPost();
  return blogPosts.filter((p) => p.slug !== featured?.slug);
}

export function getFeaturedBlogPosts(limit = 3) {
  const featured = getFeaturedBlogPost();
  const rest = blogPosts.filter((p) => p.slug !== featured?.slug);
  return featured ? [featured, ...rest].slice(0, limit) : blogPosts.slice(0, limit);
}

/** Homepage blog strip — spread dates across the year (not only the newest month). */
export function getHomepageBlogPosts(limit = 3) {
  if (blogPosts.length <= limit) return [...blogPosts];
  const sorted = [...blogPosts].sort(
    (a, b) => getBlogPostTimestamp(b.date) - getBlogPostTimestamp(a.date),
  );
  const indices =
    limit === 3
      ? [0, Math.floor(sorted.length / 2), sorted.length - 1]
      : sorted.map((_, i) => i).filter((_, i) => i % Math.ceil(sorted.length / limit) === 0);
  const picked = indices.slice(0, limit).map((i) => sorted[i]!);
  const unique = new Map<string, (typeof blogPosts)[0]>();
  for (const post of picked) unique.set(post.slug, post);
  return [...unique.values()];
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return [];

  const sameTag = blogPosts.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = blogPosts.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return [...sameTag, ...others].slice(0, limit);
}

export function getBlogPostsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((post): post is NonNullable<typeof post> => post != null);
}

export function getRelatedBlogPostsForProduct(relatedSlugs: string[], limit = 6) {
  const curated = getBlogPostsBySlugs(relatedSlugs);
  if (curated.length >= limit) return curated.slice(0, limit);

  const used = new Set(curated.map((p) => p.slug));
  const fill = blogPosts.filter((p) => !used.has(p.slug));
  return [...curated, ...fill].slice(0, limit);
}

export function getBlogTags() {
  return [...new Set(blogPosts.map((p) => p.tag))].sort((a, b) => a.localeCompare(b));
}

export function getBlogPostTimestamp(date: string) {
  return new Date(date).getTime();
}

export function getBlogReadMinutes(readTime: string) {
  const match = readTime.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}
