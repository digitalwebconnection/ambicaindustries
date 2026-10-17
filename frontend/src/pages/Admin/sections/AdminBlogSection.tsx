import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Eye,
  Search,
  X,
  List as ListIcon,
  LayoutGrid,
  Plus,
  RefreshCw,
  ExternalLink,
  Edit,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import AdminThumbnail from './AdminThumbnail';

interface AdminBlogSectionProps {
  articles: BlogArticle[];
  filteredArticles: BlogArticle[];
  loading: boolean;
  actionLoading: boolean;
  totalBlogs: number;
  publishedCount: number;
  draftCount: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: 'all' | 'published' | 'draft';
  setFilterStatus: (status: 'all' | 'published' | 'draft') => void;
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (article: BlogArticle) => void;
  onTogglePublish: (id: string) => Promise<void>;
  onDeleteArticle: (id: string, title: string) => Promise<void>;
  onRefresh?: () => void;
}

export default function AdminBlogSection({
  articles,
  filteredArticles,
  loading,
  actionLoading,
  totalBlogs,
  publishedCount,
  draftCount,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
  onOpenAddModal,
  onOpenEditModal,
  onTogglePublish,
  onDeleteArticle,
  onRefresh,
}: AdminBlogSectionProps) {
  const [articleToDelete, setArticleToDelete] = useState<{ id: string; title: string } | null>(null);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">

      {/* Action & Filter Toolbar */}
      <div className="flex flex-col gap-3 bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Search Bar - Full width */}
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, category, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filters, View Toggle, and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Status Filter Tabs (3 equal segmented buttons on mobile) */}
          <div className="grid grid-cols-3 sm:flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-semibold select-none w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`text-center px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({totalBlogs})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('published')}
              className={`text-center px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterStatus === 'published'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('draft')}
              className={`text-center px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterStatus === 'draft'
                  ? 'bg-white text-amber-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5">
              {/* Table vs Grid Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-600">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                  title="List/Table View"
                >
                  <ListIcon size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                  title="Grid Cards View"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>

              {/* Manual Reload */}
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  disabled={loading}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer bg-white"
                  title="Refresh Articles"
                >
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                </button>
              )}
            </div>

            {/* Add New Article Button */}
            <button
              onClick={onOpenAddModal}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-accent-red hover:bg-accent-red-dark text-white font-bold text-xs tracking-wide shadow-md shadow-accent-red/25 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid View */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-400 text-xs">
          <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-accent-red" />
          Loading articles from database...
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-400">
          <FileText size={38} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-bold text-slate-700">No articles found</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            {articles.length === 0
              ? 'The database currently has 0 articles. Create your first article.'
              : 'No articles match the current search or status filter.'}
          </p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-red text-white font-semibold text-xs cursor-pointer shadow-xs"
          >
            <Plus size={14} /> Add New Article
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* ================= TABLE VIEW WITH THUMBNAILS ================= */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-170">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Article</th>
                  <th className="py-3.5 px-3 sm:px-4">Category</th>
                  <th className="py-3.5 px-3 sm:px-4">Status</th>
                  <th className="py-3.5 px-3 sm:px-4">Views</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredArticles.map((art) => (
                  <tr key={art._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Article Column with Image Thumbnail */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative group/thumb shadow-2xs">
                          <AdminThumbnail
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 max-w-xs sm:max-w-sm md:max-w-sm">
                          <div className="font-bold text-slate-900 line-clamp-1 mb-0.5">
                            {art.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mb-1">
                            {art.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-3 sm:px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {art.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-3 sm:px-4 whitespace-nowrap">
                      <button
                        onClick={() => onTogglePublish(art._id)}
                        disabled={actionLoading}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                          art.isPublished !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            art.isPublished !== false ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {art.isPublished !== false ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Views */}
                    <td className="py-4 px-3 sm:px-4 whitespace-nowrap text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye size={12} className="text-slate-400" />
                        {art.views || 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blogs/${art.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                          title="View on site"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        <button
                          onClick={() => onOpenEditModal(art)}
                          disabled={actionLoading}
                          className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit article"
                        >
                          <Edit size={15} />
                        </button>

                        <button
                          onClick={() => setArticleToDelete({ id: art._id, title: art.title })}
                          disabled={actionLoading}
                          className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete article"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Article Cards View (Visible only on mobile devices) */}
          <div className="block md:hidden divide-y divide-slate-100">
            {filteredArticles.map((art) => (
              <div key={art._id} className="p-3.5 space-y-2.5 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <AdminThumbnail
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 truncate">
                        {art.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Eye size={11} /> {art.views || 0}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mt-1">
                      {art.title}
                    </h4>
                    {art.excerpt && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls: Status Toggle + Action Icons */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onTogglePublish(art._id)}
                    disabled={actionLoading}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                      art.isPublished !== false
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        art.isPublished !== false ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span>{art.isPublished !== false ? 'Published' : 'Draft'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/blogs/${art.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                      title="View live"
                    >
                      <ExternalLink size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpenEditModal(art)}
                      disabled={actionLoading}
                      className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleToDelete({ id: art._id, title: art.title })}
                      disabled={actionLoading}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= GRID CARDS VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Featured Thumbnail */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <AdminThumbnail
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs border border-slate-200">
                    {art.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => onTogglePublish(art._id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-xs cursor-pointer ${
                      art.isPublished !== false
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-amber-600/90 text-white'
                    }`}
                  >
                    {art.isPublished !== false ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {art.excerpt}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{art.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} /> {art.views || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/blogs/${art.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                      title="View on site"
                    >
                      <ExternalLink size={14} />
                    </Link>

                    <button
                      onClick={() => onOpenEditModal(art)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => setArticleToDelete({ id: art._id, title: art.title })}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Article Confirmation Popup Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <AlertTriangle size={24} />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base sm:text-lg font-black text-slate-900">Delete Article</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently delete this article?
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <span className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2">
                "{articleToDelete.title}"
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                disabled={actionLoading}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (articleToDelete) {
                    await onDeleteArticle(articleToDelete.id, articleToDelete.title);
                    setArticleToDelete(null);
                  }
                }}
                disabled={actionLoading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {actionLoading ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
