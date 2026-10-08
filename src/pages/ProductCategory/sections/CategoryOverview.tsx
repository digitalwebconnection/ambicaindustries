import { motion } from 'framer-motion';
import type { ProductCategory } from '../../../data/products';

interface CategoryOverviewProps {
  cat: ProductCategory;
}

export default function CategoryOverview({ cat }: CategoryOverviewProps) {
  const benefits = [
    { title: 'Exceptional Fastness', desc: 'Superior resistance to washing, light, and rubbing for long-lasting color.' },
    { title: 'High Purity Levels', desc: 'Strictly filtered and free from unwanted impurities for clean, bright results.' },
    { title: 'Batch Consistency', desc: 'Advanced spectrophotometer matching guarantees the exact shade every time.' },
    { title: 'Wide Application', desc: 'Highly versatile formulations suitable for a multitude of material types.' },
    { title: 'Eco-friendly Options', desc: 'Compliant with stringent international environmental and safety standards, ensuring sustainable manufacturing.' },
    { title: 'Competitive Pricing', desc: 'Cost-effective manufacturing provides premium quality dyes at an exceptional value for your business.' }
  ];

  return (
    <section className="py-8 md:py-14 bg-white border-b border-primary/10 relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Left: Sticky Overview */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-0.5 bg-accent-red" />
                  <span className="text-accent-red font-bold tracking-widest uppercase text-xs sm:text-sm">Product Intelligence</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark mb-4 sm:mb-8 leading-[1.15] tracking-tight">
                  Why Choose Our {cat.name}?
                </h2>
                <p className="text-base sm:text-lg  md:text-xl  text-gray-600 leading-relaxed mb-6 font-light ">
                  Manufactured using premium raw materials and advanced synthesis, our <strong className="font-semibold text-primary-dark">{cat.name}</strong> offer unparalleled color consistency and strictly exceed global industry standards.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right: Elegant Features List */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="group border-b border-primary/10 last:border-0 py-6 sm:py-8 first:pt-0"
                >
                  <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary/15 group-hover:text-primary transition-colors duration-500 font-serif shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-dark text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                        {benefit.desc}
                      </p>
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
