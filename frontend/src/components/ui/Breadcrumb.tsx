import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import heroDyeBg from '@/assets/images/hero/vibrant-silk-textiles-colorful-heap-generated-by-ai.webp';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  title: string;
  items?: BreadcrumbItem[];
  subtitle?: string;
  badge?: string;
  align?: 'center' | 'left';
  className?: string;
}

// 24 animated colorful pigment particles simulating floating color chemistry
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: (i % 3) * 2.5 + 3, // 3px, 5.5px, 8px
  left: `${(i * 17) % 96 + 2}%`,
  top: `${(i * 23) % 85 + 10}%`,
  duration: 4.5 + (i % 5) * 1.5,
  delay: (i % 6) * 0.7,
  color: [
    'rgba(225, 29, 72, 0.85)', // Ruby / Accent Red
    'rgba(245, 158, 11, 0.9)', // Saffron Amber
    'rgba(6, 182, 212, 0.9)', // Electric Cyan
    'rgba(168, 85, 247, 0.9)', // Vivid Purple
    'rgba(16, 185, 129, 0.85)', // Emerald Dye
    'rgba(236, 72, 153, 0.9)', // Radiant Pink
  ][i % 6],
}));

export default function Breadcrumb({
  title,
  items = [],
  subtitle,
  badge,
  align = 'center',
  className = '',
}: BreadcrumbProps) {
  const isLeft = align === 'left';

  return (
    <section
      className={`relative min-h-[300px] sm:min-h-[360px] md:min-h-[420px] overflow-hidden flex items-center bg-slate-950 text-white ${className}`}
    >
      {/* ================= 1. BASE DEEP COLOR MESH BACKGROUND ================= */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#020b14] via-[#041c38] to-[#0a0720]"
        aria-hidden="true"
      />

      {/* ================= 2. KEN-BURNS DYE TEXTURE BLEND LAYER ================= */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.32, 0.22] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-center mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url(${heroDyeBg})` }}
        aria-hidden="true"
      />

      {/* ================= 3. VIBRANT CHROMATIC AURORA WAVES (Dye Fluid Mixing) ================= */}
      {/* 3a. Electric Magenta / Ruby Orb */}
      <motion.div
        animate={{
          scale: [1, 1.35, 1],
          x: [-60, 60, -60],
          y: [-40, 40, -40],
          rotate: [0, 180, 360],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-rose-600/60 via-pink-600/50 to-transparent blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 3b. Royal Sapphire & Electric Cyan Orb */}
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          x: [60, -60, 60],
          y: [40, -40, 40],
          rotate: [360, 180, 0],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-cyan-500/60 via-blue-600/50 to-indigo-700/40 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 3c. Saffron Amber & Golden Orange Core Glow */}
      <motion.div
        animate={{
          scale: [0.85, 1.25, 0.85],
          x: [-40, 50, -40],
          y: [30, -30, 30],
        }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[360px] rounded-full bg-gradient-to-r from-amber-500/45 via-orange-500/40 to-yellow-400/30 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 3d. Deep Amethyst & Violet Ambient Swell */}
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.1],
          x: [50, -40, 50],
          y: [-30, 35, -30],
        }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-purple-600/40 blur-[115px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ================= 4. FLOATING COLOR PIGMENT PARTICLES ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -70, -120],
              opacity: [0, 0.9, 0],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full shadow-lg"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 12px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* ================= 5. MAGIC UI HIGH-TECH GEOMETRIC LATTICE ================= */}
      <div
        className="absolute inset-0 opacity-5 mask-[radial-gradient(ellipse_65%_65%_at_50%_50%,#000_65%,transparent_100%)] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ================= 6. HERO CONTENT CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div
          className={`flex flex-col ${
            isLeft ? 'items-start text-left' : 'items-center text-center'
          } max-w-4xl ${isLeft ? '' : 'mx-auto'}`}
        >
          {/* Animated Rainbow Border Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <div className="relative inline-flex items-center rounded-full p-[1.5px] overflow-hidden shadow-xl shadow-accent-red/25 group/badge">
                {/* Rotating Conic Rainbow Beam */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute -inset-[180%] bg-[conic-gradient(from_0deg,#e11d48,#f59e0b,#10b981,#06b6d4,#8b5cf6,#ec4899,#e11d48)]"
                  aria-hidden="true"
                />
                <span className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-slate-950/85 backdrop-blur-2xl text-white/95">
                  <Sparkles size={13} className="text-amber-400 animate-pulse" />
                  {badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* Animated Shimmering Iridescent H1 Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.05 },
              y: { duration: 0.5, delay: 0.05 },
              backgroundPosition: { repeat: Infinity, duration: 12, ease: 'linear' },
            }}
            style={{ backgroundSize: '250% 250%' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] mb-4 text-white font-serif drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            {title}
          </motion.h1>

          {/* Subtitle with High Legibility */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-100/90 leading-relaxed max-w-2xl mb-7 font-normal drop-shadow-sm line-clamp-3"
            >
              {subtitle}
            </motion.p>
          )}

          {/* ================= 7. FLOATING PRISMATIC GLASSMORPHIC BREADCRUMB PILL ================= */}
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="Breadcrumb"
            className="inline-flex flex-wrap items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/75 backdrop-blur-2xl border border-white/20 text-xs sm:text-sm text-slate-200 shadow-2xl shadow-black/50 select-none hover:border-amber-400/50 transition-colors"
          >
            {/* Home Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-bold group"
              title="Return to homepage"
            >
              <Home size={14} className="text-amber-400 group-hover:scale-115 transition-transform" />
              <span>Home</span>
            </Link>

            {/* Crumb Items */}
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <span key={i} className="inline-flex items-center gap-2">
                  <ChevronRight size={13} className="text-amber-400/90 shrink-0" />
                  {item.href && !isLast ? (
                    <Link
                      to={item.href}
                      className="text-slate-200 hover:text-cyan-300 transition-colors font-semibold truncate max-w-[150px] sm:max-w-none"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className="text-amber-400 font-extrabold truncate max-w-[180px] sm:max-w-xs md:max-w-md"
                      title={item.label}
                    >
                      {item.label}
                    </span>
                  )}
                </span>
              );
            })}
          </motion.nav>
        </div>
      </div>

      {/* ================= 8. BOTTOM ANIMATED RAINBOW LIGHT BEAM ================= */}
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        style={{ backgroundSize: '300% 100%' }}
        className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-accent-red via-accent-gold via-emerald-400 via-cyan-400 via-accent-pink to-accent-red opacity-90 shadow-[0_0_20px_rgba(225,29,72,0.8)]"
        aria-hidden="true"
      />
    </section>
  );
}
