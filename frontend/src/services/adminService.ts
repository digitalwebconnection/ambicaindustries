import type { BlogArticle } from '@/types/blog';

const rawUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
const API_BASE = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

const TOKEN_KEY = 'ambica_admin_token';
const ADMIN_USER_KEY = 'ambica_admin_user';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AdminDashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  archivedBlogs: number;
  allStoredBlogs: number;
  totalViews: number;
  categoryCounts: { _id: string; count: number }[];
  countryStats?: { country: string; flag: string; countryCode?: string; count: number }[];
  hourlyTraffic?: { day: number; hour: number; count: number }[];
  dailyTraffic?: { date: string; count: number }[];
}

export interface BlogPayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  readTime?: string;
  publishDate?: string;
  author?: string;
  authorRole?: string;
  imageUrl?: string;
  keyTakeaways?: string[];
  metaTitle?: string;
  canonicalUrl?: string;
  keywords?: string;
  metaDescription?: string;
  schemaMarkup?: string;
  isPublished?: boolean;
}

export const adminService = {
  // Token management
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): AdminUser | null {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  },

  // Auth
  async login(email: string, password: string): Promise<{ token: string; admin: AdminUser }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data: any;
    try {
      data = await res.json();
    } catch {
      throw new Error(`Unable to connect to server (HTTP ${res.status}). Please make sure the backend server is running.`);
    }

    if (!res.ok || !data?.success) {
      throw new Error(data?.message || 'Login failed');
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.admin));

    return data;
  },

  // Verify current token with backend
  async verifyAuth(): Promise<AdminUser | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE}/admin/me`, {
        headers: this.getHeaders(),
      });

      if (!res.ok) {
        this.logout();
        return null;
      }

      const data = await res.json();
      if (!data.success || !data.admin) {
        this.logout();
        return null;
      }

      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.admin));
      return data.admin;
    } catch {
      // If offline or network issue, fallback to stored user only if valid token exists
      return this.getUser();
    }
  },

  // Headers helper
  getHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
    };
  },

  // Stats
  async getStats(): Promise<AdminDashboardStats> {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch dashboard stats');
    }

    return data.stats;
  },

  // Get all blogs (including drafts and soft-deleted)
  async getAllBlogs(): Promise<BlogArticle[]> {
    const res = await fetch(`${API_BASE}/blogs/admin/all`, {
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch blogs');
    }

    return data.data;
  },

  // Create blog
  async createBlog(payload: BlogPayload): Promise<BlogArticle> {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to create article');
    }

    return data.data;
  },

  // Update blog
  async updateBlog(id: string, payload: Partial<BlogPayload>): Promise<BlogArticle> {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to update article');
    }

    return data.data;
  },

  // Toggle Publish
  async togglePublish(id: string): Promise<BlogArticle> {
    const res = await fetch(`${API_BASE}/blogs/${id}/publish`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to toggle publish status');
    }

    return data.data;
  },

  // Delete blog
  async deleteBlog(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to delete article');
    }
  },

  // Restore blog
  async restoreBlog(id: string): Promise<BlogArticle> {
    const res = await fetch(`${API_BASE}/blogs/${id}/restore`, {
      method: 'PATCH',
      headers: this.getHeaders(),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to restore article');
    }

    return data.data;
  },

  // Upload image to Cloudinary (returns hosted URL)
  async uploadImage(base64: string, folder = 'ambica/blogs'): Promise<string> {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ image: base64, folder }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to upload image');
    }

    return data.url;
  },
};
