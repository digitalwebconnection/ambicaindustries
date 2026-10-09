import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Share2,
  Check,
  Bookmark,
} from 'lucide-react';
import type { BlogArticle } from '@/types/blog';
import { getCategoryBadge } from './ArticleCard';

interface BlogDetailHeaderProps {
  article: BlogArticle;
}

export default function BlogDetailHeader({ article }: BlogDetailHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const categoryStyle = getCategoryBadge(article.category);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform: 'whatsapp' | 'linkedin' | 'twitter') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title || 'Ambica Industry Publication');

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
    }
  };

  // Extract author initials for the avatar badge
  const authorInitials = (article.author || 'AI')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="mb-10">
      {/* ================= 1. TOP NAVIGATION & CATEGORY PILL ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80">
        {/* Back Link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-accent-red transition-colors group cursor-pointer"
        >
          <span className="w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center group-hover:border-accent-red group-hover:bg-accent-red/5 transition-colors">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          </span>
          <span>Back to All Publications</span>
        </Link>

        {/* Category Badge & Live Pulse */}
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-2xs border ${categoryStyle.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot} animate-pulse`} />
            {article.category}
          </span>
        </div>
      </div>

      {/* ================= 2. EDITORIAL ARTICLE TITLE (SERIF LETTERS) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-black text-slate-950 tracking-tight leading-[1.18] mb-6 drop-shadow-2xs">
          {article.title}
        </h1>

        {/* ================= 3. EDITORIAL LEAD EXCERPT ================= */}
        {article.excerpt && (
          <div className="relative mb-8 pl-5 py-2 border-l-4 border-accent-red bg-gradient-to-r from-rose-50/60 via-slate-50/40 to-transparent rounded-r-2xl">
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-sans italic font-normal">
              "{article.excerpt}"
            </p>
          </div>
        )}

        {/* ================= 4. AUTHOR BYLINE & INTERACTIVE SHARE SUITE ================= */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* Author Details */}
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Author Avatar with Initials */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md ring-2 ring-accent-red/20 ring-offset-2">
              {authorInitials}
            </div>

            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{article.author}</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold text-accent-red hidden sm:inline-block">
                  Verified Contributor
                </span>
              </div>
              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5">
                <span>{article.authorRole || 'Chemical Synthesis Specialist'}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Calendar size={12} className="text-slate-400" />
                  {article.publishDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock size={12} className="text-slate-400" />
                  {article.readTime || '5 min read'}
                </span>
                {article.views !== undefined && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Eye size={12} className="text-slate-400" />
                      {article.views} views
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Share & Bookmark Actions */}
          <div className="flex items-center gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <span className="text-xs font-bold text-slate-400 mr-1 hidden lg:inline uppercase tracking-wider">
              Share:
            </span>

            {/* WhatsApp */}
            <button
              onClick={() => handleShare('whatsapp')}
              aria-label="Share on WhatsApp"
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
            >
              WhatsApp
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleShare('linkedin')}
              aria-label="Share on LinkedIn"
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer shadow-2xs"
            >
              LinkedIn
            </button>

            {/* Twitter / X */}
            <button
              onClick={() => handleShare('twitter')}
              aria-label="Share on X"
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              X
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              aria-label="Copy article link"
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={13} className="text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              aria-label="Bookmark article"
              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                bookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Bookmark article'}
            >
              <Bookmark size={15} className={bookmarked ? 'fill-amber-500' : ''} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
