import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';


// ================= Magic UI: Meteors =================
function Meteors({ number = 10 }: { number?: number }) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: `${Math.floor(Math.random() * 80) - 10}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
      animationDuration: `${(Math.random() * 3 + 4).toFixed(2)}s`,
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className="animate-meteor pointer-events-none absolute h-0.5 w-0.5 rotate-215 rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff20]"
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-14 -translate-y-1/2 bg-linear-to-r from-slate-400/80 to-transparent" />
        </span>
      ))}
    </div>
  );
}

export default function BlogDetailCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="relative mt-12 rounded-xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 group"
    >
    
      {/* 2. Magic UI: Ambient Meteors Effect */}
      <Meteors number={8} />

      {/* 3. Ambient Atmospheric Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-accent-red/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
          Need Custom Dyestuff Formulation or Samples?
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Request certified TDS/SDS documentation, spectrophotometric shade matching, or laboratory evaluation batches for your mill.
        </p>
      </div>

      {/* Actions */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
        <Link
          to="/enquiry"
          className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-red hover:bg-accent-red-dark text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-accent-red/30 hover:scale-102 cursor-pointer overflow-hidden"
        >
          {/* Subtle Sheen Sweep */}
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none" />
          <span className="relative z-10">Request Samples</span>
          <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-102 cursor-pointer"
        >
          <Mail size={13} className="text-slate-300" />
          <span>Contact Us</span>
        </Link>
      </div>
    </motion.div>
  );
}
