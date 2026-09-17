import { productMapping } from "../../data/industries";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";



export default function ProductIndustryMapping() {
  return (
    <section className="bg-white py-16 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[0.80fr_1.5fr] gap-16 lg:gap-20">
          <div className="lg:sticky lg:top-27 lg:self-start">
            <div className="flex items-center gap-2 uppercase tracking-widest text-accent-red font-semibold text-[12px]"> <span className="w-10 h-0.5 bg-accent-red"/>product applications </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-primary">
              Color Solutions <span className=" text-accent-red">
                Across Industries
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600">
              Different materials demand different approaches to coloration.
              Our dye solutions are developed to meet the specific needs of
              textiles, leather, wood and specialized industries.
            </p>
          </div>

          <div>
            <div className="hidden md:grid grid-cols-[1fr_1fr] gap-6 pb-4 border-b border-slate-200">
              <span className="text-sm  tracking-wider font-semibold text-slate-500">Dye Category</span>
              <span className="text-sm  tracking-wider font-semibold text-slate-500">Applications</span>
            </div>

            <div>
              {productMapping.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="group relative py-10 border-b border-slate-200 hover:bg-primary/2 transition-colors duration-300">
                  <div className="grid grid-cols-[0.80fr_1fr] gap-5 md:gap-6 px-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-primary-dark group-hover:text-accent-red-dark transition-transform duration-300">{item.name}</h3>
                      </div>
                      <p className="mt-3 text-sm font-medium text-slate-500">{item.material}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-md">{item.description}</p>
                    </div>

                    <div className="pl-6 border-l border-slate-200">
                      <p className="text-xs uppercase tracking-wider text-slate-500">Suitable For</p>
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-700">
                        {item.applications}
                      </p>
                      <ArrowUpRight className="mt-5 h-5 w-5 text-slate-300 group-hover:text-accent-red-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"/>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

