import { Link } from 'react-router-dom';
import type { BlogArticle } from '@/types/blog';

interface BlogDetailRelatedProps {
  relatedArticles: BlogArticle[];
}

export default function BlogDetailRelated({ relatedArticles }: BlogDetailRelatedProps) {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-slate-900">
          Related Technical Publications
        </h3>
        <Link
          to="/blogs"
          className="text-xs font-bold text-accent-red hover:text-accent-red-dark transition-colors"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((rel) => (
          <Link
            key={rel.slug}
            to={`/blogs/${rel.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-accent-red/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="aspect-16/10 bg-slate-900 relative overflow-hidden shrink-0">
              {rel.imageUrl ? (
                <img
                  src={rel.imageUrl}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-slate-900 to-primary-dark flex items-center justify-center text-white/40 text-xs font-bold">
                  {rel.category}
                </div>
              )}
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                {rel.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-accent-red transition-colors line-clamp-2 mb-2 leading-snug">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {rel.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{rel.readTime || '5 min read'}</span>
                <span className="text-accent-red font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
