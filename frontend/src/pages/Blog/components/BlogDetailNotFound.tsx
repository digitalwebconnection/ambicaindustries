import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface BlogDetailNotFoundProps {
  error?: string | null;
}

export default function BlogDetailNotFound({ error }: BlogDetailNotFoundProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        title="Article Not Found"
        items={[{ label: 'Blog', href: '/blogs' }, { label: 'Error' }]}
      />
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-slate-600 mb-6 text-sm">
          {error || 'The requested article could not be located in the database.'}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-red text-white font-semibold text-sm hover:bg-accent-red-dark transition-colors cursor-pointer"
          >
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </div>
    </div>
  );
}
