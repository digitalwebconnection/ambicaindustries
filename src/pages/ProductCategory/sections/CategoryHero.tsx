import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '../../../data/products';

interface CategoryHeroProps {
  cat: ProductCategory;
}

export default function CategoryHero({ cat }: CategoryHeroProps) {
  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-12 md:pt-14 md:pb-14 overflow-hidden bg-linear-to-br from-primary/5 via-white to-accent-red/5">
      {/* Decorative Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-72 sm:w-160 h-72 sm:h-160 bg-primary/10 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-60 sm:w-120 h-60 sm:h-120 bg-accent-red/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & Actions (Bottom on mobile order-2, Left on desktop lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-dark mb-4 sm:mb-6 leading-[1.15] tracking-tight">
              {cat.name}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-lg">
              {cat.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a 
                href="#sub-products" 
                onClick={(e) => { e.preventDefault(); window.scrollBy({ top: 600, behavior: 'smooth' }); }}
                className="w-full sm:w-auto justify-center bg-primary text-white px-7 py-3 sm:py-2.5 rounded-full font-bold shadow-[0_8px_20px_rgba(6,64,140,0.2)] hover:shadow-[0_12px_25px_rgba(6,64,140,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center gap-2 group text-center"
              >
                <span>View Product Lines</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto justify-center bg-white text-primary border border-primary/20 px-7 py-3 sm:py-2.5 rounded-full font-bold hover:bg-primary/5 hover:border-primary/40 active:scale-95 transition-all duration-300 flex items-center gap-2 text-center"
              >
                <span>Request Sample</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Clean Image (Top on mobile order-1, Right on desktop lg:order-2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative order-1 lg:order-2 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-64 sm:h-80 md:h-87.5 lg:h-112.5 object-cover hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
