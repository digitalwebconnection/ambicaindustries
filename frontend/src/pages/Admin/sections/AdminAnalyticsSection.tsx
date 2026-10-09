import { Clock, ThumbsDown, Folder, BookOpen } from 'lucide-react';
import type { AdminDashboardStats } from '@/services/adminService';

interface AdminAnalyticsSectionProps {
  totalBlogs: number;
  publishedCount: number;
  totalReads: number;
  draftPercentage: string;
  stats: AdminDashboardStats | null;
  lastMonthStr: string;
  todayStr: string;
  onNavigateBlog: () => void;
}

export default function AdminAnalyticsSection({
  totalBlogs,
  publishedCount,
  totalReads,
  draftPercentage,
  stats: _stats,
  lastMonthStr,
  todayStr,
  onNavigateBlog,
}: AdminAnalyticsSectionProps) {

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ================= 1. ROW OF 4 STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Reads */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalReads}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Total Reads</div>
            </div>
            <div className="w-8 h-8 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Clock size={16} />
            </div>
          </div>
          <div className="flex items-end justify-between pt-6 mt-2 border-t border-slate-100 font-mono text-[11px] text-slate-400">
            <span>{lastMonthStr}</span>
            <div className="h-7 w-1.5 bg-indigo-600 rounded-full" />
            <span>{todayStr}</span>
          </div>
        </div>

        {/* 2. % Content in Draft */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {draftPercentage}%
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">% Content in Draft</div>
            </div>
            <div className="w-8 h-8 rounded-full border border-rose-400/30 flex items-center justify-center text-rose-500">
              <ThumbsDown size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-100 font-mono text-[11px] text-slate-400">
            <span>{lastMonthStr}</span>
            <span>{todayStr}</span>
          </div>
        </div>

        {/* 3. Blog */}
        <div
          onClick={onNavigateBlog}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-accent-red/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-accent-red transition-colors">
                {totalBlogs}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Blog</div>
            </div>
            <div className="w-8 h-8 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-500">
              <Folder size={16} />
            </div>
          </div>
          <div className="flex items-end justify-between pt-6 mt-2 border-t border-slate-100 font-mono text-[11px] text-slate-400">
            <span>{lastMonthStr}</span>
            <div className="flex items-end gap-1">
              <div className="h-7 w-1.5 bg-indigo-600 rounded-full" />
              <div className="h-4 w-1.5 bg-indigo-600 rounded-full" />
            </div>
            <span>{todayStr}</span>
          </div>
        </div>

        {/* 4. Knowledge Hub */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {publishedCount}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Knowledge Hub</div>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700">
              <BookOpen size={16} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-100 font-mono text-[11px] text-slate-400">
            <span>{lastMonthStr}</span>
            <span>{todayStr}</span>
          </div>
        </div>
      </div>


    </div>
  );
}
