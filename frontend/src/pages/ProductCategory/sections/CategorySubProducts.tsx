import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '@/data/products';

interface CategorySubProductsProps {
  cat: ProductCategory;
}

export default function CategorySubProducts({ cat }: CategorySubProductsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-white to-primary/5" id="sub-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-dark mb-3 sm:mb-4">
            Available {cat.name} Lines
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            Select a specific product line below to view detailed specifications, color swatches, and technical data.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4">
          {cat.subProducts.map((sub) => (
            <Link
              key={sub.slug}
              to={`/products/${cat.slug}/${sub.slug}`}
              className="group inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-white rounded-full border border-gray-200 hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(6,64,140,0.08)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              <span className="font-semibold text-primary-dark group-hover:text-primary transition-colors text-xs sm:text-sm md:text-base">
                {sub.name}
              </span>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        
        {/* Colorful CTA Banner */}
        <div className="mt-14 sm:mt-20 bg-linear-to-r from-primary-dark to-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left shadow-xl relative overflow-hidden">
          {/* Decorative background for CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-accent-gold/20 blur-2xl rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-accent-gold font-bold text-xs sm:text-sm tracking-wider uppercase mb-2">Custom Formulation</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4">Need Specialized Dye Solutions?</h3>
            <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl">
              Our technical team can help you find the exact dye formulation for your specific industrial needs. We offer tailored matching, technical support, and prompt global delivery.
            </p>
          </div>
          
          <Link
            to="/contact"
            className="relative z-10 shrink-0 w-full sm:w-auto text-center justify-center bg-white text-primary-dark font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <span>Contact Our Experts</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
