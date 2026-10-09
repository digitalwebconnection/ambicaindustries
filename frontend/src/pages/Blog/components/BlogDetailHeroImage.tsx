import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { BlogArticle } from '@/types/blog';

interface BlogDetailHeroImageProps {
  article: BlogArticle;
}

export default function BlogDetailHeroImage({ article }: BlogDetailHeroImageProps) {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 aspect-16/9 sm:aspect-21/9 max-h-[520px] relative group">
      {!heroImgError && article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          onError={() => setHeroImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-slate-950 via-slate-900 to-primary-dark flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-accent-red/25 via-transparent to-transparent opacity-60" />
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
            <Sparkles size={32} />
          </div>
          <span className="relative z-10 px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-md border border-white/20 mb-2 uppercase tracking-wider">
            {article.category}
          </span>
          <span className="relative z-10 text-white/50 text-xs font-mono">
            Ambica Industry Technical Knowledgebase
          </span>
        </div>
      )}
    </div>
  );
}
