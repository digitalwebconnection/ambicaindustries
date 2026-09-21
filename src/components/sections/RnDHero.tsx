import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1642961249174-d0a2232f2661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    alt: "Reactive dye textile sample from Ambica Industry",
    label: "Reactive Dyes",
    border: "border border-accent-red",
    size: "w-70 h-70",
    position: "top-7 left-7",
    z: "z-30",
  },
  {
    src: "https://images.unsplash.com/photo-1781947486948-4a581a6b3df0?w=500&auto=format&fit=crop&q=60",
    alt: "Leather and ink application sample from Ambica Industry",
    label: "Leather Dyes",
    border: "border border-accent-red",
    size: "w-60 h-60",
    position: "top-15 left-65",
    z: "z-20",
  },
  {
    src: "https://images.unsplash.com/photo-1658892031910-1cdddba7805b?w=600&auto=format&fit=crop&q=60",
    alt: "Metal complex dye sample from Ambica Industry",
    label: "Metal Complex",
    border: "border border-accent-red",
    size: "w-50 h-50",
    position: "top-60 left-60",
    z: "z-10",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-dark tracking-tight leading-[1.1] mb-6 relative">
              Engineering Better Colors
              <span className="text-accent-red relative inline-block mt-1">
                Through Chemistry
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/90 rounded-full transform -rotate-[1.3deg]" />
              </span>
            </h1>

            <p className="text-lg max-w-2xl text-slate-600 leading-relaxed mt-7 mb-10 font-medium">
              At Ambica Industry, R&D drives every formulation. We combine chemical
              expertise and rigorous testing to develop reliable, high-performance dye
              solutions for textile, leather, wood, and specialized applications.
            </p>

            <div className="flex gap-5">
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-3 px-8 py-2.5 rounded-full bg-accent-red hover:bg-accent-red-dark text-white text-base font-bold shadow-md hover:shadow-lg hover:shadow-accent-red/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <span>Talk to an expert</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                type="button"
                className="group inline-flex text-accent-red items-center justify-center gap-3 px-8 py-2.5 rounded-full border-2 border-accent-red/70 bg-white hover:bg-accent-red/5 hover:text-accent-red text-base font-bold shadow-md shadow-accent-red/20 hover:shadow-lg hover:shadow-accent-red/35 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Our R&D</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative h-130"
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
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-bold text-center px-3 transition-opacity duration-300">
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