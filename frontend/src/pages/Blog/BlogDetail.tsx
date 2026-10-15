import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '@/components/seo/SEO';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { fetchBlogBySlug, fetchBlogs } from '@/services/blogService';
import type { BlogArticle } from '@/types/blog';
import {
  BlogDetailSkeleton,
  BlogDetailNotFound,
  BlogDetailHeroImage,
  BlogDetailTakeaways,
  BlogDetailContent,
  BlogDetailRelated,
  BlogDetailCTA,
  BlogDetailSidebar,
} from './components';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const data = await fetchBlogBySlug(slug as string);
        if (!isMounted) return;                                                                           
        setArticle(data);

        // Fetch related articles
        try {
          const listRes = await fetchBlogs({ limit: 4 });
          if (isMounted) {
            const others = (listRes.data || []).filter((b) => b.slug !== slug);
            setRelatedArticles(others.slice(0, 3));
          }
        } catch {
          // Non-critical
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching article:', err);
        setError((err as Error).message || 'Failed to load article');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (error || !article) {
    return <BlogDetailNotFound error={error} />;
  }

  return (
    <>
      <SEO
        title={`${article.title} | Ambica Industry`}
        description={article.excerpt}
        keywords={article.keywords || `${article.category}, industrial dyes, ambica industry`}
        canonical={`/blogs/${article.slug}`}
        ogType="article"
        schema={createBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blogs' },
          { name: article.title, url: `/blogs/${article.slug}` },
        ])}
      />

      <Breadcrumb
        title="Technical Publication"
        badge={article.category}
        subtitle="Industrial color chemistry & formulation insights from Ambica Industry R&D."
        items={[
          { label: 'Blog & Articles', href: '/blogs' },
          { label: article.category },
        ]}
      />

      <article className="py-12 sm:py-16 bg-slate-50 min-h-screen">
        {/* ===== Full-Width Hero with Overlaid Title ===== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogDetailHeroImage article={article} />
        </div>

        {/* ===== Editorial Layout: Content (70%) + Sidebar (30%) ===== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Main Content Column */}
            <div className="flex-1 min-w-0">
              {/* Key Takeaways Card (red left-border) */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <BlogDetailTakeaways keyTakeaways={article.keyTakeaways} />
              )}

              {/* Article Body with Drop-Cap */}
              <BlogDetailContent
                content={article.content}
                author={article.author || 'Ambica Industries'}
              />
            </div>

            {/* Sidebar Column — Author, Share, TOC */}
            <BlogDetailSidebar article={article} />
          </div>
        </div>

        {/* ===== Full-Width Bottom Sections ===== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* Related Articles */}
          <BlogDetailRelated relatedArticles={relatedArticles} />

          {/* CTA Banner */}
          <BlogDetailCTA />
        </div>
      </article>
    </>
  );
}
