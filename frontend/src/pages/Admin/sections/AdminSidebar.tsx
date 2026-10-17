import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Globe,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Users,
  X,
} from 'lucide-react';
import type { AdminUser } from '@/services/adminService';

interface AdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  currentView: 'dashboard' | 'blog' | 'leads';
  setCurrentView: (view: 'dashboard' | 'blog' | 'leads') => void;
  totalBlogs: number;
  totalLeads?: number;
  currentUser: AdminUser | null;
  onLogout: () => void;
}

export default function AdminSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentView,
  setCurrentView,
  totalBlogs,
  totalLeads = 0,
  currentUser,
  onLogout,
}: AdminSidebarProps) {
  const handleNavClick = (view: 'dashboard' | 'blog' | 'leads') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const navContent = (isMobile: boolean) => {
    const isCollapsed = !isMobile && sidebarCollapsed;

    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Sidebar Header */}
          <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/logo2.png"
                alt="Ambica Industries"
                className="h-9 w-auto object-contain max-w-37.5"
              />
            </div>

            {isMobile ? (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Close Menu"
              >
                <X size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
                title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-3">
            {(!isCollapsed || isMobile) && (
              <div className="px-3 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                MANAGEMENT
              </div>
            )}

            <nav className="space-y-1.5">
              {/* 1. Dashboard Tab */}
              <button
                type="button"
                onClick={() => handleNavClick('dashboard')}
                title="Dashboard"
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isCollapsed ? (
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
                type="button"
                onClick={() => handleNavClick('blog')}
                title={`Blog Studio (${totalBlogs} articles)`}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'blog'
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isCollapsed ? (
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

              {/* 3. Customer Leads Tab */}
              <button
                type="button"
                onClick={() => handleNavClick('leads')}
                title={`Customer Leads (${totalLeads} inquiries)`}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'leads'
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isCollapsed ? (
                  <div className="relative flex items-center justify-center">
                    <Users
                      size={20}
                      className={currentView === 'leads' ? 'text-accent-red' : 'text-slate-400'}
                    />
                    {totalLeads > 0 && (
                      <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-emerald-500 text-[9px] font-mono font-bold text-white">
                        {totalLeads}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Users
                        size={18}
                        className={currentView === 'leads' ? 'text-accent-red' : 'text-slate-400'}
                      />
                      <span>Customer Leads</span>
                    </div>
                    <span className="flex items-center gap-1">
                      {totalLeads > 0 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-[10px] font-mono font-bold text-emerald-800">
                          {totalLeads}
                        </span>
                      )}
                      <ChevronRight size={14} className="text-slate-300" />
                    </span>
                  </>
                )}
              </button>

              {/* 4. Live Website Link */}
              <Link
                to="/blogs"
                target="_blank"
                onClick={() => isMobile && setMobileMenuOpen(false)}
                title="Open Live Blog"
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all`}
              >
                {isCollapsed ? (
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
        <div className="p-3 border-t border-slate-100">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-xl bg-accent-red text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-default"
                title={`${currentUser?.name || 'Ambica Industries'} (${currentUser?.email || 'admin@ambicaindustry.com'})`}
              >
                AI
              </div>

              <button
                type="button"
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
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 1. Mobile Off-Canvas Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 2. Mobile Off-Canvas Drawer (matching Image 4) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent(true)}
      </aside>

      {/* 3. Desktop Static Sidebar (Collapsible) */}
      <aside
        className={`hidden md:flex flex-col justify-between ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } bg-white border-r border-slate-200 transition-all duration-300 z-30 shrink-0 select-none`}
      >
        {navContent(false)}
      </aside>
    </>
  );
}
