  import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  Check,
  Bookmark,
  User,
  ChevronRight,
} from 'lucide-react';
import type { BlogArticle } from '@/types/blog';

interface BlogDetailSidebarProps {
  article: BlogArticle;
}

// Extract headings from content for Table of Contents
function extractHeadings(content: string[] | string): string[] {
  if (typeof content === 'string') {
    // Extract h2/h3 from HTML content
    const matches = content.match(/<h[23][^>]*>(.*?)<\/h[23]>/gi) || [];
    return matches.map((m) => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  }
  // For array content, pick sentences that look like section headers (short & capitalized)
  return content
    .filter((p) => p.length < 80 && p.length > 10 && /^[A-Z]/.test(p))
    .slice(0, 6);
}

export default function BlogDetailSidebar({ article }: BlogDetailSidebarProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const headings = extractHeadings(article.content);

  // Author initials
  const authorInitials = (article.author || 'AI')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

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

  // Scroll spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = document.querySelectorAll('[data-toc-heading]');
      sections.forEach((section, idx) => {
        const top = (section as HTMLElement).offsetTop;
        if (scrollPos >= top) {
          setActiveSection(idx);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full lg:w-75 xl:w-[320px] shrink-0 space-y-6"
    >
      {/* ================== AUTHOR CARD ================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 lg:sticky lg:top-24">
        {/* Author Info */}
        <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary-dark text-white font-black text-base flex items-center justify-center shrink-0 shadow-md ring-2 ring-accent-red/20 ring-offset-2">
            {authorInitials}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              {article.author}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {article.authorRole || 'Chemical Synthesis Specialist'}
            </p>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-accent-red">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
              Verified Contributor
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Ambica Industry R&amp;D Technical Group — Providing customized dye synthesis and technical processing support for global textile mills since 1986.
        </p>

        {/* Social Share Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShare('linkedin')}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer text-center"
          >
            LinkedIn
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer text-center"
          >
            X
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex-1 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer text-center"
          >
            WhatsApp
          </button>
        </div>

        {/* Copy & Bookmark row */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={handleCopyLink}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={13} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              bookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
            title={bookmarked ? 'Saved' : 'Bookmark'}
          >
            <Bookmark size={15} className={bookmarked ? 'fill-amber-500' : ''} />
          </button>
        </div>

        {/* ================== TABLE OF CONTENTS ================== */}
        {headings.length > 0 && (
          <div className="mt-5 pt-5 border-t border-slate-100">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <User size={12} />
              Table of Contents
            </h4>
            <nav className="space-y-1">
              {headings.map((heading, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const el = document.querySelectorAll('[data-toc-heading]')[idx];
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeSection === idx
                      ? 'bg-accent-red/10 text-accent-red font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <ChevronRight
                    size={12}
                    className={`shrink-0 transition-transform ${
                      activeSection === idx ? 'text-accent-red rotate-90' : 'text-slate-300'
                    }`}
                  />
                  <span className="line-clamp-1">{heading}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
