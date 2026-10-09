import { Folder, Search, RefreshCw, X } from 'lucide-react';

interface AdminTopBarProps {
  currentView: 'dashboard' | 'blog';
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  onRefresh: () => void;
}

export default function AdminTopBar({
  currentView,
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh,
}: AdminTopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between gap-4 shrink-0">
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-2.5 text-slate-800">
        <Folder size={18} className="text-slate-400" />
        <h1 className="text-sm sm:text-base font-bold tracking-tight">
          {currentView === 'dashboard' ? 'Dashboard Analytics' : 'Blog Publications & Articles'}
        </h1>
      </div>

      {/* Search Bar & Refresh Button */}
      <div className="flex items-center gap-3">
        <div className="relative w-64 sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin text-accent-red' : ''} />
        </button>
      </div>
    </header>
  );
}
