import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import type { ProductCategory, SubProduct } from '@/data/products';

interface SubProductHeroProps {
  cat: ProductCategory;
  subProduct: SubProduct;
}

export default function SubProductHero({ cat, subProduct }: SubProductHeroProps) {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cat.image} 
          alt={subProduct.name} 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay scale-105" 
        />
        <div className="absolute inset-0 bg-black/60 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Inline Breadcrumb */}
          <nav className="flex items-center flex-wrap justify-center gap-2 text-xs sm:text-sm font-medium text-white/70 mb-4 sm:mb-6 border border-white/10 bg-white/5 rounded-full px-2 sm:px-6 py-1.5 sm:py-2 backdrop-blur-md">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight size={14} />
            <Link to={`/products/${cat.slug}`} className="hover:text-white transition-colors">
              {cat.name}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-semibold">{subProduct.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-[1.15] tracking-tight px-4 sm:px-6 py-2">
            {subProduct.name}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-8 sm:mb-10 drop-shadow max-w-2xl">
            Premium quality {subProduct.name.toLowerCase()} engineered for industrial applications. Delivering exceptional color fastness, high purity, and consistent, brilliant results.
          </p>

          <Link 
            to="/enquiry" 
            className="w-full sm:w-auto justify-center bg-accent-red text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold shadow-[0_0_20px_rgba(227,24,55,0.3)] hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(227,24,55,0.5)] transition-all duration-300 flex items-center gap-2 group text-center"
          >
            <span>Request a Quote</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
