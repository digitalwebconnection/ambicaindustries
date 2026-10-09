import type { BlogArticle, BlogListResponse, SingleBlogResponse } from '@/types/blog';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

export interface FetchBlogsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch published blogs from backend
 */
export async function fetchBlogs(params: FetchBlogsParams = {}): Promise<BlogListResponse> {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));

  const url = `${API_BASE}/blogs${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs (status ${res.status})`);
  }

  return res.json();
}

/**
 * Fetch a single blog by slug from backend
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogArticle> {
  const url = `${API_BASE}/blogs/${encodeURIComponent(slug)}`;
  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Article not found`);
    }
    throw new Error(`Failed to fetch blog article (status ${res.status})`);
  }

  const json: SingleBlogResponse = await res.json();
  return json.data;
}
