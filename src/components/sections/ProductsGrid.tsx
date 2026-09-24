import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productCategories } from '../../data/products';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const getGridClass = (index: number) => {
  switch (index) {
    case 0:
      return "md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[600px]";
    case 1:
      return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[285px]";
    case 2:
      return "md:col-span-1 md:row-span-1 min-h-[250px] md:min-h-[285px]";
    case 3:
      return "md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-[285px]";
    case 4:
      return "md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-[285px]";
    case 5:
      return "md:col-span-2 md:row-span-1 min-h-[250px] md:min-h-[285px]";
    default:
      return "col-span-1 min-h-[250px]";
  }
};

export default function ProductsGrid() {
  const displayProducts = productCategories.slice(0, 6);

  return (
    <section className="py-8 md:py-14 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253, 195, 1, 0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6, 64, 140, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
        >
          <div className="max-w-2xl relative">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-4 mb-6">
              <span className="h-[2px] w-10 bg-primary rounded-full" />
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                Premium Collection
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-primary-dark leading-[1.1] mb-2">
              Our Signature <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
                Dye Products
              </span>
            </motion.h2>
          </div>
          
          <motion.div variants={fadeUp} className="hidden md:block pb-2">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-8 py-2.5 bg-primary text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-accent-red/30 cursor-default"
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
              <div className="block w-full h-full cursor-default">
                {/* Background Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Hover Glass Element (Top Right) */}
                <Link
                  to={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30"
                >
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </Link>

                {/* Content (Bottom) */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                  <div>
                    <div className="inline-block px-3 py-1 mb-3 bg-white/30 border border-white/30 rounded-full text-white/90 text-[11px] font-bold uppercase tracking-widest">
                      Ambica Series
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-white/70 text-sm md:text-base line-clamp-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        Discover our high-performance {product.name.toLowerCase()} engineered for industrial excellence and vibrant longevity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mt-10 flex justify-center md:hidden"
        >
          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-accent-red/30 cursor-default"
          >
            Explore Catalog
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
