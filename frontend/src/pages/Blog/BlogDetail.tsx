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
  BlogDetailHeader,
  BlogDetailHeroImage,
  BlogDetailTakeaways,
  BlogDetailContent,
  BlogDetailRelated,
  BlogDetailCTA,
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Header Card (Back Link, Badges, Title, Excerpt, Author, Share Buttons) */}
          <BlogDetailHeader article={article} />

          {/* 2. Featured Hero Image Banner */}
          <BlogDetailHeroImage article={article} />

          {/* 3. Executive Summary / Technical Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <BlogDetailTakeaways keyTakeaways={article.keyTakeaways} />
          )}

          {/* 4. Article Main Body Content & Author Attribution Box */}
          <BlogDetailContent
            content={article.content}
            author={article.author || 'Trent Palmer'}
          />

          {/* 5. Related Technical Publications */}
          <BlogDetailRelated relatedArticles={relatedArticles} />

          {/* 6. Call To Action (Sample Request) */}
          <BlogDetailCTA />
        </div>
      </article>
    </>
  );
}
