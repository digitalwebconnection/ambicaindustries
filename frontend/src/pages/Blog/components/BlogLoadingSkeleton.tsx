interface BlogLoadingSkeletonProps {
  count?: number;
}

export default function BlogLoadingSkeleton({ count = 6 }: BlogLoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs animate-pulse"
        >
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
          <div className="h-4 bg-slate-100 rounded w-full mb-6" />
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="h-4 bg-slate-200 rounded w-20" />
            <div className="h-4 bg-slate-200 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
