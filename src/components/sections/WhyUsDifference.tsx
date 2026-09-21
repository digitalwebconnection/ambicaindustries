import { motion } from "framer-motion";
import { Award, ShieldCheck, Gauge, Users, Headset, Handshake } from "lucide-react";

export default function WhyUsDifference() {
  const points = [
    {
      title: "Built on Industry Experience",
      description:
        "Our experience in the dye industry gives us a practical understanding of color requirements, production challenges, and application needs across different industries.",
      icon: Award,
      img: "",
    },
    {
      title: "Quality at Every Stage",
      description:
        "Quality is considered throughout our process — from raw materials and formulation to manufacturing, testing, packaging, and final dispatch.",
      icon: ShieldCheck,
      img: "https://images.unsplash.com/photo-1589061935832-c4de192a2e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxkeWUlMjBxdWFsaXR5fGVufDB8fDB8fHww",
    },
    {
      title: "Reliable Product Performance",
      description:
        "Our products are developed with industrial applications in mind, helping customers maintain dependable color results during regular production.",
      icon: Gauge,
      img: "https://plus.unsplash.com/premium_photo-1726826693849-208029303ce0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
    },
    {
      title: "Understanding Your Requirements",
      description:
        "Every customer and application is different. We take time to understand your material, process, desired shade, and technical requirements before recommending a suitable solution.",
      icon: Users,
      img: "",
    },
    {
      title: "Responsive Customer Service",
      description:
        "Our team remains accessible throughout the customer journey, helping with product information, technical requirements, samples, and order coordination.",
      icon: Headset,
      img: "",
    },
    {
      title: "Long-Term Business Relationships",
      description:
        "We focus on building lasting relationships rather than one-time transactions. Consistent products and dependable service form the foundation of our customer partnerships.",
      icon: Handshake,
      img: "https://images.unsplash.com/photo-1677126788485-b1748717c430?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjIyfHxkeWUlMjBxdWFsaXR5fGVufDB8fDB8fHww",
    },
  ];

  return (
    <section className="py-14 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-12"
        >
          <div className="text-sm font-semibold uppercase flex items-center tracking-wider text-accent-red">
            <span className="w-12 mr-2 h-[2px] bg-accent-red " />
            What Makes Us Different
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-primary-dark leading-13">
            A Better Approach to <span className="text-accent-red">Industrial Color</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            const hasImage = Boolean(point.img);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative  bg-white border border-slate-200 rounded-2xl p-5 shadow-sm shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden hover:border-accent-red/40"
              >
                {hasImage && (
                  <>
                    <img
                      src={point.img}
                      alt={point.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-107"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-white/40" />
                  </>
                )}
                <div className="relative z-10">
                <div className="flex items-center gap-5 mb-4 ">
                  <div className="w-12 h-12 rounded-xl bg-accent-red/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent-red group-hover:scale-105">
                    <Icon className="w-6 h-6 text-accent-red transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark  leading-snug">
                    {point.title}
                  </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed tracking-wide">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}