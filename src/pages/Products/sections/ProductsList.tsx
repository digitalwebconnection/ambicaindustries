import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '../../../data/products';

export default function ProductsList() {
  return (
    <section id="catalog" className="py-12 sm:py-16 md:py-24 relative z-20 -mt-4 sm:-mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12 md:space-y-14">
          {productCategories.map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center bg-white rounded-2xl p-5 sm:p-6 lg:p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              {/* Product Image */}
              <div className={`lg:col-span-5 w-full ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Link
                  to={`/products/${category.slug}`}
                  className="group block rounded-xl overflow-hidden relative h-64 sm:h-75 lg:h-112.5 w-full shadow-md sm:shadow-lg"
                >
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-[2px]">
                    <span className="text-white font-semibold text-sm sm:text-base bg-accent-red/90 backdrop-blur-md px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transform translate-y-6 sm:translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                      Explore Category <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Description + Sub-products */}
              <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark mb-3 sm:mb-4 hover:text-primary transition-colors">
                    <Link to={`/products/${category.slug}`}>{category.name}</Link>
                  </h2>
                  <div className="w-20 sm:w-26 h-1 bg-accent-red rounded-full mb-4 sm:mb-6" />
                  <p className="text-gray-text text-base sm:text-lg leading-relaxed">{category.description}</p>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">Available Lines</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {category.subProducts.map((sub) => (
                      <Link
                        key={sub.slug}
                        to={`/products/${category.slug}/${sub.slug}`}
                        className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all duration-300 group/sub"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/sub:bg-primary transition-colors">
                          <ArrowRight
                            size={14}
                            className="text-primary group-hover/sub:text-white transition-colors"
                          />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-700 group-hover/sub:text-primary-dark">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-100">
                  <Link to={`/products/${category.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base hover:text-accent-red transition-colors">
                    View full details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
