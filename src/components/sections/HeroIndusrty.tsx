import { motion } from "framer-motion";
import hero1 from "../../assets/images/industries/indushero1.jpg";
import hero2 from "../../assets/images/industries/indushero2.jpg";
import { ArrowRight } from "lucide-react";

export default function HeroIndustry() {


  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }} className="">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-dark tracking-tight leading-[1.1] mb-6 relative">
              Industries We
              <span className="text-accent-red relative inline-block mt-1">
                Serve
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/90 rounded-full transform -rotate-2" />
              </span>

            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">
              From organic cotton and paper pulp to automotive textiles, leather goods, and specialized inks — Ambica Industry formulates dye solutions across a diverse range of application sectors worldwide.
            </p>

            <button type="button" className="group inline-flex items-center justify-center gap-3 px-8 py-2.5 rounded-full bg-primary hover:bg-primary-dark cursor-pointer text-white text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span>Talk to an expert</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          <div

            className="relative h-130">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }} className="absolute left-7 top-20 w-[50%] -rotate-5 overflow-hidden"
              style={{ clipPath: "polygon(0 8%, 92% 0, 100% 88%, 82% 100%, 5% 92%)", }}
            >
              <img src={hero1} alt="Dyed cotton and textile sample from Ambica Industry"
                className="w-full h-full object-cover"
                width={600}
                height={700}
                loading="eager" decoding="async" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }} className="absolute right-5 bottom-7 w-[57%] rotate-5 overflow-hidden"
              style={{ clipPath: "polygon(8% 0, 100% 10%, 92% 94%, 70% 100%, 0 82%)", }}>

              <img src={hero2} rel="preload" alt="Leather and ink application sample from Ambica Industry"
                className="w-full h-full object-cover" width={600}
                height={700}
                fetchPriority="high" decoding="async" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}