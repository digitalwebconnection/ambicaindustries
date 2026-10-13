import { AlertCircle, RefreshCw, Search, Sparkles } from 'lucide-react';

interface BlogEmptyStateProps {
  error?: string | null;
  onRetry?: () => void;
  loading?: boolean;
  searchTerm?: string;
  selectedCategory?: string;
  hasTotalArticles?: boolean;
  onReset?: () => void;
  onSelectSuggestion?: (cat: string) => void;
}

export default function BlogEmptyState({
  error,
  onRetry,
  loading = false,
  searchTerm,
  selectedCategory,
  hasTotalArticles = false,
  onReset,
  onSelectSuggestion,
}: BlogEmptyStateProps) {
  // If there's an error from the backend/database
  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-6 bg-white rounded-3xl border border-rose-100 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-5 shadow-xs">
          <AlertCircle size={32} />
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Unable to Load Publications
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {error || 'Our database connection encountered a temporary hiccup. Please try refreshing.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-red hover:bg-accent-red-dark text-white font-bold text-sm transition-all shadow-md hover:shadow-accent-red/25 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Retrying...' : 'Retry Connection'}</span>
          </button>
        )}
      </div>
    );
  }

  // If search/filter results are empty
  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-6 ">
      <div className="w-16 h-16 mx-auto rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-5 shadow-xs">
        <Search size={30} />
      </div>

      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
        No Matching Publications Found
      </h3>

      <p className="text-sm text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
        {!hasTotalArticles
          ? 'No articles have been published in the database yet. Check back soon for color chemistry updates.'
          : `We couldn't find any articles matching "${searchTerm || selectedCategory}". Try adjusting your keywords or browse popular categories below.`}
      </p>

      {hasTotalArticles && (
        <div className="space-y-6">
          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
            >
              <span>View All Articles</span>
            </button>
          )}

          {/* Suggested topics */}
          {onSelectSuggestion && (
            <div className="pt-6 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-amber-500" />
                Suggested Categories
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Acid Dyes', 'Direct Dyes', 'Reactive Dyes', 'Textile Processing'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onSelectSuggestion(cat)}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
