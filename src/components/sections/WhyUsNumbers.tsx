import { motion } from "framer-motion";

export default function WhyUsNumbers() {
  const stats = [
    {
      value: "25+",
      label: "Years of Chemical Expertise",
      description: "Two generations of experience in dye manufacturing and color solutions.",
    },
    {
      value: "300+",
      label: "Standardized Dye Formulations",
      description: "A diverse formulation portfolio developed for different applications and industry requirements.",
    },
    {
      value: "40+",
      label: "Countries Exported",
      description: "Our products and color solutions support customers across international markets.",
    },
    {
      value: "23",
      label: "Application Sectors Served",
      description: "Serving diverse requirements across textiles, paper, leather, wood, inks, and specialized applications.",
    },
    {
      value: "2",
      label: "Manufacturing Units",
      description: "Production capabilities supporting consistent manufacturing and growing customer requirements.",
    },
    {
      value: "80%",
      label: "Clients Reordering Regularly",
      description: "A strong share of repeat business built through consistent products and dependable customer support.",
    },
  ];

  return (
    <section className="py-12 md:py-14 mt-5 bg-primary-dark relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-red/10 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide text-white leading-tight">
            Experience You Can <span className="text-primary rounded-sm bg-white inline-flex px-2 ">Measure</span>
          </h2>
          <p className="mt-3 text-base text-white/70 leading-relaxed">
            Our journey is built on manufacturing experience, product development,
            global reach, and long-term customer relationships.
          </p>
        </motion.div>


        <div className="flex flex-wrap">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`w-1/2 sm:w-1/3 lg:w-1/6 text-center px-5 py-5 ${
                index !== 0 ? "border-l border-white/10" : ""
              } `}
            >
              <p className="text-4xl rounded-sm bg-white/80 inline-flex px-2 py-1 font-black text-accent-red tracking-wide leading-none mb-2">
                {stat.value}
              </p>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {stat.label}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}