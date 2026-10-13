import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight, User, Calendar } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';

// Dynamic category color generator providing harmonious color accents
export function getCategoryBadge(category?: string) {
  if (!category) return {
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
    dot: 'bg-slate-400',
  };

  const palette = [
    { badge: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
    { badge: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
    { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
    { badge: 'bg-blue-50 text-blue-800 border-blue-200', dot: 'bg-blue-600' },
    { badge: 'bg-purple-50 text-purple-800 border-purple-200', dot: 'bg-purple-500' },
    { badge: 'bg-teal-50 text-teal-800 border-teal-200', dot: 'bg-teal-500' },
    { badge: 'bg-indigo-50 text-indigo-800 border-indigo-200', dot: 'bg-indigo-500' },
  ];

  let sum = 0;
  for (let i = 0; i < category.length; i++) sum += category.charCodeAt(i);
  return palette[sum % palette.length];
}

interface ArticleCardProps {
  article: BlogArticle;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false);
  const categoryStyle = getCategoryBadge(article.category);
  const hasImage = Boolean(article.imageUrl && !imgError);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
      className="h-full flex"
    >
      <div className="flex flex-col h-full w-full bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
        {/* ================= 1. FEATURED IMAGE BANNER ================= */}
        <Link
          to={`/blogs/${article.slug}`}
          className="block relative aspect-16/10 overflow-hidden bg-slate-900 shrink-0"
        >
          {hasImage ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-fill group-hover:scale-106 transition-transform duration-500 ease-out"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Fallback dye chemistry backdrop */
            <div className="w-full h-full bg-linear-to-br from-slate-950 via-[#032554] to-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
              <span className="relative z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/20 mb-1">
                {article.category || 'Dye Chemistry'}
              </span>
              <span className="relative z-10 text-white/50 text-[11px] font-mono">
                Ambica Technical Lab
              </span>
            </div>
          )}

          {/* Top Left: Category Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-xs border ${categoryStyle.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
              {article.category || 'General'}
            </span>
          </div>

          {/* Top Right: Read Time Chip */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/75 backdrop-blur-md text-white shadow-xs border border-white/15">
              <Clock size={11} className="text-amber-400" />
              {article.readTime || '5 min read'}
            </span>
          </div>
        </Link>

        {/* ================= 2. CARD BODY CONTENT ================= */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
          <div>
            {/* Meta Row: Date & Views */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-2.5 font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-slate-400" />
                {article.publishDate || 'Recent'}
              </span>
              {article.views !== undefined && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} className="text-slate-400" />
                    {article.views} views
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <Link to={`/blogs/${article.slug}`}>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug mb-2.5">
                {article.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
              {article.excerpt}
            </p>
          </div>

          {/* ================= 3. CARD FOOTER ================= */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-auto">
            {/* Author */}
            <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
              <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                <User size={11} />
              </span>
              <span className="truncate">{article.author || 'Ambica Technical'}</span>
            </span>

            {/* Read Link */}
            <Link
              to={`/blogs/${article.slug}`}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-accent-red hover:text-accent-red-dark group-hover:translate-x-1 transition-all shrink-0 cursor-pointer"
            >
              <span>Read</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
