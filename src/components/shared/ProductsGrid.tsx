import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productCategories } from '@/data/products';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const getGridClass = (index: number) => {
  switch (index) {
    case 0:
      return "md:col-span-2 md:row-span-2 min-h-[300px] sm:min-h-[350px] md:min-h-[600px]";
    case 1:
      return "md:col-span-1 md:row-span-1 min-h-[220px] sm:min-h-[250px] md:min-h-[285px]";
    case 2:
      return "md:col-span-1 md:row-span-1 min-h-[220px] sm:min-h-[250px] md:min-h-[285px]";
    case 3:
      return "md:col-span-2 md:row-span-1 min-h-[220px] sm:min-h-[250px] md:min-h-[285px]";
    case 4:
      return "md:col-span-2 md:row-span-1 min-h-[220px] sm:min-h-[250px] md:min-h-[285px]";
    case 5:
      return "md:col-span-2 md:row-span-1 min-h-[220px] sm:min-h-[250px] md:min-h-[285px]";
    default:
      return "col-span-1 min-h-[220px] sm:min-h-[250px]";
  }
};

export default function ProductsGrid() {
  const displayProducts = productCategories.slice(0, 6);

  return (
    <section className="py-8 sm:py-12 md:py-14 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 md:w-150 md:h-150 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253, 195, 1, 0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-[-10%] w-72 h-72 md:w-125 md:h-125 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6, 64, 140, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16"
        >
          <div className="max-w-2xl relative">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
              <span className="h-0.5 w-8 sm:w-10 bg-primary rounded-full" />
              <span className="text-primary font-bold text-xs sm:text-sm uppercase tracking-widest">
                Premium Collection
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark leading-[1.15] md:leading-[1.1] mb-2">
              Our Signature <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-red to-accent-red-dark">
                Dye Products
              </span>
            </motion.h2>
          </div>
          
          <motion.div variants={fadeUp} className="hidden md:block pb-2">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-8 py-2.5 bg-primary text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-accent-red/30"
            >
              Explore Catalog
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Bento Grid - single observer for the whole grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
        >
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={fadeUp}
              className={`${getGridClass(index)} group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500`}
            >
              <Link 
                to={`/products/${product.slug}`}
                aria-label={`View ${product.name}`}
                className="block relative w-full h-full cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/50 to-transparent opacity-90 md:opacity-80 md:group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Glass Indicator Element (Top Right) */}
                <div
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 z-30 shadow-xs"
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Content (Bottom) */}
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end z-20">
                  <div>
                    <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 mb-2 md:mb-3 bg-white/30 border border-white/30 rounded-full text-white/90 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest backdrop-blur-xs">
                      Ambica Series
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 md:mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-white/80 text-xs sm:text-sm md:text-base line-clamp-2 opacity-100 translate-y-0 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-75">
                        Discover our high-performance {product.name.toLowerCase()} engineered for industrial excellence and vibrant longevity.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mt-8 sm:mt-10 flex justify-center md:hidden"
        >
          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-primary text-white rounded-full font-semibold text-[15px] hover:bg-accent-red active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-accent-red/30"
          >
            Explore Catalog
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
