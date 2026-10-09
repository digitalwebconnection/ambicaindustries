import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReveal } from '@/hooks/useReveal';
import { BorderBeam } from '@/components/ui/BorderBeam';

import imgStep1 from "/about-us.webp";
import imgStep2 from '@/assets/images/hero/dyeing-fabrics-colorful-vats.webp';
import imgStep3 from '@/assets/images/hero/rows-colorful-dye-vats-industrial-factory.webp';
import imgStep4 from '@/assets/images/hero/dyeing-textiles-factory-colorful-process.webp';
import imgStep5 from '@/assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.webp';
import imgStep6 from '@/assets/images/hero/colorful-yarn-bins-textile-factory.webp';

export interface TimelineStep {
  step: string;
  year: string;
  title: string;
  description: string;
  image: string;
}

const timelineSteps: TimelineStep[] = [
  {
    step: "01",
    year: "1986",
    title: "Foundation & Vision",
    description:
      "Our father founded Ambica Industry in 1986 with a commitment to providing dependable, vibrant, and pure dye solutions for the textile sector.",
    image: imgStep1,
  },
  {
    step: "02",
    year: "1995",
    title: "Acid & Direct Dyes",
    description:
      "Pioneered customized synthesis units and in-house testing labs to scale production of high-purity Acid and Direct Dyes across national markets.",
    image: imgStep2,
  },
  {
    step: "03",
    year: "2004",
    title: "Reactive & Leather Dyes",
    description:
      "Expanded industrial manufacturing facilities to produce high-fixation Reactive Dyes and specialized formulations for the leather tanning industry.",
    image: imgStep3,
  },
  {
    step: "04",
    year: "2012",
    title: "2nd Generation Modernization",
    description:
      "The second generation stepped in, introducing metal complex dyes, pigment powders, and computerized spectrophotometer shade-matching technology.",
    image: imgStep4,
  },
  {
    step: "05",
    year: "2019",
    title: "Global Export Reach",
    description:
      "Expanded international export footprints across Asia, Europe, and the Americas, supplying bulk colorants for paper, wood, and industrial coatings.",
    image: imgStep5,
  },
  {
    step: "06",
    year: "Today",
    title: "Sustainable Innovation",
    description:
      "Continuing our 38+ year legacy with eco-friendly chemical compliance, zero-discharge manufacturing, and tailor-made color solutions worldwide.",
    image: imgStep6,
  },
];

// ─── Desktop Card with Auto-Hover on Scroll Reach ────────────────────────────
function ProcessCardItem({
  step,
  position,
}: {
  step: TimelineStep;
  position: { top: string; left: string };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAutoHover, setIsAutoHover] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAutoHover(entry.isIntersecting);
      },
      {
        root: null,
        // Card auto-hovers when it reaches the comfortable viewing zone
        rootMargin: "-15% 0px -20% 0px",
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isActive = isMouseHover || isAutoHover;

  return (
    <motion.div
      ref={cardRef}
      className={`absolute w-90 p-8 bg-white/95 backdrop-blur-xl border rounded-3xl shadow-xl z-10 group overflow-hidden transition-all duration-500 ${isActive
          ? "border-accent-red/60 shadow-[0_20px_50px_rgba(211,2,2,0.18)] scale-[1.02]"
          : "border-slate-200/80 hover:shadow-2xl"
        }`}
      style={{
        top: position.top,
        left: position.left,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      onMouseEnter={() => setIsMouseHover(true)}
      onMouseLeave={() => setIsMouseHover(false)}
    >
      {/* Magic UI Border Beam on Active / Scroll Hover */}
      {isActive && (
        <BorderBeam
          size={160}
          duration={5}
          colorFrom="#D30202"
          colorTo="#06408c"
          borderWidth={2}
        />
      )}

      {/* Image Reveal on Hover & Auto-Hover */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
      >
        <img
          src={step.image}
          alt={step.title}
          className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? "scale-100" : "scale-105 group-hover:scale-100"
            }`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/30" />
      </div>

      {/* Card Content */}
      <div
        className={`relative z-10 flex flex-col h-full transition-colors duration-500 ${isActive ? "text-white" : "group-hover:text-white"
          }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`text-5xl font-black tracking-tighter transition-colors ${isActive
                ? "text-white/80"
                : "text-primary/20 group-hover:text-white/80"
              }`}
          >
            {step.step}
          </div>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${isActive
                ? "bg-accent-red text-white"
                : "bg-primary/10 text-primary group-hover:bg-accent-red group-hover:text-white"
              }`}
          >
            {step.year}
          </span>
        </div>

        <h3
          className={`text-2xl font-extrabold mb-3 transition-colors ${isActive ? "text-white" : "text-primary-dark group-hover:text-white"
            }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-sm leading-relaxed transition-colors ${isActive ? "text-slate-200" : "text-slate-600 group-hover:text-slate-200"
            }`}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Mobile Card with Auto-Hover on Scroll Reach ─────────────────────────────
function MobileProcessCardItem({
  step,
}: {
  step: TimelineStep;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAutoHover, setIsAutoHover] = useState(false);
  const [isMouseHover, setIsMouseHover] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAutoHover(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-15% 0px -20% 0px",
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isActive = isMouseHover || isAutoHover;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col p-7 bg-white border rounded-3xl shadow-lg overflow-hidden group transition-all duration-500 ${isActive
          ? "border-accent-red/60 shadow-[0_15px_40px_rgba(211,2,2,0.16)]"
          : "border-slate-200"
        }`}
      onMouseEnter={() => setIsMouseHover(true)}
      onMouseLeave={() => setIsMouseHover(false)}
    >
      {/* Magic UI Border Beam on Active / Scroll Reach */}
      {isActive && (
        <BorderBeam
          size={140}
          duration={5}
          colorFrom="#D30202"
          colorTo="#06408c"
          borderWidth={2}
        />
      )}

      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
      >
        <img
          src={step.image}
          alt={step.title}
          className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? "scale-100" : "scale-105 group-hover:scale-100"
            }`}
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`text-4xl font-black tracking-tighter transition-colors ${isActive
                ? "text-white/80"
                : "text-primary/20 group-hover:text-white/80"
              }`}
          >
            {step.step}
          </div>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors ${isActive
                ? "bg-accent-red text-white"
                : "bg-primary/10 text-primary group-hover:bg-accent-red group-hover:text-white"
              }`}
          >
            {step.year}
          </span>
        </div>

        <h3
          className={`text-xl font-extrabold mb-2 transition-colors ${isActive ? "text-white" : "text-primary-dark group-hover:text-white"
            }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-sm leading-relaxed transition-colors ${isActive ? "text-slate-200" : "text-slate-600 group-hover:text-slate-200"
            }`}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const { ref: headerRef, visible } = useReveal(0.15);

  // Card positions aligned with the clean S-curve path
  const cardPositions = [
    { top: "2%", left: "46%" },  // 01 - center-right
    { top: "18%", left: "5%" },  // 02 - left
    { top: "41%", left: "18%" }, // 03 - center-left
    { top: "53%", left: "75%" }, // 04 - right
    { top: "71%", left: "39%" }, // 05 - center-right
    { top: "87%", left: "2%" },  // 06 - left
  ];

  return (
    <section id="our-story" className="bg-slate-50 relative overflow-hidden py-16 lg:py-24">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-6 relative z-10 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-linear-to-r from-transparent to-accent-red rounded-full" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent-red">
              Our Journey & Heritage
            </span>
            <span className="w-10 h-0.5 bg-linear-to-l from-transparent to-accent-red rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-dark tracking-tight leading-[1.2]">
            Over 38 Years of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-red">
              Excellence in Color
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800  max-w-6xl font-normal leading-relaxed">
            Scroll down to explore the milestones and innovation that shaped Ambica Industry from a family-founded business in 1986 into an international dye manufacturer.
          </p>
        </div>
      </div>

      {/* Interactive Path Section (Desktop) */}
      <div
        ref={ref}
        className="relative w-full mx-auto max-w-275 h-350 my-8 hidden lg:block"
      >
        {/* The Animated SVG Stroke */}
        <LinePath
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          scrollYProgress={scrollYProgress}
        />

        {/* The Cards absolutely positioned along the stroke */}
        {timelineSteps.map((step, i) => (
          <ProcessCardItem
            key={i}
            step={step}
            position={cardPositions[i]}
          />
        ))}
      </div>

      {/* Mobile / Tablet View (Fallback standard responsive stack) */}
      <div className="lg:hidden flex flex-col gap-6 px-4 mt-8 max-w-xl mx-auto">
        {timelineSteps.map((step, i) => (
          <MobileProcessCardItem key={i} step={step} />
        ))}
      </div>
    </section>
  );
}

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Clean S-curve zigzag across 1100 x 1400 viewBox
  const d = [
    "M 550 40",
    "C 900 40, 1050 130, 1050 230",   // curve to right
    "C 1050 330, 900 380, 700 380",   // ease across right
    "C 500 380, 150 430, 50 560",     // sweep to left
    "C -50 690, 100 740, 300 740",    // ease across left
    "C 500 740, 950 790, 1050 920",   // sweep to right
    "C 1150 1050, 950 1100, 750 1100",
    "C 550 1100, 100 1130, 50 1260",
    "C 0 1380, 200 1400, 400 1400",
  ].join(" ");

  return (
    <svg
      viewBox="0 0 1100 1400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06408c" />
          <stop offset="50%" stopColor="#D30202" />
          <stop offset="100%" stopColor="#d9179c" />
        </linearGradient>
      </defs>

      {/* Ghost trail */}
      <path d={d} stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />

      {/* Animated gradient stroke */}
      <motion.path
        d={d}
        stroke="url(#timelineGradient)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength }}
      />
    </svg>
  );
};
