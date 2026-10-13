import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Sparkles } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import { getCategoryBadge } from './ArticleCard';

interface BlogDetailHeroImageProps {
  article: BlogArticle;
}

export default function BlogDetailHeroImage({ article }: BlogDetailHeroImageProps) {
  const [heroImgError, setHeroImgError] = useState(false);
  const categoryStyle = getCategoryBadge(article.category);

  // Author initials
  const authorInitials = (article.author || 'AI')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="mb-10">
      {/* ===== Hero Image Container ===== */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-slate-900 group">
        {/* Back Link — floating on top-left */}
        <Link
          to="/blogs"
          className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-accent-red border border-white/40 shadow-md transition-all cursor-pointer group/back"
        >
          <ArrowLeft size={14} className="group-hover/back:-translate-x-0.5 transition-transform" />
          All Publications
        </Link>

        {/* Hero Image — Full width & Fill */}
        <div className="w-full h-80 sm:h-100 md:h-120 lg:h-135 relative overflow-hidden">
          {!heroImgError && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-fill transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              onError={() => setHeroImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-slate-950 via-slate-900 to-primary-dark flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-accent-red/25 via-transparent to-transparent opacity-60" />
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
                <Sparkles size={32} />
              </div>
              <span className="relative z-10 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-md border border-white/20 mb-2 uppercase tracking-wider">
                {article.category}
              </span>
              <span className="relative z-10 text-white/50 text-xs font-mono">
                Ambica Industry Technical Knowledgebase
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ===== Title & Metadata — Simple & Clean Between Image and Content (NO BOX) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 mb-6 pb-8 border-b border-slate-200/90"
      >
        {/* Category Badge & Read Time */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${categoryStyle.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot} animate-pulse`} />
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Clock size={13} className="text-slate-400" />
            {article.readTime || '5 min read'}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black text-slate-950 tracking-tight  leading-[1.2] mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-4xl">
            {article.excerpt}
          </p>
        )}

        {/* Author Byline & Publish Date */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          {/* Author Details */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-primary to-primary-dark text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm ring-2 ring-accent-red/20 ring-offset-2">
              {authorInitials}
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                {article.author}
                <span className="text-[10px] font-semibold text-accent-red bg-accent-red/10 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {article.authorRole || 'Chemical Synthesis Specialist'}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <Calendar size={14} className="text-slate-400" />
            <span>{article.publishDate}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
