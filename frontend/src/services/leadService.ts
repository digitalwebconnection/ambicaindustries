import apiClient from './apiClient';
import { API_ENDPOINTS } from '@/constants/api';

export interface LeadSubmissionPayload {
  name: string;
  company?: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  service?: string;
  message: string;
  sourcePage?: string;
}

export interface LeadItem {
  _id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  suburb?: string;
  ip?: string;
  ipLocation?: string;
  service?: string;
  message?: string;
  referenceId?: string;
  sourcePage?: string;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: LeadItem[];
}

export const leadService = {
  /**
   * Save a new lead / inquiry into MongoDB database
   */
  async submitLead(payload: LeadSubmissionPayload): Promise<{ success: boolean; data?: any }> {
    try {
      const response = await apiClient<{ success: boolean; message: string; data: any }>(
        API_ENDPOINTS.LEADS.SUBMIT,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          timeoutMs: 12000,
        }
      );
      return response;
    } catch (err) {
      console.warn('Lead submission to primary backend failed, attempting direct fallback...', err);
      // Fallback directly to production Render endpoint if local proxy failed
      try {
        const fallbackRes = await fetch('https://ambicaindustries-nods.onrender.com/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const fallbackData = await fallbackRes.json();
        return fallbackData;
      } catch (fallbackErr) {
        console.error('All lead database submission attempts failed:', fallbackErr);
        throw err;
      }
    }
  },

  /**
   * Get all leads for admin management
   */
  async getLeads(status?: string, search?: string, page = 1): Promise<LeadsResponse> {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);
    params.append('page', String(page));
    params.append('limit', '50');

    try {
      return await apiClient<LeadsResponse>(
        `${API_ENDPOINTS.LEADS.ADMIN_LIST}?${params.toString()}`,
        {
          method: 'GET',
          requiresAuth: true,
        }
      );
    } catch (err) {
      console.warn('Primary leads fetch failed, attempting fallback...', err);
      try {
        const token = localStorage.getItem('ambica_admin_token');
        const fallbackUrl = `https://ambicaindustries-nods.onrender.com/api/leads?${params.toString()}`;
        const res = await fetch(fallbackUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || ''}`,
          },
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (fallbackErr) {
        console.error('All leads fetch attempts failed:', fallbackErr);
      }
      throw err;
    }
  },

  /**
   * Update lead status (Admin)
   */
  async updateStatus(id: string, status: string, notes?: string): Promise<any> {
    try {
      return await apiClient(`${API_ENDPOINTS.LEADS.SUBMIT}/${id}/status`, {
        method: 'PATCH',
        requiresAuth: true,
        body: JSON.stringify({ status, notes }),
      });
    } catch (err) {
      console.warn('Primary updateStatus failed, attempting direct fallback...', err);
      try {
        const token = localStorage.getItem('ambica_admin_token');
        const fallbackUrl = `https://ambicaindustries-nods.onrender.com/api/leads/${id}/status`;
        const res = await fetch(fallbackUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || ''}`,
          },
          body: JSON.stringify({ status, notes }),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (fallbackErr) {
        console.error('All update status attempts failed:', fallbackErr);
      }
      throw err;
    }
  },

  /**
   * Delete lead (Admin)
   */
  async deleteLead(id: string): Promise<any> {
    try {
      return await apiClient(`${API_ENDPOINTS.LEADS.SUBMIT}/${id}`, {
        method: 'DELETE',
        requiresAuth: true,
      });
    } catch (err) {
      console.warn('Primary deleteLead failed, attempting direct fallback...', err);
      try {
        const token = localStorage.getItem('ambica_admin_token');
        const fallbackUrl = `https://ambicaindustries-nods.onrender.com/api/leads/${id}`;
        const res = await fetch(fallbackUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || ''}`,
          },
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (fallbackErr) {
        console.error('All delete lead attempts failed:', fallbackErr);
      }
      throw err;
    }
  },
};

export default leadService;
