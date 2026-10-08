import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import whyUs1 from "../../../assets/images/products/different-bright-dry-colors-containers.jpg";
import whyUs2 from "../../../assets/images/industries/stained-brush-with-paint.jpg";

export default function HeroWhyUs() {
  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* Left Content (Bottom on mobile order-2, Left on desktop lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-dark tracking-tight leading-[1.15] sm:leading-15 mb-4 sm:mb-6 relative">
              Color Chemistry Built Around{" "}
              <span className="text-accent-red relative inline-block mt-1">
                Your Business.
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/90 rounded-full transform rotate-[-1.5deg]" />
              </span>
            </h1>
            <p className="text-sm sm:text-base tracking-wide mt-2 sm:mt-4 text-slate-600 leading-relaxed mb-3 sm:mb-4 font-normal sm:font-medium">
              Choosing the right dye supplier is about more than finding the right shade.
              It is about getting dependable products, responsive service, consistent
              quality, and a partner who understands your production requirements.
            </p>
            <p className="text-sm sm:text-base tracking-wide mt-1 sm:mt-2 text-slate-600 leading-relaxed mb-6 sm:mb-10 font-normal sm:font-medium">
              At Ambica Industry, we bring together manufacturing knowledge, product
              expertise, and customer-focused service to help industries achieve
              reliable coloration at every stage.
            </p>

            <Link
              to="/contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-3 sm:py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white cursor-pointer text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <span>Talk to an expert</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Right Images (Top on mobile order-1, Right on desktop lg:order-2) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 w-full max-w-85 sm:max-w-105 lg:max-w-none mx-auto lg:mx-0 h-76 sm:h-96 lg:h-130"
          >
            {/* Top-Right Image Card */}
            <div className="absolute top-0 right-2 sm:right-4 lg:right-0 w-56 h-48 sm:w-72 sm:h-64 lg:w-90 lg:h-80 rounded-2xl overflow-hidden shadow-lg border-2 sm:border-4 border-white group">
              <img
                src={whyUs1}
                alt="Dye production quality check at Ambica Industry"
                className="group-hover:scale-108 group-hover:-rotate-5 duration-500 transition-all w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Bottom-Left Overlapping Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute bottom-0 left-2 sm:left-4 lg:left-0 w-52 h-44 sm:w-64 sm:h-56 lg:w-80 lg:h-72 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border-2 sm:border-4 border-white group duration-500 transition-transform z-10"
            >
              <img
                src={whyUs2}
                alt="Technical team formulating dye solutions at Ambica Industry"
                className="w-full h-full group-hover:rotate-3 group-hover:scale-107 duration-500 object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-2.5 sm:p-3.5 lg:p-4 flex items-center gap-2.5 sm:gap-3 border border-slate-100 z-20"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent-red/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent-red" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-primary-dark">25+ Years</p>
                <p className="text-[10px] sm:text-xs text-slate-500">Trusted Formulation</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
