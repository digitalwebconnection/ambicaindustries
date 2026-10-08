import { motion, type Variants } from "framer-motion";
import { Shield, Lightbulb, Leaf, Users, ArrowRight } from "lucide-react";

// Import existing hero images for the cards
import imgQuality from "../../assets/images/hero/rows-colorful-dye-vats-industrial-factory.webp";
import imgInnovation from "../../assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.webp";
import imgSustainability from "../../assets/images/hero/vibrant-silk-textiles-colorful-heap-generated-by-ai.webp";
import imgCustomer from "../../assets/images/hero/close-up-row-paint-cans-with-different-colors.webp";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    icon: Shield,
    title: "Quality & Consistency",
    description:
      "We have powerful plant that efficient to Craft Every batch of dye with precision to ensure consistent performance across all fabrics.",
    image: imgQuality,
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We invest in research and development to bring new Formula which are highly cost-effective, eco-friendly, and high-performance dye solutions to market.",
    image: imgInnovation,
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Our dyes are designed to minimize environmental impact, supporting sustainable manufacturing practices.",
    image: imgSustainability,
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We serve all type of customer from small order to big bulk order and From small-scale designers to large textile manufacturers, we provide tailored dye solutions.",
    image: imgCustomer,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-8 sm:py-12 md:py-14 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-72 h-72 md:w-200 md:h-200 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 58, 124, 0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-[-10%] w-72 h-72 md:w-150 md:h-150 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(211, 2, 2, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12"
        >
          <div className="max-w-2xl relative">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6"
            >
              <span className="h-0.5 w-8 sm:w-10 bg-primary-dark rounded-full" />
              <span className="text-primary-dark font-bold text-xs sm:text-sm uppercase tracking-widest">
                Why Choose Us
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-dark leading-[1.15] md:leading-[1.1] mb-2"
            >
              Our <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-red to-accent-red-dark">
                Commitment
              </span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="w-full sm:w-auto max-w-md md:text-right pb-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 sm:py-2.5 bg-primary-dark font-semibold text-white text-[15px] rounded-full hover:bg-accent-red hover:text-white active:scale-95 transition-all group shadow-xl shadow-[#003A7C]/20 hover:shadow-accent-red/30"
            >
              Partner With Us
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Clean Corporate Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {features.map((feature, i) => {
            // ---------------------------------------------------------
            // Card 1: Wide Card (Top Left)
            // ---------------------------------------------------------
            if (i === 0) {
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="md:col-span-2 bg-white rounded-xl overflow-hidden flex flex-col-reverse md:flex-row shadow-sm border border-slate-200 group hover:shadow-xl hover:border-primary-dark/20 transition-all duration-500"
                >
                  <div className="p-5 sm:p-7 md:p-10 flex-1 flex flex-col justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-dark/5 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-colors duration-500">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-primary-dark mb-2.5 sm:mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 h-48 sm:h-56 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              );
            }

            // ---------------------------------------------------------
            // Card 2: Tall Card (Right)
            // ---------------------------------------------------------
            if (i === 1) {
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="md:col-span-1 md:row-span-2 bg-white rounded-xl overflow-hidden flex flex-col shadow-sm border border-slate-200 group hover:shadow-xl hover:border-primary-dark/20 transition-all duration-500"
                >
                  <div className="w-full h-48 sm:h-56 md:h-[45%] relative overflow-hidden shrink-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 sm:p-7 md:p-10 flex-1 flex flex-col justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-red/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-accent-red group-hover:bg-accent-red group-hover:text-white transition-colors duration-500">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-primary-dark mb-2.5 sm:mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            }

            // ---------------------------------------------------------
            // Cards 3 & 4: Square Cards (Bottom Left & Center)
            // ---------------------------------------------------------
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="md:col-span-1 bg-white rounded-xl overflow-hidden flex flex-col shadow-sm border border-slate-200 group hover:shadow-xl hover:border-primary-dark/20 transition-all duration-500"
              >
                <div className="w-full h-44 sm:h-48 md:h-50 relative overflow-hidden shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-dark/5 rounded-lg flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-colors duration-500 shrink-0">
                      <feature.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-primary-dark">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
