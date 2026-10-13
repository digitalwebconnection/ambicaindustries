import { useMemo } from 'react';
import {
  Eye,
  FileText,
  Clock,
  Layers,
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
  stats,
  articles = [],

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


  const cards = [
    {
      title: 'Total Readership',
      value: totalReads.toLocaleString(),
      subtitle: 'Across all articles',
      icon: Eye,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Live Publications',
      value: publishedCount,
      subtitle: `${publishedCount} of ${totalBlogs} active`,
      icon: FileText,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Draft Articles',
      value: draftCount,
      subtitle: draftCount > 0 ? 'Pending review' : 'All articles live',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Categories',
      value: categoryStats.length,
      subtitle: 'Active topic categories',
      icon: Layers,
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ================= 1. CLEAN 4 KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-lg flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <Icon size={18} />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </div>
                <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
