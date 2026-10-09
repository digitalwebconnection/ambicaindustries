import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight, User, Sparkles, Calendar, BookmarkCheck } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';

// Dynamic category color generator providing harmonious color accents
export function getCategoryBadge(category?: string) {
  if (!category) return {
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
    dot: 'bg-slate-400',
  };

  const palette = [
    { badge: 'bg-rose-50/95 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
    { badge: 'bg-amber-50/95 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
    { badge: 'bg-emerald-50/95 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
    { badge: 'bg-blue-50/95 text-blue-800 border-blue-200', dot: 'bg-blue-600' },
    { badge: 'bg-purple-50/95 text-purple-800 border-purple-200', dot: 'bg-purple-500' },
    { badge: 'bg-teal-50/95 text-teal-800 border-teal-200', dot: 'bg-teal-500' },
    { badge: 'bg-indigo-50/95 text-indigo-800 border-indigo-200', dot: 'bg-indigo-500' },
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const categoryStyle = getCategoryBadge(article.category);
  const hasImage = Boolean(article.imageUrl && !imgError);

  // Magic UI Spotlight cursor tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full bg-white rounded-xl overflow-hidden border border-slate-300/80 hover:border-accent-red/40 shadow-lg shadow-black hover:shadow-[0_22px_45px_-12px_rgba(6,64,140,0.52)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group"
      >
        {/* ================= 1. MAGIC UI SPOTLIGHT HOVER EFFECT ================= */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: isHovered
              ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(225, 29, 72, 0.08), transparent 70%)`
              : 'none',
          }}
          aria-hidden="true"
        />

        <div>
          {/* ================= 2. FEATURED IMAGE BANNER WITH GLARE ================= */}
          <Link
            to={`/blogs/${article.slug}`}
            className="block relative aspect-16/10 overflow-hidden bg-slate-950 shrink-0"
          >
            {hasImage ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                onError={() => setImgError(true)}
              />
            ) : (
              /* High-tech chemical dyestuff canvas fallback */
              <div className="w-full h-full bg-linear-to-br from-slate-950 via-[#032554] to-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[20px_20px] opacity-15" />
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-accent-red/20 blur-2xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-500/20 blur-2xl rounded-full" />

                <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 mb-2 shadow-inner">
                  <Sparkles size={22} className="text-amber-400" />
                </div>
                <span className="relative z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/20 mb-1">
                  {article.category || 'Dye Chemistry'}
                </span>
                <span className="relative z-10 text-white/50 text-[11px] font-mono">
                  Ambica Technical R&amp;D
                </span>
              </div>
            )}

            {/* Gradient shadow for text & badge contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

            {/* Magic UI Diagonal Hover Glare sweep */}
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12"
              aria-hidden="true"
            />

            {/* Top Left: Category Badge with Pulsing Live Dot */}
            <div className="absolute top-3.5 left-3.5 z-20">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black backdrop-blur-xl shadow-md border ${categoryStyle.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot} animate-pulse`} />
                {article.category}
              </span>
            </div>

            {/* Top Right: Read Time Chip */}
            <div className="absolute top-3.5 right-3.5 z-20">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/75 backdrop-blur-xl text-white shadow-md border border-white/15">
                <Clock size={11} className="text-amber-400" />
                {article.readTime || '5 min read'}
              </span>
            </div>
          </Link>

          {/* ================= 3. CARD BODY CONTENT ================= */}
          <div className="p-6 sm:p-7">
            {/* Title with Serif Class and Hover Accent Color */}
            <Link to={`/blogs/${article.slug}`}>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-accent-red transition-colors duration-300 line-clamp-2 leading-snug mb-3 tracking-tight">
                {article.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-5">
              {article.excerpt}
            </p>

            {/* Key takeaway highlight box (if available) */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-100/90 text-[11px] text-slate-700 flex items-start gap-2">
                <BookmarkCheck size={14} className="text-accent-red shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-normal">
                  <strong className="text-slate-900 font-semibold">Highlight: </strong>
                  {article.keyTakeaways[0]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= 4. CARD FOOTER CONTROLS ================= */}
        <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
          {/* Author & Publish Date */}
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 truncate">
              <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <User size={11} />
              </span>
              <span className="truncate">{article.author || 'Ambica Technical'}</span>
            </span>

            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Calendar size={10} className="text-slate-400 shrink-0" />
              <span>{article.publishDate}</span>
              {article.views !== undefined && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Eye size={10} className="text-slate-400" />
                    {article.views}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Action "Read Article" Pill Button */}
          <Link
            to={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 group-hover:bg-accent-red text-white text-xs font-bold tracking-wide transition-all duration-300 shadow-xs group-hover:shadow-lg group-hover:shadow-accent-red/25 shrink-0 group/btn"
          >
            <span>Read</span>
            <ArrowRight
              size={13}
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
