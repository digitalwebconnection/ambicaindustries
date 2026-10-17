import { Folder, Search, RefreshCw, X, Menu, User } from 'lucide-react';
import type { AdminUser } from '@/services/adminService';

interface AdminTopBarProps {
  currentView: 'dashboard' | 'blog' | 'leads';
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  onRefresh: () => void;
  onOpenMobileMenu: () => void;
  currentUser?: AdminUser | null;
}

export default function AdminTopBar({
  currentView,
  searchTerm,
  setSearchTerm,
  loading,
  onRefresh,
  onOpenMobileMenu,
  currentUser,
}: AdminTopBarProps) {
  const viewTitles = {
    dashboard: 'Dashboard Analytics',
    leads: 'Customer Leads & Enquiries',
    blog: 'Blog Publications & Articles',
  };

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-3 sm:px-6 md:px-8 flex items-center justify-between gap-2 sm:gap-4 shrink-0 z-20">
      {/* Left: Mobile Menu Trigger + Brand / Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Mobile Logo Brand */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <img src="/logo2.png" alt="Ambica Industries" className="h-7 w-auto object-contain" />
        </div>

        {/* Desktop Breadcrumb Title */}
        <div className="hidden md:flex items-center gap-2 text-slate-800 min-w-0">
          <Folder size={17} className="text-slate-400 shrink-0" />
          <h1 className="text-sm sm:text-base font-bold tracking-tight truncate">
            {viewTitles[currentView]}
          </h1>
        </div>
      </div>

      {/* Right: Search (Desktop) + Actions + Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Desktop Search Bar (Hidden on Mobile to preserve full width) */}
        <div className="relative hidden sm:block w-48 md:w-64 lg:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Refresh Data"
        >
          <RefreshCw size={17} className={loading ? 'animate-spin text-accent-red' : ''} />
        </button>

        {/* User Profile Avatar Pill / Circle (matching Image 5) */}
        <div
          onClick={onOpenMobileMenu}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer select-none"
          title={`Logged in as ${currentUser?.name || 'Ambica Admin'}`}
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-bold text-xs shadow-xs">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
