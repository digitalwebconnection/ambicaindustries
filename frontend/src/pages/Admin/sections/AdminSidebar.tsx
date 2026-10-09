import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Globe,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import type { AdminUser } from '@/services/adminService';

interface AdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  currentView: 'dashboard' | 'blog';
  setCurrentView: (view: 'dashboard' | 'blog') => void;
  totalBlogs: number;
  currentUser: AdminUser | null;
  onLogout: () => void;
}

export default function AdminSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  currentView,
  setCurrentView,
  totalBlogs,
  currentUser,
  onLogout,
}: AdminSidebarProps) {
  return (
    <aside
      className={`${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4 sm:px-5">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <img src="/logo2.png" alt="Logo" className="h-11 w-auto object-contain" />
            </div>
          ) : (
            <img src="/logo2.png" alt="Logo" className="h-7 w-auto mx-auto object-contain" />
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-3">
          {!sidebarCollapsed && (
            <div className="px-3 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              MANAGEMENT
            </div>
          )}

          <nav className="space-y-1">
            {/* 1. Dashboard Tab */}
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3.5'
              } py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard
                  size={18}
                  className={currentView === 'dashboard' ? 'text-accent-red' : 'text-slate-400'}
                />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </div>
              {!sidebarCollapsed && <ChevronRight size={14} className="text-slate-300" />}
            </button>

            {/* 2. Blog Studio Tab */}
            <button
              onClick={() => setCurrentView('blog')}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3.5'
              } py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText
                  size={18}
                  className={currentView === 'blog' ? 'text-accent-red' : 'text-slate-400'}
                />
                {!sidebarCollapsed && <span>Blog</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-200 text-[10px] font-mono font-bold text-slate-700">
                    {totalBlogs}
                  </span>
                  <ChevronRight size={14} className="text-slate-300" />
                </span>
              )}
            </button>

            {/* 3. Live Website Link */}
            <Link
              to="/blogs"
              target="_blank"
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3.5'
              } py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all`}
            >
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-slate-400" />
                {!sidebarCollapsed && <span>Live Blog</span>}
              </div>
              {!sidebarCollapsed && <ExternalLink size={14} className="text-slate-300" />}
            </Link>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer User Info */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-accent-red text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              AI
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {currentUser?.name || 'Administrator'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentUser?.email || 'admin@ambicaindustry.com'}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
