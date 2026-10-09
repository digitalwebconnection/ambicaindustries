import { motion } from 'framer-motion';
import { BookmarkCheck, CheckCircle2 } from 'lucide-react';

interface BlogDetailTakeawaysProps {
  keyTakeaways: string[];
}

export default function BlogDetailTakeaways({ keyTakeaways }: BlogDetailTakeawaysProps) {
  if (!keyTakeaways || keyTakeaways.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-10 rounded-2xl bg-linear-to-br from-amber-50/80 to-rose-50/60 border border-amber-200/80 p-6 sm:p-8 shadow-xs"
    >
      <div className="flex items-center gap-2.5 mb-4 text-amber-900">
        <BookmarkCheck size={20} className="text-accent-red" />
        <h2 className="text-base sm:text-lg font-bold tracking-tight">
          Executive Summary &amp; Technical Highlights
        </h2>
      </div>
      <ul className="space-y-3">
        {keyTakeaways.map((takeaway, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-sm sm:text-base text-slate-800 leading-normal"
          >
            <CheckCircle2 size={18} className="text-accent-red shrink-0 mt-0.5" />
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
