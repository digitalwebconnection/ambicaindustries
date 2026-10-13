import { useState, useEffect, useMemo } from 'react';
import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { fetchBlogs } from '@/services/blogService';
import type { BlogArticle } from '@/types/blog';
import {
  ArticleCard,
  BlogLoader,
  BlogEmptyState,
} from './components';
import { FlaskConical, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      console.error('Error fetching blogs from database:', err);
      setError((err as Error).message || 'Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Sort blogs: Newest first
  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => {
      const dateA = new Date(a.publishDate || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishDate || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [blogs]);

  return (
    <>
      <SEO
        title={seoConfig.blogs?.title || 'Technical Blog & Color Chemistry Insights | Ambica Industry'}
        description={
          seoConfig.blogs?.description ||
          'Explore technical insights on industrial dyestuff, color fastness, textile processing, and chemical innovations from Ambica Industry.'
        }
        keywords={seoConfig.blogs?.keywords || 'dyes blog, textile color chemistry, acid dyes insights, reactive dyes guides'}
        canonical={seoConfig.blogs?.canonical || '/blogs'}
        schema={createBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blogs' },
        ])}
      />

      {/* Header Banner */}
      <Breadcrumb
        title="Technical Insights & Knowledge Hub"
        badge="Ambica Industry • Est. 1986"
        subtitle="Exploring color chemistry, industrial dyestuff synthesis, and textile processing innovations."
        items={[{ label: 'Blog & Articles' }]}
      />

      {/* Main Blog Content Section */}
      <section className="py-8 sm:py-10 bg-slate-50/80 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ================= 1. INDUSTRIAL STATS / PILLARS RIBBON ================= */}
          <div className="mb-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-400/90 shadow-lg shadow-black/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FlaskConical size={20} />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">Dye Chemistry</div>
                <div className="text-xs text-slate-500 truncate">Synthesis &amp; Fastness</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-5 border  border-slate-400/90 shadow-lg shadow-black/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent-red/10 text-accent-red flex items-center justify-center shrink-0">
                <BookOpen size={20} />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">Technical Guides</div>
                <div className="text-xs text-slate-500 truncate">Process &amp; Applications</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-5 border  border-slate-400/90 shadow-lg shadow-black/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">Color Science</div>
                <div className="text-xs text-slate-500 truncate">Spectrophotometry &amp; Lab</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-5 border  border-slate-400/90 shadow-lg shadow-black/60 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">Quality Certified</div>
                <div className="text-xs text-slate-500 truncate">ISO &amp; Eco Standards</div>
              </div>
            </div>
          </div>

          {/* ================= 2. LOADING STATE ================= */}
          {loading && <BlogLoader />}

          {/* ================= 3. EMPTY / ERROR STATE ================= */}
          {!loading && (error || sortedBlogs.length === 0) && (
            <BlogEmptyState
              error={error}
              loading={loading}
              onRetry={loadBlogs}
              hasTotalArticles={false}
            />
          )}

          {/* ================= 4. ARTICLES CARD GRID ================= */}
          {!loading && !error && sortedBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
              {sortedBlogs.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
