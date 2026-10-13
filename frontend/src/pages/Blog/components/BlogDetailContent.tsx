import { Sparkles } from 'lucide-react';

interface BlogDetailContentProps {
  content: string[] | string;
  author: string;
}

export default function BlogDetailContent({ content, author }: BlogDetailContentProps) {
  // Helper to render either array of paragraphs or rich text HTML
  const renderContent = (data: string[] | string) => {
    if (Array.isArray(data)) {
      return data.map((para, i) => (
        <p
          key={i}
          data-toc-heading={i < 6 ? '' : undefined}
          className={`text-slate-700 text-base sm:text-[17px] leading-[1.85] mb-6 font-normal ${
            i === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-slate-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none' : ''
          }`}
        >
          {para}
        </p>
      ));
    }
    return (
      <div
        className="prose prose-slate prose-lg max-w-none text-slate-700 leading-[1.85] prose-headings:font-serif prose-headings:tracking-tight prose-h2:text-2xl prose-h2:font-black prose-h2:text-slate-900 prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-p:text-[17px] prose-a:text-accent-red prose-a:font-semibold prose-blockquote:border-l-accent-red prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-slate-600 prose-strong:text-slate-900 first:prose-p:first-letter:text-5xl first:prose-p:first-letter:font-serif first:prose-p:first-letter:font-black first:prose-p:first-letter:float-left first:prose-p:first-letter:mr-3 first:prose-p:first-letter:mt-1 first:prose-p:first-letter:leading-none"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    );
  };

  return (
    <main className="mb-10">
      <div className="text-slate-800 leading-relaxed font-sans">
        {renderContent(content)}
      </div>

      {/* Author Attribution Box */}
      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border">
        <div className="w-12 h-12 rounded-full bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red shrink-0">
          <Sparkles size={22} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Published by {author}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Ambica Industry R&amp;D Technical Group — Providing customized dye synthesis and technical processing support for global textile mills, paper manufacturers, and tanneries since 1986.
          </p>
        </div>
      </div>
    </main>
  );
}
