import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  Microscope,
  CircleDollarSign,
  Target,
  Leaf,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import ctaBackground from "../../assets/images/hero/dyeing-fabrics-colorful-vats.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const features = [
  {
    icon: <Microscope className="w-7 h-7" />,
    title: "Uncompromising Quality",
    description:
      "Quality is achieved only by conducting rigorous research, a standard our company always strives for.",
    color: "bg-gradient-to-br from-primary to-primary-dark",
    glow: "shadow-[0_0_20px_rgba(0,58,124,0.4)]",
    lineColor: "from-primary to-primary-dark shadow-[0_0_15px_rgba(0,58,124,0.5)]",
    iconColor: "text-primary-dark",
  },
  {
    icon: <CircleDollarSign className="w-7 h-7" />,
    title: "Cost Reduction",
    description:
      "Optimizing the manufacturing process allows us to sell products at a highly competitive market price.",
    color: "bg-gradient-to-br from-red-500 to-accent-red",
    glow: "shadow-[0_0_20px_rgba(211,2,2,0.4)]",
    lineColor:
      "from-red-500 to-accent-red shadow-[0_0_15px_rgba(211,2,2,0.5)]",
    iconColor: "text-accent-red",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Client Satisfaction",
    description:
      "Every new product line is meticulously designed to satisfy and exceed our client requirements.",
    color: "bg-gradient-to-br from-primary to-primary-dark",
    glow: "shadow-[0_0_20px_rgba(0,58,124,0.4)]",
    lineColor:
      "from-primary to-primary-dark shadow-[0_0_15px_rgba(0,58,124,0.5)]",
    iconColor: "text-primary-dark",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Eco-Friendly Production",
    description:
      "It is crucial to ensure we are producing sustainable products which do not harm our environment.",
    color: "bg-gradient-to-br from-accent-red to-accent-red-dark",
    glow: "shadow-[0_0_20px_rgba(176,1,1,0.4)]",
    lineColor:
      "from-accent-red to-accent-red-dark shadow-[0_0_15px_rgba(176,1,1,0.5)]",
    iconColor: "text-accent-red",
  },
];

export default function RnDSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-cycle with ref-based timer management
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Layout positions for the 4 interactive chemical nodes
  const nodePositions = [
    "top-2 left-1/2 -translate-x-1/2", // 0: Top
    "top-1/2 right-2 -translate-y-1/2", // 1: Right
    "bottom-2 left-1/2 -translate-x-1/2", // 2: Bottom
    "top-1/2 left-2 -translate-y-1/2", // 3: Left
  ];

  // Connecting line styles extending from center to each node
  const linePositions = [
    "bottom-1/2 left-1/2 w-[2px] h-[190px] -translate-x-1/2 origin-bottom", // 0: Up
    "left-1/2 top-1/2 h-[2px] w-[190px] -translate-y-1/2 origin-left", // 1: Right
    "top-1/2 left-1/2 w-[2px] h-[190px] -translate-x-1/2 origin-top", // 2: Down
    "right-1/2 top-1/2 h-[2px] w-[190px] -translate-y-1/2 origin-right", // 3: Left
  ];

  return (
    <section className="pt-8 md:pt-14 bg-slate-50 relative overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 23, 156, 0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(253, 195, 1, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-20 items-center">
          {/* Left Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.08 }}
            className="lg:w-[45%]"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-4 mb-6"
            >
              <span className="h-[2px] w-10 bg-primary rounded-full" />
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                Innovation Hub
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-primary-dark leading-[1.1] mb-6"
            >
              Research & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
                Development
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-slate-600 text-lg leading-relaxed mb-10"
            >
              Research and development are conducted in our industry to achieve
              success at various levels. We continually push the boundaries of
              chemical engineering to pioneer advanced, sustainable dye
              solutions that shape the future.
            </motion.p>

            {/* Accent Elements */}
            <motion.div
              variants={fadeUp}
              className="flex gap-8 border-t border-slate-200 pt-8"
            >
              <div className="group cursor-default">
                <div className="text-3xl font-black text-primary-dark mb-1 group-hover:text-primary transition-colors">
                  100%
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-gold" /> In-House R&D
                </div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-pink mb-1">
                  Eco
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500" /> Friendly Focus
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Interactive Chemical Structure (Desktop) */}
          <div className="lg:w-[55%] hidden lg:flex items-center justify-center">
            <div
              className="relative w-[500px] h-[500px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Connecting Lines */}
              {features.map((feature, idx) => (
                <div
                  key={`line-${idx}`}
                  className={`absolute transition-all duration-500 ease-out z-0 ${linePositions[idx]} ${
                    activeIdx === idx
                      ? `bg-gradient-to-br ${feature.lineColor} scale-y-100 opacity-100`
                      : "bg-slate-300 scale-y-50 opacity-100"
                  }`}
                />
              ))}

              {/* Center Display Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border-4 border-slate-50 z-20 flex flex-col items-center justify-center p-8 transition-shadow duration-500 hover:shadow-[0_20px_50px_-10px_rgba(6,64,140,0.2)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`mb-4 p-3 rounded-xl ${features[activeIdx].color} text-white shadow-lg transform -rotate-6`}
                    >
                      {features[activeIdx].icon}
                    </div>
                    <h3 className="text-lg font-extrabold text-primary-dark mb-2 leading-tight">
                      {features[activeIdx].title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      {features[activeIdx].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 4 Interactive Satellite Nodes (Diamonds) */}
              {features.map((feature, idx) => (
                <div
                  key={`node-${idx}`}
                  className={`absolute w-24 h-24 flex items-center justify-center cursor-pointer transition-all duration-500 ${nodePositions[idx]} ${
                    activeIdx === idx
                      ? "scale-125 z-30"
                      : "hover:scale-110 z-10"
                  }`}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  {/* Rotated Diamond Background */}
                  <div
                    className={`absolute inset-0 rounded-2xl rotate-45 transition-all duration-500 ${
                      activeIdx === idx
                        ? `${feature.color} ${feature.glow}`
                        : "bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-slate-200"
                    }`}
                  />

                  {/* Un-rotated Icon */}
                  <div
                    className={`relative z-10 transition-colors duration-500 ${
                      activeIdx === idx ? "text-white" : feature.iconColor
                    }`}
                  >
                    {feature.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Fallback Grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col items-start"
              >
                <div
                  className={`mb-4 p-3 rounded-xl ${feature.color} text-white shadow-md`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-extrabold text-primary-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section (Full Width) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-20 md:mt-32 w-full relative overflow-hidden shadow-2xl bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${ctaBackground})`,
        }}
      >
        {/* Dark Blue Overlay for text readability */}
        <div className="absolute inset-0 bg-primary-dark/50 z-0" />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
              Ready to elevate your manufacturing?
            </h3>
            <p className="text-white/80 text-lg">
              Partner with Ambica Industry for premium, rigorously tested dye
              solutions tailored to your exact requirements.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/#quote"
              className="group inline-flex items-center gap-3 px-8 py-2.5 bg-white text-primary-dark rounded-full font-bold text-[15px] hover:bg-accent-red hover:text-white transition-all duration-300 shadow-xl hover:shadow-accent-red/30 hover:-translate-y-1"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
