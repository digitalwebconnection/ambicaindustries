import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminService, type AdminDashboardStats } from '@/services/adminService';
import { leadService, type LeadItem } from '@/services/leadService';
import type { BlogArticle } from '@/types/blog';
import BlogEditorModal from '@/components/admin/BlogEditorModal';
import {
  AdminSidebar,
  AdminTopBar,
  AdminAnalyticsSection,
  AdminBlogSection,
  AdminLeadsSection,
} from './sections';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'blog' | 'leads'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal & filter state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  const loadData = async (silent = false) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      if (!silent) setLoading(false);
      return;
    }

    try {
      if (!silent) setLoading(true);
      const [statsData, blogsData, leadsData] = await Promise.all([
        adminService.getStats().catch((err) => {
          if (!silent) console.warn('Dashboard stats temporarily unavailable:', err?.message);
          return null;
        }),
        adminService.getAllBlogs().catch((err) => {
          if (!silent) console.warn('Articles temporarily unavailable:', err?.message);
          return null;
        }),
        leadService.getLeads().catch((err) => {
          if (!silent) console.warn('Customer leads temporarily unavailable:', err?.message);
          return null;
        }),
      ]);

      if (statsData) setStats(statsData);
      if (blogsData) setArticles(blogsData);
      if (leadsData?.data) setLeads(leadsData.data);
      setIsOffline(false);
    } catch (err) {
      if (!silent) {
        console.error('Failed to load admin data:', err);
      }
      if ((err as Error).message?.includes('401') || (err as Error).message?.includes('token')) {
        adminService.logout();
        navigate('/admin/login');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Auth check & load data with auto-refresh and online/offline event listeners
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      if (!adminService.isAuthenticated()) {
        navigate('/admin/login');
        return;
      }

      // Verify token authenticity with backend
      const verified = await adminService.verifyAuth();
      if (!isMounted) return;

      if (!verified) {
        adminService.logout();
        navigate('/admin/login');
        return;
      }

      loadData(false);
    }

    initAuth();

    const handleOnline = () => {
      setIsOffline(false);
      loadData(false);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auto update views, analytics and articles every 5 seconds when online
    const intervalId = window.setInterval(() => {
      if (!modalOpen && (typeof navigator === 'undefined' || navigator.onLine)) {
        loadData(true);
      }
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [navigate, modalOpen]);

  const handleLogout = () => {
    adminService.logout();
    toast.success('Signed out successfully');
    navigate('/admin/login');
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingArticle(null);
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (art: BlogArticle) => {
    setEditingArticle(art);
    setModalOpen(true);
  };

  // Toggle Publish
  const handleTogglePublish = async (id: string) => {
    try {
      setActionLoading(true);
      const article = articles.find((a) => a._id === id);
      const willPublish = article?.isPublished === false;
      await adminService.togglePublish(id);
      toast.success(willPublish ? 'Article published live!' : 'Article moved to drafts');
      await loadData();
    } catch (err) {
      toast.error((err as Error).message || 'Failed to toggle status');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Article (Confirmed via Custom Popup Modal)
  const handleDeleteArticle = async (id: string, title: string) => {
    try {
      setActionLoading(true);
      await adminService.deleteBlog(id);
      toast.success(`Deleted "${title}"`);
      await loadData();
    } catch (err) {
      toast.error((err as Error).message || 'Failed to delete article');
    } finally {
      setActionLoading(false);
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (id: string, status: LeadItem['status']) => {
    try {
      setActionLoading(true);
      await leadService.updateStatus(id, status);
      toast.success('Lead status updated');
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status } : lead))
      );
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update lead status');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Lead (Soft delete from admin panel, kept safe in database)
  const handleDeleteLead = async (id: string, name: string) => {
    try {
      setActionLoading(true);
      await leadService.deleteLead(id);
      toast.success(`Removed lead from "${name}" from Admin Panel`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      toast.error((err as Error).message || 'Failed to remove lead');
    } finally {
      setActionLoading(false);
    }
  };

  // Calculations for stats
  const totalBlogs = articles.length;
  const publishedCount = articles.filter((a) => a.isPublished !== false).length;
  const draftCount = articles.filter((a) => a.isPublished === false).length;
  const totalReads = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalViews = stats?.totalViews || totalReads;
  const draftPercentage = totalBlogs > 0 ? ((draftCount / totalBlogs) * 100).toFixed(2) : '0.00';

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (filterStatus === 'published') {
      result = result.filter((a) => a.isPublished !== false);
    } else if (filterStatus === 'draft') {
      result = result.filter((a) => a.isPublished === false);
    }
    const term = searchTerm.toLowerCase().trim();
    if (!term) return result;
    return result.filter(
      (a) =>
        a.title?.toLowerCase().includes(term) ||
        a.category?.toLowerCase().includes(term) ||
        a.author?.toLowerCase().includes(term) ||
        a.slug?.toLowerCase().includes(term)
    );
  }, [articles, searchTerm, filterStatus]);

  const currentUser = adminService.getUser();
  const todayStr = new Date().toISOString().split('T')[0];
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthStr = lastMonth.toISOString().split('T')[0];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-800">
      {/* 1. Sidebar (Off-canvas on mobile, static on desktop) */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          setMobileMenuOpen(false);
        }}
        totalBlogs={totalBlogs}
        totalLeads={leads.length}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <AdminTopBar
          currentView={currentView}    
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          onRefresh={() => loadData(false)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          currentUser={currentUser}
        />

        {/* Offline Notification Bar */}
        {isOffline && (
          <div className="bg-amber-500 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-xs z-10">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Internet disconnected. Working in offline mode — data will automatically update once reconnected.</span>
            </div>
            <button
              onClick={() => loadData(false)}
              className="text-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded cursor-pointer transition-colors font-medium"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Dynamic Body Content - Full width on mobile without cramped padding */}
        <main data-lenis-prevent className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-50/60">
          {currentView === 'dashboard' ? (
            <AdminAnalyticsSection
              totalBlogs={totalBlogs}
              publishedCount={publishedCount}
              draftCount={draftCount}
              totalReads={totalViews}
              draftPercentage={draftPercentage}
              stats={stats}
              articles={articles}
              lastMonthStr={lastMonthStr}
              todayStr={todayStr}
              onNavigateBlog={() => setCurrentView('blog')}
              onOpenAddModal={openAddModal}
            />
          ) : currentView === 'leads' ? (
            <AdminLeadsSection
              leads={leads}
              loading={loading}
              actionLoading={actionLoading}
              onRefresh={() => loadData(false)}
              onUpdateStatus={handleUpdateLeadStatus}
              onDeleteLead={handleDeleteLead}
            />
          ) : (
            <AdminBlogSection
              articles={articles}
              filteredArticles={filteredArticles}
              loading={loading}
              actionLoading={actionLoading}
              totalBlogs={totalBlogs}
              publishedCount={publishedCount}
              draftCount={draftCount}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onOpenAddModal={openAddModal}
              onOpenEditModal={openEditModal}
              onTogglePublish={handleTogglePublish}
              onDeleteArticle={handleDeleteArticle}
              onRefresh={() => loadData(false)}
            />
          )}
        </main>
      </div>

      {/* 2. Add / Edit Blog Modal */}
      <BlogEditorModal
        isOpen={modalOpen}
        article={editingArticle}
        onClose={() => setModalOpen(false)}
        onSaved={() => loadData(false)}
      />
    </div>
  );
}
