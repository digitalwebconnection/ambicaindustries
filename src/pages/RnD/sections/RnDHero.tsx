import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import imgRndReactive from '@/assets/images/rnd/rnd-hero-reactive.webp';
import imgRndLeather from '@/assets/images/rnd/rnd-hero-leather.webp';
import imgRndMetalComplex from '@/assets/images/rnd/rnd-hero-metal-complex.webp';

const images = [
  {
    src: imgRndReactive,
    alt: "Reactive dye textile sample from Ambica Industry",
    label: "Reactive Dyes",
    border: "border border-accent-red",
    size: "w-44 h-44 sm:w-56 sm:h-56 lg:w-70 lg:h-70",
    position: "top-2 left-2 sm:top-5 sm:left-5 lg:top-7 lg:left-7",
    z: "z-30",
  },
  {
    src: imgRndLeather,
    alt: "Leather and ink application sample from Ambica Industry",
    label: "Leather Dyes",
    border: "border border-accent-red",
    size: "w-38 h-38 sm:w-48 sm:h-48 lg:w-60 lg:h-60",
    position: "top-6 right-2 sm:top-10 sm:right-6 lg:top-15 lg:left-65 lg:right-auto",
    z: "z-20",
  },
  {
    src: imgRndMetalComplex,
    alt: "Metal complex dye sample from Ambica Industry",
    label: "Metal Complex",
    border: "border border-accent-red",
    size: "w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50",
    position: "bottom-2 right-8 sm:bottom-4 sm:right-14 lg:bottom-auto lg:top-60 lg:left-60 lg:right-auto",
    z: "z-10",
  },
];

export default function HeroSection() {
  const handleOpenQuote = () => {
    window.dispatchEvent(new Event("openQuoteModal"));
  };

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* Left Content (Bottom on mobile order-2, Left on desktop lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-primary-dark tracking-tight leading-[1.1] mb-4 sm:mb-6 relative">
              Engineering Better Colors{" "}
              <span className="text-accent-red relative inline-block mt-1">
                Through Chemistry
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/90 rounded-full transform rotate-[-1.3deg]" />
              </span>
            </h1>

            <p className="text-base sm:text-lg max-w-2xl text-slate-600 leading-relaxed mt-4 sm:mt-7 mb-6 sm:mb-10 font-normal sm:font-medium">
              At Ambica Industry, R&D drives every formulation. We combine chemical
              expertise and rigorous testing to develop reliable, high-performance dye
              solutions for textile, leather, wood, and specialized applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
              <button
                onClick={handleOpenQuote}
                type="button"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-3 sm:py-2.5 rounded-full bg-accent-red hover:bg-accent-red-dark text-white text-base font-bold shadow-md hover:shadow-lg hover:shadow-accent-red/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <Link
                to="/r&d"
                className="w-full sm:w-auto group inline-flex text-accent-red items-center justify-center gap-3 px-8 py-3 sm:py-2.5 rounded-full border-2 border-accent-red/70 bg-white hover:bg-accent-red/5 hover:text-accent-red text-base font-bold shadow-md shadow-accent-red/20 hover:shadow-lg hover:shadow-accent-red/35 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Our R&D</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Right Images (Top on mobile order-1, Right on desktop lg:order-2) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 w-full max-w-85 sm:max-w-105 lg:max-w-none mx-auto lg:mx-0 h-76 sm:h-96 lg:h-130"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.18 }}
                className={`absolute rounded-full overflow-hidden group transition-all shadow-2xl hover:z-40 ${img.size} ${img.position} ${img.z}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full group-hover:scale-115 transition-all duration-700 object-cover"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-xs sm:text-sm font-bold text-center px-3 transition-opacity duration-300">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
