import { AlertCircle, RefreshCw, Search } from 'lucide-react';

interface BlogEmptyStateProps {
  error?: string | null;
  onRetry?: () => void;
  searchTerm?: string;
  selectedCategory?: string;
  hasTotalArticles?: boolean;
  onReset?: () => void;
}

export default function BlogEmptyState({
  error,
  onRetry,
  searchTerm,
  selectedCategory,
  hasTotalArticles = false,
  onReset,
}: BlogEmptyStateProps) {
  // If there's an error from the backend/database
  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Database Connection Error</h3>
        <p className="text-sm text-slate-600 mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-red text-white font-semibold text-sm hover:bg-accent-red-dark transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        )}
      </div>
    );
  }

  // If results are empty
  return (
    <div className="max-w-md mx-auto text-center py-16 px-4">
      <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Search size={26} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
      <p className="text-sm text-slate-600 mb-6">
        {!hasTotalArticles
          ? 'No articles have been added to the database yet.'
          : `No matching articles found for "${searchTerm || selectedCategory}".`}
      </p>
      {hasTotalArticles && onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
