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
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-3 sm:px-4">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-3 min-w-0">
                <img src="/logo2.png" alt="Ambica Industries" className="h-10 w-auto object-contain max-w-[150px]" />
              </div>

              <button
                onClick={() => setSidebarCollapsed(true)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Collapse Sidebar"
              >
                <ChevronLeft size={16} />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="flex items-center justify-center gap-1 px-2 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer group"
                title="Expand Sidebar"
              >
                <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 flex items-center justify-start">
                  <img src="/logo2.png" alt="Logo" className="h-7 max-w-none object-left" />
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-700 transition-all shrink-0" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="p-2 sm:p-3">
          {!sidebarCollapsed && (
            <div className="px-3 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              MANAGEMENT
            </div>
          )}

          <nav className="space-y-1.5">
            {/* 1. Dashboard Tab */}
            <button
              onClick={() => setCurrentView('dashboard')}
              title="Dashboard"
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
              } rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {sidebarCollapsed ? (
                <LayoutDashboard
                  size={20}
                  className={currentView === 'dashboard' ? 'text-accent-red' : 'text-slate-400'}
                />
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <LayoutDashboard
                      size={18}
                      className={currentView === 'dashboard' ? 'text-accent-red' : 'text-slate-400'}
                    />
                    <span>Dashboard</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </>
              )}
            </button>

            {/* 2. Blog Studio Tab */}
            <button
              onClick={() => setCurrentView('blog')}
              title={`Blog Studio (${totalBlogs} articles)`}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
              } rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {sidebarCollapsed ? (
                <div className="relative flex items-center justify-center">
                  <FileText
                    size={20}
                    className={currentView === 'blog' ? 'text-accent-red' : 'text-slate-400'}
                  />
                  {totalBlogs > 0 && (
                    <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-slate-200 text-[9px] font-mono font-bold text-slate-700">
                      {totalBlogs}
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <FileText
                      size={18}
                      className={currentView === 'blog' ? 'text-accent-red' : 'text-slate-400'}
                    />
                    <span>Blog</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-200 text-[10px] font-mono font-bold text-slate-700">
                      {totalBlogs}
                    </span>
                    <ChevronRight size={14} className="text-slate-300" />
                  </span>
                </>
              )}
            </button>

            {/* 3. Live Website Link */}
            <Link
              to="/blogs"
              target="_blank"
              title="Open Live Blog"
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
              } rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all`}
            >
              {sidebarCollapsed ? (
                <Globe size={20} className="text-slate-400 hover:text-slate-700 transition-colors" />
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-slate-400" />
                    <span>Live Blog</span>
                  </div>
                  <ExternalLink size={14} className="text-slate-300" />
                </>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer User Info */}
      <div className="p-2 sm:p-3 border-t border-slate-100">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            {/* User Avatar with Tooltip */}
            <div
              className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary-dark text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-default ring-1 ring-slate-200"
              title={`${currentUser?.name || 'Ambica Industries'} (${currentUser?.email || 'admin@ambicaindustry.com'})`}
            >
              AI
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
              <div className="w-9 h-9 rounded-full bg-accent-red text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                AI
              </div>
              <div className="overflow-hidden min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {currentUser?.name || 'Ambica Industries'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentUser?.email || 'admin@ambicaindustry.com'}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
