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
      className="mb-10 rounded-2xl bg-white border-l-4 border-l-accent-red border border-slate-200/80 p-6 sm:p-8 shadow-sm relative overflow-hidden"
    >
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-accent-red/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center gap-2.5 mb-5 text-slate-900 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-accent-red/10 flex items-center justify-center">
          <BookmarkCheck size={18} className="text-accent-red" />
        </div>
        <h2 className="text-base sm:text-lg font-black tracking-tight">
          Key Takeaways
        </h2>
      </div>

      <ul className="space-y-3 relative z-10">
        {keyTakeaways.map((takeaway, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.3 }}
            className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-normal"
          >
            <CheckCircle2 size={18} className="text-accent-red shrink-0 mt-0.5" />
            <span>{takeaway}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
