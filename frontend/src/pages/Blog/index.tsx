import { useState, useEffect, useMemo } from 'react';
import SEO from '@/components/seo/SEO';
import { seoConfig } from '@/components/seo/seoData';
import { createBreadcrumbSchema } from '@/components/seo/seoSchemas';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { fetchBlogs } from '@/services/blogService';
import type { BlogArticle } from '@/types/blog';
import {
  ArticleCard,
  BlogToolbar,
  BlogLoadingSkeleton,
  BlogEmptyState,
} from './components';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  // Compute available categories 100% dynamically from the database
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category?.trim()) set.add(b.category.trim());
    });
    return ['All', ...Array.from(set)];
  }, [blogs]);

  // Filtered database articles
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        blog.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase();

      const matchesSearch =
        !searchTerm.trim() ||
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchTerm]);

  return (
    <>
      <SEO
        title={seoConfig.blogs?.title || 'Technical Blog | Ambica Industry'}
        description={seoConfig.blogs?.description || 'Explore color chemistry insights from Ambica Industry.'}
        keywords={seoConfig.blogs?.keywords || 'dyes blog, textile color chemistry'}
        canonical={seoConfig.blogs?.canonical || '/blogs'}
        schema={createBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blogs' },
        ])}
      />

      {/* Header Banner */}
      <Breadcrumb
        title="Technical Insights & Blog"
        badge="Ambica Knowledge Hub • Est. 1986"
        subtitle="Exploring color chemistry, industrial dyestuff synthesis, and textile processing innovations."
        items={[{ label: 'Blog & Articles' }]}
      />

      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Search Bar & Category Filter Pills */}
          <BlogToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            totalCount={blogs.length}
            loading={loading}
          />

          {/* 2. Loading State */}
          {loading && <BlogLoadingSkeleton />}

          {/* 3. Error or Empty State */}
          {!loading && (error || filteredBlogs.length === 0) && (
            <BlogEmptyState
              error={error}
              onRetry={loadBlogs}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              hasTotalArticles={blogs.length > 0}
              onReset={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
            />
          )}

          {/* 4. Database Grid of Articles */}
          {!loading && !error && filteredBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
