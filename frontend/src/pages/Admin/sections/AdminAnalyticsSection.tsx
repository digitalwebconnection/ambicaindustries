import { useMemo } from 'react';
import {
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import type { AdminDashboardStats } from '@/services/adminService';
import type { BlogArticle } from '@/types/blog';

interface AdminAnalyticsSectionProps {
  totalBlogs: number;
  publishedCount: number;
  draftCount?: number;
  totalReads: number;
  draftPercentage: string;
  stats: AdminDashboardStats | null;
  articles?: BlogArticle[];
  lastMonthStr: string;
  todayStr: string;
  onNavigateBlog: () => void;
  onOpenAddModal?: () => void;
}

export default function AdminAnalyticsSection({
  totalBlogs,
  publishedCount,
  draftCount = 0,
  totalReads,
  draftPercentage,
  stats,
  articles = [],
  onNavigateBlog,
}: AdminAnalyticsSectionProps) {
  // Category breakdown calculation
  const categoryStats = useMemo(() => {
    if (stats?.categoryCounts && stats.categoryCounts.length > 0) {
      return stats.categoryCounts.map((c) => ({
        name: c._id || 'General',
        count: c.count,
        percent: totalBlogs > 0 ? Math.round((c.count / totalBlogs) * 100) : 0,
      }));
    }

    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      const cat = a.category?.trim() || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const list = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      percent: totalBlogs > 0 ? Math.round((count / totalBlogs) * 100) : 0,
    }));

    return list.sort((a, b) => b.count - a.count);
  }, [stats, articles, totalBlogs]);

  // Palette for doughnut chart & categories
  const categoryColors = [
    { bg: '#3b82f6', text: 'text-blue-600', fill: 'fill-blue-500' },
    { bg: '#eab308', text: 'text-amber-500', fill: 'fill-amber-500' },
    { bg: '#10b981', text: 'text-emerald-500', fill: 'fill-emerald-500' },
    { bg: '#8b5cf6', text: 'text-purple-500', fill: 'fill-purple-500' },
    { bg: '#ec4899', text: 'text-pink-500', fill: 'fill-pink-500' },
  ];

  // Formatted date string (e.g. "16 October 2026")
  const currentDateStr = useMemo(() => {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  // Compute SVG Doughnut arcs
  const totalCatCount = categoryStats.reduce((sum, c) => sum + c.count, 0) || 1;
  let cumulativePercent = 0;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-6">
      {/* ================= 1. CIRCLE / DOUGHNUT CHART CARD (Image 5 style) ================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: SVG Doughnut Chart */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
              <circle
                cx="50"
                cy="50"
                r="38"
                className="stroke-slate-100"
                strokeWidth="14"
                fill="transparent"
              />
              {categoryStats.length > 0 ? (
                categoryStats.slice(0, 4).map((cat, idx) => {
                  const percent = (cat.count / totalCatCount) * 100;
                  const strokeDasharray = `${(percent * 238.76) / 100} 238.76`;
                  const strokeDashoffset = -((cumulativePercent * 238.76) / 100);
                  cumulativePercent += percent;
                  const color = categoryColors[idx % categoryColors.length].bg;

                  return (
                    <circle
                      key={cat.name}
                      cx="50"
                      cy="50"
                      r="38"
                      stroke={color}
                      strokeWidth="14"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      fill="transparent"
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  );
                })
              ) : (
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#3b82f6"
                  strokeWidth="14"
                  strokeDasharray="238.76 238.76"
                  fill="transparent"
                />
              )}
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {totalReads.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1">
                Total Reads
              </span>
            </div>
          </div>

          {/* Right: Legend Breakdown List */}
          <div className="flex-1 w-full space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              Topic Distribution
            </div>
            {categoryStats.length > 0 ? (
              categoryStats.slice(0, 4).map((cat, idx) => {
                const color = categoryColors[idx % categoryColors.length];
                return (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3.5 h-3.5 rounded-sm shrink-0"
                        style={{ backgroundColor: color.bg }}
                      />
                      <span className="font-semibold text-slate-800 truncate max-w-45 sm:max-w-xs">
                        {cat.name}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-xs text-slate-400 italic">No published articles yet</div>
            )}
          </div>
        </div>
      </div>

      {/* ================= 2. 4 STAT CARDS 2x2 GRID (Image 5 style) ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: BLOG */}
        <div
          onClick={onNavigateBlog}
          className="relative bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-slate-300 transition-all group"
        >
          {/* Top Pill & Arrow */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wider">
              BLOG
            </span>
            <ArrowUpRight
              size={18}
              className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>

          {/* Number & Subtitle */}
          <div className="my-3 sm:my-4 relative z-10">
            <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span>{publishedCount}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">Articles</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Active Articles
            </p>
          </div>

          {/* Decorative Bottom Wave & Date */}
          <div className="relative pt-2 border-t border-slate-100/80 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium z-10">
            <Calendar size={12} className="shrink-0 text-slate-400" />
            <span className="truncate">{currentDateStr}</span>
          </div>

          {/* Bottom Wave Graphic */}
          <div className="absolute -bottom-1 left-0 right-0 h-10 opacity-30 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 25" preserveAspectRatio="none" className="w-full h-full text-slate-300 fill-current">
              <path d="M0,15 C25,25 45,5 70,18 C85,25 95,10 100,12 L100,25 L0,25 Z" />
            </svg>
          </div>
        </div>

        {/* Card 2: GUIDE / CONTENT */}
        <div className="relative bg-white rounded-2xl border border-emerald-200/80 shadow-xs p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden group">
          {/* Top Pill & Arrow */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-wider">
              GUIDE
            </span>
            <ArrowUpRight
              size={18}
              className="text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>

          {/* Number & Subtitle */}
          <div className="my-3 sm:my-4 relative z-10">
            <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span>{categoryStats.length}</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700">Guides</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Tech Categories
            </p>
          </div>

          {/* Decorative Bottom Wave & Date */}
          <div className="relative pt-2 border-t border-emerald-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-700 font-medium z-10">
            <Calendar size={12} className="shrink-0 text-emerald-600" />
            <span className="truncate">{currentDateStr}</span>
          </div>

          {/* Bottom Wave Graphic */}
          <div className="absolute -bottom-1 left-0 right-0 h-10 opacity-35 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 25" preserveAspectRatio="none" className="w-full h-full text-emerald-300 fill-current">
              <path d="M0,12 C20,25 50,5 75,18 C90,25 98,10 100,12 L100,25 L0,25 Z" />
            </svg>
          </div>
        </div>

        {/* Card 3: READS / TRAFFIC */}
        <div className="relative bg-white rounded-2xl border border-blue-200/80 shadow-xs p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden group">
          {/* Top Pill & Arrow */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-extrabold uppercase tracking-wider">
              READS
            </span>
            <ArrowUpRight
              size={18}
              className="text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>

          {/* Number & Subtitle */}
          <div className="my-3 sm:my-4 relative z-10">
            <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span>{totalReads}</span>
              <span className="text-xs sm:text-sm font-bold text-blue-700">Reads</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Organic Traffic
            </p>
          </div>

          {/* Decorative Bottom Wave & Date */}
          <div className="relative pt-2 border-t border-blue-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-blue-700 font-medium z-10">
            <Calendar size={12} className="shrink-0 text-blue-600" />
            <span className="truncate">{currentDateStr}</span>
          </div>

          {/* Bottom Wave Graphic */}
          <div className="absolute -bottom-1 left-0 right-0 h-10 opacity-35 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 25" preserveAspectRatio="none" className="w-full h-full text-blue-300 fill-current">
              <path d="M0,15 C30,5 60,25 80,10 C92,5 98,15 100,20 L100,25 L0,25 Z" />
            </svg>
          </div>
        </div>

        {/* Card 4: DRAFT / PENDING */}
        <div className="relative bg-white rounded-2xl border border-amber-200/80 shadow-xs p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden group">
          {/* Top Pill & Arrow */}
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-extrabold uppercase tracking-wider">
              DRAFT
            </span>
            <ArrowUpRight
              size={18}
              className="text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>

          {/* Number & Subtitle */}
          <div className="my-3 sm:my-4 relative z-10">
            <div className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span>{draftPercentage}%</span>
              <span className="text-xs sm:text-sm font-bold text-amber-700">
                {draftCount} Pending
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              In Review
            </p>
          </div>

          {/* Decorative Bottom Wave & Date */}
          <div className="relative pt-2 border-t border-amber-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-700 font-medium z-10">
            <Calendar size={12} className="shrink-0 text-amber-600" />
            <span className="truncate">{currentDateStr}</span>
          </div>

          {/* Bottom Wave Graphic */}
          <div className="absolute -bottom-1 left-0 right-0 h-10 opacity-35 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 25" preserveAspectRatio="none" className="w-full h-full text-amber-300 fill-current">
              <path d="M0,18 C25,8 55,25 75,12 C88,5 95,15 100,18 L100,25 L0,25 Z" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
