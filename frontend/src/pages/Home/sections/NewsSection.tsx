import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock, AlertCircle } from 'lucide-react';
import { fetchBlogs } from '@/services/blogService';
import type { BlogArticle } from '@/types/blog';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

function NewsCardItem({ item }: { item: BlogArticle }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(item.imageUrl && !imgError);

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/* Image Header */}
      <Link
        to={`/blogs/${item.slug}`}
        className="block relative aspect-16/10 overflow-hidden bg-slate-900 group/img shrink-0"
      >
        {hasImage ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover/img:scale-108 group-hover:scale-108 transition-transform duration-500 ease-out"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-950 via-slate-900 to-primary-dark flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover/img:scale-105 transition-transform duration-500">
            <span className="relative z-10 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-white/90 backdrop-blur-md border border-white/20 mb-1.5 uppercase tracking-wider">
              {item.category || 'News'}
            </span>
            <span className="relative z-10 text-white/40 text-[11px] font-mono">
              Ambica Industry
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs border border-white/40">
            {item.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white shadow-xs flex items-center gap-1 border border-white/10">
            <Clock size={11} />
            {item.readTime || '5 min read'}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 lg:p-7 justify-between">
        <div>
          {/* Title */}
          <Link to={`/blogs/${item.slug}`}>
            <h3 className="text-lg md:text-xl font-extrabold text-primary-dark mb-3 leading-snug group-hover:text-accent-red transition-colors duration-300 line-clamp-2">
              {item.title}
            </h3>
          </Link>
          
          {/* Excerpt */}
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
            {item.excerpt}
          </p>
        </div>

        {/* Footer with Author and Link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <User size={12} className="text-slate-400" />
              {item.author || 'Trent Palmer'}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Calendar size={11} /> {item.publishDate}
            </span>
          </div>

          <Link
            to={`/blogs/${item.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-accent-red group-hover:translate-x-1 transition-transform"
          >
            <span>Read</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsSection() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadLatestNews() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchBlogs({ limit: 3 });
        if (isMounted) {
          setArticles(res.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch home articles:', err);
          setError((err as Error).message || 'Unable to load latest news');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLatestNews();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-8 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 mb-8 sm:mb-16"
        >
          <div className="max-w-2xl relative">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
              <span className="h-0.5 w-8 sm:w-10 bg-primary-dark rounded-full" />
              <span className="text-primary-dark font-bold text-xs sm:text-sm uppercase tracking-widest">
                News &amp; Insights
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark leading-[1.15] md:leading-[1.1] mb-2">
              Latest Updates &amp; <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-red to-accent-red-dark">
                Industry Perspectives
              </span>
            </motion.h2>
          </div>
          
          <motion.div variants={fadeUp} className="hidden md:block pb-2">
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-3 px-8 py-2.5 bg-primary-dark text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-[#003A7C]/20 hover:shadow-accent-red/30"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-slate-200 rounded-xl overflow-hidden p-6 animate-pulse bg-white">
                <div className="w-full aspect-4/3 bg-slate-100 rounded-lg mb-6" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error or Empty State */}
        {!loading && error && articles.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <AlertCircle size={28} className="mx-auto text-slate-400 mb-2" />
            <p className="text-sm text-slate-600 mb-4">{error}</p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent-red text-white text-xs font-semibold"
            >
              Go to Blog
            </Link>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-4">No published articles yet in the database.</p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent-red text-white text-xs font-semibold"
            >
              View Blog Page
            </Link>
          </div>
        )}

        {/* Dynamic Articles from Database */}
        {!loading && articles.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((item) => (
              <NewsCardItem key={item.slug} item={item} />
            ))}
          </motion.div>
        )}

        {/* Mobile View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-8 text-center md:hidden"
        >
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-3 px-8 py-2.5 bg-primary-dark text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-[#003A7C]/20 hover:shadow-accent-red/30"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
