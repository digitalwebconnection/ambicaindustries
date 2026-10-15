/**
 * API Endpoints & Request Constants
 */
const rawUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
export const API_BASE_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/admin/login`,
    VERIFY_ME: `${API_BASE_URL}/admin/me`,
    CHANGE_PASSWORD: `${API_BASE_URL}/admin/change-password`,
  },
  BLOGS: {
    BASE: `${API_BASE_URL}/blogs`,
    BY_SLUG: (slug: string) => `${API_BASE_URL}/blogs/${slug}`,
    ADMIN_ALL: `${API_BASE_URL}/admin/blogs`,
    ADMIN_STATS: `${API_BASE_URL}/admin/stats`,
  },
  LEADS: {
    SUBMIT: `${API_BASE_URL}/leads`,
    ADMIN_LIST: `${API_BASE_URL}/admin/leads`,
  },
  UPLOAD: `${API_BASE_URL}/upload`,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ambica_admin_token',
  AUTH_USER: 'ambica_admin_user',
} as const;
