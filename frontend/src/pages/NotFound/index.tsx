import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import SEO from '@/components/seo/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Ambica Industry" noindex={true} />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-slate-50">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
          <span className="text-6xl sm:text-7xl font-black text-accent-red tracking-tight block mb-2">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            The page you are looking for does not exist, has been removed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Home size={16} /> Back to Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all duration-300"
            >
              <ArrowLeft size={16} /> View Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
