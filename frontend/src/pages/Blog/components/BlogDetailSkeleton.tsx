import Breadcrumb from '@/components/ui/Breadcrumb';

export default function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        title="Loading Article..."
        items={[{ label: 'Blog', href: '/blogs' }, { label: '...' }]}
      />
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-2/3 mb-6" />
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-10" />
        <div className="h-64 bg-slate-200 rounded-2xl mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
