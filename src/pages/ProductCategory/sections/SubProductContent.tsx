import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2, Package, Target, Layers } from 'lucide-react';
import type { ProductCategory, SubProduct } from '../../../data/products';

interface SubProductContentProps {
  cat: ProductCategory;
  subProduct: SubProduct;
  slug?: string;
}

export default function   SubProductContent({ cat, subProduct, slug }: SubProductContentProps) {
  const benefits = [
    'Exceptional Color Fastness',
    'High Purity Levels',
    'Consistent Batch Quality',
    'Wide Application Range',
    'Eco-friendly Formulations',
    'Competitive Pricing'
  ];

  const applications = [
    { name: 'Textile Dyeing', icon: Layers },
    { name: 'Leather Processing', icon: Target },
    { name: 'Paper Coloring', icon: Package },
    { name: 'Wood Staining', icon: Layers },
    { name: 'Industrial Coatings', icon: Target },
    { name: 'Specialty Inks', icon: Package }
  ];

  const specs = [
    { label: 'Physical Appearance', value: 'Powder / Liquid' },
    { label: 'Solubility', value: 'High Water Solubility' },
    { label: 'Shelf Life', value: '2-3 Years minimum' },
    { label: 'Quality Standard', value: 'ISO 9001:2015 Certified' }
  ];

  const packaging = [
    '25kg Premium HDPE Drums/Bags',
    '50kg Heavy-duty Corrugated Boxes',
    'Customized Packing on Request'
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Main content - Editorial Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-12 sm:space-y-16"
          >
            <div>
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-0.5 bg-accent-red" />
                <span className="text-accent-red font-bold tracking-widest uppercase text-xs sm:text-sm">Product Overview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-dark mb-4 sm:mb-6 tracking-tight">
                Superior Quality {subProduct.name}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-4 sm:mb-6">
                Manufactured using premium raw materials and advanced synthesis, our <strong className="font-semibold text-primary-dark">{subProduct.name}</strong> offer unparalleled color consistency and excellent performance for demanding industrial applications.
              </p>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Available in various specialized grades and packaging options to meet your exact technical specifications. We maintain rigorous quality control at every production stage to ensure our dyes consistently exceed global industry standards.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-0.5 bg-primary" />
                <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm">Key Benefits</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-4 group">
                    <div className="text-xl sm:text-2xl font-serif font-extrabold text-primary/15 group-hover:text-primary transition-colors -mt-0.5 shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <span className="font-semibold text-gray-700 pt-0.5 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications Section */}
            <div className="pt-6 sm:pt-10">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-0.5 bg-linear-to-r from-primary to-accent-red" />
                <span className="text-primary-dark font-bold tracking-widest uppercase text-xs sm:text-sm">Applications & Uses</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                {applications.map((app, idx) => {
                  const Icon = app.icon;
                  return (
                    <div key={idx} className="group relative bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                      <Icon className="text-accent-red mb-3 sm:mb-4 relative z-10" size={26} strokeWidth={1.5} />
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base relative z-10 group-hover:text-primary transition-colors">{app.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Specs & Packaging */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 pt-6 sm:pt-10">
              {/* Specifications Card */}
              <div className="bg-linear-to-br from-primary-dark to-primary rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <Target className="text-accent-red" size={24} strokeWidth={2.5} />
                    <h3 className="text-xl sm:text-2xl font-bold">Technical Specs</h3>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-end border-b border-white/10 pb-3 text-sm sm:text-base">
                        <span className="text-white/70 font-medium">{spec.label}</span>
                        <span className="font-bold text-white text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Packaging Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <Package className="text-primary" size={24} strokeWidth={2.5} />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Packaging Options</h3>
                  </div>
                  <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Versatile and secure packaging solutions designed to ensure absolute product integrity during global transit and long-term storage.
                  </p>
                  <ul className="space-y-3.5 sm:space-y-5">
                    {packaging.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base">
                        <div className="mt-0.5 sm:mt-1 bg-primary/10 p-1 rounded-full text-primary shrink-0">
                          <CheckCircle2 size={16} strokeWidth={3} />
                        </div>
                        <span className="font-semibold text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            <div className="lg:sticky lg:top-24 space-y-8 sm:space-y-10">
              
              {/* Other Products */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-300">
                  Explore Other {cat.name}
                </h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {cat.subProducts.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/products/${cat.slug}/${sub.slug}`}
                      className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-300 ${
                        sub.slug === slug
                          ? 'bg-primary border-primary text-white shadow-md'
                          : 'bg-white border-gray-200 hover:border-primary/30 hover:shadow-xs text-gray-600'
                      }`}
                    >
                      <span className="font-medium text-xs sm:text-sm">{sub.name}</span>
                      <ChevronRight size={16} className={sub.slug === slug ? 'text-white' : 'text-gray-300 group-hover:text-primary transition-colors'} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Colorful Full-Width CTA Banner */}
        <div className="mt-12 sm:mt-16 md:mt-24 bg-linear-to-r from-primary-dark to-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left shadow-xl relative overflow-hidden">
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
