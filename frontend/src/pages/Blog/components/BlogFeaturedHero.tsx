import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, User, Sparkles, BookmarkCheck, Eye } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import { getCategoryBadge } from './ArticleCard';

interface BlogFeaturedHeroProps {
  article: BlogArticle;
}

export default function BlogFeaturedHero({ article }: BlogFeaturedHeroProps) {
  const [imgError, setImgError] = useState(false);
  const categoryStyle = getCategoryBadge(article.category);
  const hasImage = Boolean(article.imageUrl && !imgError);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-14"
    >
      <div className="relative group rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
        {/* Ambient background glow behind card */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* ================= LEFT COLUMN: CONTENT ================= */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1 z-10">
            <div>
              {/* Badges & Meta Row */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-800 border border-amber-300/60 shadow-xs">
                  <Sparkles size={13} className="text-amber-500" />
                  Featured Publication
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${categoryStyle.badge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot} animate-pulse`} />
                  {article.category || 'Color Chemistry'}
                </span>

                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock size={12} className="text-slate-400" />
                  {article.readTime || '5 min read'}
                </span>
              </div>

              {/* Title */}
              <Link to={`/blogs/${article.slug}`}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight mb-4 tracking-tight">
                  {article.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                {article.excerpt}
              </p>

              {/* Key Takeaway Highlight if available */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="mb-6 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <BookmarkCheck size={16} className="text-accent-red shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    <strong className="text-slate-900 font-semibold">Core Insight: </strong>
                    {article.keyTakeaways[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Author & CTA Button Row */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-header-blue text-white flex items-center justify-center font-bold text-sm shadow-md">
                  <User size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {article.author || 'Ambica Technical Team'}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {article.publishDate}
                    </span>
                    {article.views !== undefined && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye size={11} />
                          {article.views} reads
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link
                to={`/blogs/${article.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-accent-red text-white text-sm font-bold shadow-md hover:shadow-lg hover:shadow-accent-red/25 transition-all duration-300 group/btn"
              >
                <span>Read Full Article</span>
                <ArrowRight
                  size={15}
                  className="group-hover/btn:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: VISUAL COVER ================= */}
          <div className="lg:col-span-5 relative min-h-64 sm:min-h-80 lg:min-h-full overflow-hidden order-1 lg:order-2 bg-slate-950">
            <Link to={`/blogs/${article.slug}`} className="block w-full h-full">
              {hasImage ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full min-h-72 bg-linear-to-br from-slate-950 via-[#032554] to-slate-900 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[20px_20px] opacity-15" />
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
                    <Sparkles size={28} className="text-amber-400" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/20 mb-2">
                    {article.category || 'Industrial Color Chemistry'}
                  </span>
                  <span className="text-white/60 text-xs font-mono">
                    Ambica Research &amp; Development
                  </span>
                </div>
              )}

              {/* Gradient scrim for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Hover glare overlay */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/15 to-transparent pointer-events-none -skew-x-12"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
