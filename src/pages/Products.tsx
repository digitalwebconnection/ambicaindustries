import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productCategories } from '../data/products';
import { ArrowRight } from 'lucide-react';
import Faqs from '../components/sections/Faqs';
import { productsFaqs } from '../data/faq';

export default function Products() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Premium Hero Section for All Products */}
      <section className="relative pt-12 pb-8 md:pt-14 md:pb-12 overflow-hidden bg-white border-b border-gray-100">
        {/* Professional Background Pattern & Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2306408c\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[20rem] h-[20rem] rounded-full bg-accent-red/5 blur-[80px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-primary-dark mb-4 leading-[1.15] tracking-tight">
                Discover Our Premium <br className="hidden lg:block" />
                <span className="text-accent-red relative inline-block mt-1">
                  Dye Collections
                  {/* Decorative underline */}
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/80 rounded-full transform -rotate-1" />
                </span>
              </h1>
              
              <p className="text-base text-gray-text leading-relaxed max-w-lg mt-4">
                Explore our comprehensive range of high-performance colorants, carefully formulated for exceptional brilliance, fastness, and reliability across all industrial applications.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a href="#catalog" onClick={(e) => { e.preventDefault(); window.scrollBy({ top: 500, behavior: 'smooth' }); }} className="bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-[0_8px_20px_rgba(6,64,140,0.25)] hover:shadow-[0_12px_25px_rgba(6,64,140,0.35)] hover:-translate-y-1 transition-all duration-300">
                  Browse Catalog
                </a>
              </div>
            </motion.div>

            {/* Right Images (Masonry Style Grid) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative hidden sm:block"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-primary/10 to-accent-red/5 rounded-full blur-[60px] -z-10" />
              
              <div className="grid grid-cols-2 gap-4 h-[320px] lg:h-[380px]">
                {/* Column 1 */}
                <div className="flex flex-col gap-4 md:gap-6 mt-8">
                  <div className="w-full h-3/5 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                     <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src={productCategories[0]?.image} alt="Dye Colors" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="w-full h-2/5 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                     <div className="absolute inset-0 bg-accent-red/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src={productCategories[1]?.image} alt="Industrial Dyes" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="flex flex-col gap-4 md:gap-6 mb-8">
                  <div className="w-full h-2/5 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                     <div className="absolute inset-0 bg-accent-gold/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src={productCategories[2]?.image} alt="Fabric Dyeing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="w-full h-3/5 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                     <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src={productCategories[4]?.image || productCategories[3]?.image} alt="Color Mix" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 md:space-y-14">
            {productCategories.map((category, i) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-white rounded-xl p-6 lg:p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
              >
                {/* Product Image */}
                <div className={`lg:col-span-5 w-full ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link
                    to={`/products/${category.slug}`}
                    className="group block rounded-xl overflow-hidden relative h-[300px] lg:h-[450px] w-full shadow-lg"
                  >
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-[2px]">
                      <span className="text-white font-semibold text-base bg-accent-red/90 backdrop-blur-md px-8 py-3 rounded-full flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                        Explore Category <ArrowRight size={18} />
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Description + Sub-products */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-4 hover:text-primary transition-colors">
                      <Link to={`/products/${category.slug}`}>{category.name}</Link>
                    </h2>
                    <div className="w-26 h-1 bg-accent-red rounded-full mb-6" />
                    <p className="text-gray-text text-lg leading-relaxed">{category.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Available Lines</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.subProducts.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/products/${category.slug}/${sub.slug}`}
                          className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all duration-300 group/sub"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/sub:bg-primary transition-colors">
                            <ArrowRight
                              size={14}
                              className="text-primary group-hover/sub:text-white transition-colors"
                            />
                          </div>
                          <span className="font-medium text-gray-700 group-hover/sub:text-primary-dark">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link to={`/products/${category.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent-red transition-colors">
                      View full details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Faqs faqs={productsFaqs} />
    </div>
  );
}
