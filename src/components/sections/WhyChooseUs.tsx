import { motion, type Variants } from "framer-motion";
import { Shield, Lightbulb, Leaf, Users, ArrowRight } from "lucide-react";

// Import existing hero images for the cards
import imgQuality from "../../assets/images/hero/rows-colorful-dye-vats-industrial-factory.jpg";
import imgInnovation from "../../assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.jpg";
import imgSustainability from "../../assets/images/hero/vibrant-silk-textiles-colorful-heap-generated-by-ai.jpg";
import imgCustomer from "../../assets/images/hero/close-up-row-paint-cans-with-different-colors.jpg";

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
    <section className="py-8 md:py-14 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 58, 124, 0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12"
        >
          <div className="max-w-2xl relative">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-4 mb-6"
            >
              <span className="h-[2px] w-10 bg-[#003A7C] rounded-full" />
              <span className="text-[#003A7C] font-bold text-sm uppercase tracking-widest">
                Why Choose Us
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003A7C] leading-[1.1] mb-2"
            >
              Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
                Commitment
              </span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="max-w-md md:text-right pb-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#003A7C] font-semibold text-white text-[15px] font-bold rounded-full hover:bg-accent-red hover:text-white transition-colors group shadow-xl shadow-[#003A7C]/20 hover:shadow-accent-red/30"
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                  className="md:col-span-2 bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-slate-200 group hover:shadow-xl hover:border-[#003A7C]/20 transition-all duration-500"
                >
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                    <div className="w-12 h-12 bg-[#003A7C]/5 rounded-xl flex items-center justify-center mb-6 text-[#003A7C] group-hover:bg-[#003A7C] group-hover:text-white transition-colors duration-500">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#003A7C] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 h-[250px] md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
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
                  className="md:col-span-1 md:row-span-2 bg-white rounded-xl overflow-hidden flex flex-col shadow-sm border border-slate-200 group hover:shadow-xl hover:border-[#003A7C]/20 transition-all duration-500"
                >
                  <div className="w-full h-[250px] md:h-[45%] relative overflow-hidden shrink-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                    <div className="w-12 h-12 bg-accent-red/10 rounded-xl flex items-center justify-center mb-6 text-accent-red group-hover:bg-accent-red group-hover:text-white transition-colors duration-500">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#003A7C] mb-4">
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
                className="md:col-span-1 bg-white rounded-xl overflow-hidden flex flex-col shadow-sm border border-slate-200 group hover:shadow-xl hover:border-[#003A7C]/20 transition-all duration-500"
              >
                <div className="w-full h-[200px] relative overflow-hidden shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#003A7C]/5 rounded-lg flex items-center justify-center text-[#003A7C] group-hover:bg-[#003A7C] group-hover:text-white transition-colors duration-500">
                      <feature.icon size={20} />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#003A7C]">
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
