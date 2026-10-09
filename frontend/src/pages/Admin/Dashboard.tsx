import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, type AdminDashboardStats } from '@/services/adminService';
import type { BlogArticle } from '@/types/blog';
import BlogEditorModal from '@/components/admin/BlogEditorModal';
import {
  AdminSidebar,
  AdminTopBar,
  AdminAnalyticsSection,
  AdminBlogSection,
} from './sections';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'blog'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal & filter state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const loadData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const [statsData, blogsData] = await Promise.all([
        adminService.getStats().catch(() => null),
        adminService.getAllBlogs(),
      ]);
      if (statsData) setStats(statsData);
      if (blogsData) setArticles(blogsData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      if ((err as Error).message?.includes('401') || (err as Error).message?.includes('token')) {
        adminService.logout();
        navigate('/admin/login');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Auth check & load data with 3s auto-refresh
  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData(false);

    // Auto update views, analytics and articles every 3 seconds
    const intervalId = window.setInterval(() => {
      // Pause background updates if editor modal is open to avoid conflict
      if (!modalOpen) {
        loadData(true);
      }
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [navigate, modalOpen]);

  const handleLogout = () => {
    adminService.logout();
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
      await adminService.togglePublish(id);
      await loadData();
    } catch (err) {
      alert((err as Error).message || 'Failed to toggle status');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      setActionLoading(true);
      await adminService.deleteBlog(id);
      await loadData();
    } catch (err) {
      alert((err as Error).message || 'Failed to delete article');
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

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-800">
      {/* 1. Sidebar */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        currentView={currentView}
        setCurrentView={setCurrentView}
        totalBlogs={totalBlogs}
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
        />

        {/* Dynamic Body Content */}
        <main data-lenis-prevent className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/60">
          {currentView === 'dashboard' ? (
            <AdminAnalyticsSection
              totalBlogs={totalBlogs}
              publishedCount={publishedCount}
              totalReads={totalViews}
              draftPercentage={draftPercentage}
              stats={stats}
              lastMonthStr={lastMonthStr}
              todayStr={todayStr}
              onNavigateBlog={() => setCurrentView('blog')}
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
