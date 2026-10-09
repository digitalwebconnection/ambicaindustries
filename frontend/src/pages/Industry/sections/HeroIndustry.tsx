import { motion } from "framer-motion";
import hero1 from '@/assets/images/industries/indushero1.webp';
import hero2 from '@/assets/images/industries/indushero2.webp';
import { ArrowRight } from "lucide-react";

export default function HeroIndustry() {


  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* Left Content (Bottom on mobile order-2, Left on desktop lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-primary-dark tracking-tight leading-[1.1] mb-4 sm:mb-6 relative">
              Industries We{" "}
              <span className="text-accent-red relative inline-block mt-1">
                Serve
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/90 rounded-full transform -rotate-2" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-10 font-normal sm:font-medium">
              From organic cotton and paper pulp to automotive textiles, leather goods, and specialized inks — Ambica Industry formulates dye solutions across a diverse range of application sectors worldwide.
            </p>

            <a
              href="/contact"
              type="button"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-3 sm:py-2.5 rounded-full bg-primary hover:bg-primary-dark cursor-pointer text-white text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <span>Talk to an expert</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Right Images (Top on mobile order-1, Right on desktop lg:order-2) */}
          <div className="relative order-1 lg:order-2 w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 h-72 sm:h-96 md:h-110 lg:h-130">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="absolute left-2 sm:left-4 lg:left-7 top-4 sm:top-10 lg:top-20 w-[52%] sm:w-[50%] -rotate-5 overflow-hidden shadow-lg"
              style={{ clipPath: "polygon(0 8%, 92% 0, 100% 88%, 82% 100%, 5% 92%)" }}
            >
              <img
                src={hero1}
                alt="Dyed cotton and textile sample from Ambica Industry"
                className="w-full h-full object-cover"
                width={600}
                height={700}
                loading="eager"
                decoding="async"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="absolute right-2 sm:right-4 lg:right-5 bottom-2 sm:bottom-4 lg:bottom-7 w-[58%] sm:w-[57%] rotate-5 overflow-hidden shadow-xl"
              style={{ clipPath: "polygon(8% 0, 100% 10%, 92% 94%, 70% 100%, 0 82%)" }}
            >
              <img
                src={hero2}
                rel="preload"
                alt="Leather and ink application sample from Ambica Industry"
                className="w-full h-full object-cover"
                width={600}
                height={700}
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
