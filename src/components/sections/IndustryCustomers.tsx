import { motion } from "framer-motion";
import { customerTypes } from "../../data/industries";

export default function IndustryCustomers() {

  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.08 }}
          className="max-w-4xl mb-10">
          <div className="text-sm font-semibold uppercase flex items-center tracking-wider text-accent-red">
            <span className="w-10 mr-2 bg-accent-red h-0.5" />
            Who We Serve
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-wide  text-primary-dark">
            Color Solutions for <span className="text-accent-red">Every Scale</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            From small, specialized requirements to large-scale bulk orders,
            Ambica supports customers across the supply chain with dependable
            color solutions and consistent product quality.
          </p>
        </motion.div>

        <div className="flex flex-row gap-4  h-auto md:h-75">
          {customerTypes.map((customer) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: customer.id * 0.10 }}
              key={customer.id} className=" group relative overflow-hidden rounded-xl flex-1 hover:flex-[2.5] transition-[flex] duration-700 ease-in-out bg-white shadow-xl shadow-black/30  ">
              <img src={customer.image} alt={customer.title}
                className=" absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 " />

              <div className=" absolute inset-0 bg-linear-to-t from-black/20 to-transparent
          transition-colors  duration-300 group-hover:from-black/45"/>
              <div className=" absolute  bottom-2 p-7">
                <h3 className=" text-2xl  font-bold text-white leading-tight transition-all duration-500 "  >
                  {customer.title}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                  <div className="overflow-hidden">
                    <p className=" pt-3 text-sm md:text-base leading-relaxed text-white/90  opacity-0  group-hover:opacity-100  transition-opacity  duration-500 delay-150 "  >
                      {customer.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
