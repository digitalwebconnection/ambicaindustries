import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import { productCategories } from '../data/products';
import { ArrowRight, ChevronRight, CheckCircle2, Package, Target, Layers } from 'lucide-react';

export default function ProductCategory() {
  const { category, slug } = useParams<{ category: string; slug?: string }>();

  const cat = productCategories.find((c) => c.slug === category);

  if (!cat) {
    return (
      <>
        <Breadcrumb
          title="Product Not Found"
          items={[{ label: 'Products', href: '/products' }, { label: 'Not Found' }]}
        />
        <section className="py-20 text-center">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Product category not found</h2>
          <Link to="/products" className="gradient-btn inline-block">
            View All Products
          </Link>
        </section>
      </>
    );
  }

  // If slug is provided, show sub-product page
  const subProduct = slug ? cat.subProducts.find((s) => s.slug === slug) : null;

  if (slug && !subProduct) {
    return (
      <>
        <Breadcrumb
          title="Product Not Found"
          items={[
            { label: 'Products', href: '/products' },
            { label: cat.name, href: `/products/${cat.slug}` },
            { label: 'Not Found' },
          ]}
        />
        <section className="py-20 text-center">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Sub-product not found</h2>
          <Link to={`/products/${cat.slug}`} className="gradient-btn inline-block">
            Back to {cat.name}
          </Link>
        </section>
      </>
    );
  }

  // Sub-product page
  if (subProduct) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Immersive Cover Photo Hero for Sub-Products */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden ">
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
              <nav className="flex items-center flex-wrap justify-center gap-2 text-sm font-medium text-white/60 mb-6 border border-white/10 bg-white/5 rounded-full px-6 py-2 backdrop-blur-md">
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

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight px-6 py-2 ">
                {subProduct.name}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 drop-shadow">
                Premium quality {subProduct.name.toLowerCase()} engineered for industrial applications. Delivering exceptional color fastness, high purity, and consistent, brilliant results.
              </p>

              <Link 
                to="/enquiry" 
                className="bg-accent-red text-white px-10 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(227,24,55,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(227,24,55,0.5)] transition-all duration-300 flex items-center gap-2 group"
              >
                Request a Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Main content - Editorial Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8 space-y-16"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-accent-red" />
                    <span className="text-accent-red font-bold tracking-widest uppercase text-sm">Product Overview</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-6 tracking-tight">
                    Superior Quality {subProduct.name}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-6">
                    Manufactured using premium raw materials and advanced synthesis, our <strong className="font-semibold text-primary-dark">{subProduct.name}</strong> offer unparalleled color consistency and excellent performance for demanding industrial applications.
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed">
                    Available in various specialized grades and packaging options to meet your exact technical specifications. We maintain rigorous quality control at every production stage to ensure our dyes consistently exceed global industry standards.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[2px] bg-primary" />
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Key Benefits</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      'Exceptional Color Fastness',
                      'High Purity Levels',
                      'Consistent Batch Quality',
                      'Wide Application Range',
                      'Eco-friendly Formulations',
                      'Competitive Pricing'
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="text-2xl font-serif font-extrabold text-primary/15 group-hover:text-primary transition-colors mt-[-2px]">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                        <span className="font-semibold text-gray-700 pt-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications Section */}
                <div className="pt-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-accent-red" />
                    <span className="text-primary-dark font-bold tracking-widest uppercase text-sm">Applications & Uses</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Textile Dyeing', icon: Layers },
                      { name: 'Leather Processing', icon: Target },
                      { name: 'Paper Coloring', icon: Package },
                      { name: 'Wood Staining', icon: Layers },
                      { name: 'Industrial Coatings', icon: Target },
                      { name: 'Specialty Inks', icon: Package }
                    ].map((app, idx) => {
                      const Icon = app.icon;
                      return (
                        <div key={idx} className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                          <Icon className="text-accent-red mb-4 relative z-10" size={28} strokeWidth={1.5} />
                          <h4 className="font-bold text-gray-800 relative z-10 group-hover:text-primary transition-colors">{app.name}</h4>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Technical Specs & Packaging */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
                  {/* Specifications Card */}
                  <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <Target className="text-accent-red" size={24} strokeWidth={2.5} />
                        <h3 className="text-2xl font-bold">Technical Specs</h3>
                      </div>
                      <div className="space-y-6">
                        {[
                          { label: 'Physical Appearance', value: 'Powder / Liquid' },
                          { label: 'Solubility', value: 'High Water Solubility' },
                          { label: 'Shelf Life', value: '2-3 Years minimum' },
                          { label: 'Quality Standard', value: 'ISO 9001:2015 Certified' }
                        ].map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-end border-b border-white/10 pb-3">
                            <span className="text-white/70 font-medium">{spec.label}</span>
                            <span className="font-bold text-white text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Packaging Card */}
                  <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Package className="text-primary" size={24} strokeWidth={2.5} />
                        <h3 className="text-2xl font-bold text-gray-900">Packaging Options</h3>
                      </div>
                      <p className="text-gray-600 mb-8 leading-relaxed">
                        Versatile and secure packaging solutions designed to ensure absolute product integrity during global transit and long-term storage.
                      </p>
                      <ul className="space-y-5">
                        {[
                          '25kg Premium HDPE Drums/Bags',
                          '50kg Heavy-duty Corrugated Boxes',
                          'Customized Packing on Request'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary">
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
              <div className="lg:col-span-4 space-y-10">
                <div className="sticky top-24 space-y-10">
                  
                  {/* Other Products */}
                  <div>
                    <h3 className="text-sm font-bold tracking-widest uppercase text-gray-800 mb-6 pb-4 border-b border-gray-400">
                      Explore Other {cat.name}
                    </h3>
                    <div className="space-y-3">
                      {cat.subProducts.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/products/${cat.slug}/${sub.slug}`}
                          className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                            sub.slug === slug
                              ? 'bg-primary border-primary text-white shadow-md'
                              : 'bg-white border-gray-200 hover:border-primary/30 hover:shadow-sm text-gray-600'
                          }`}
                        >
                          <span className="font-medium text-sm">{sub.name}</span>
                          <ChevronRight size={16} className={sub.slug === slug ? 'text-white' : 'text-gray-300 group-hover:text-primary transition-colors'} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Colorful Full-Width CTA Banner */}
            <div className="mt-16 md:mt-24 bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-xl relative overflow-hidden">
              {/* Decorative background for CTA */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-40 h-40 bg-accent-gold/20 blur-[40px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-accent-gold font-bold text-sm tracking-wider uppercase mb-2">Custom Formulation</div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Need Specialized Dye Solutions?</h3>
                <p className="text-white/80 text-base md:text-lg max-w-2xl">
                  Our technical team can help you find the exact dye formulation for your specific industrial needs. We offer tailored matching, technical support, and prompt global delivery.
                </p>
              </div>
              
              <Link
                to="/contact"
                className="relative z-10 shrink-0 bg-white text-primary-dark font-bold px-8 py-4 rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 group"
              >
                Contact Our Experts
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // Category page
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Premium Hero Section */}
      {/* Clean & Colorful Hero Section */}
      <section className="relative pt-12 pb-12 md:pt-14 md:pb-14 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent-red/5">
        {/* Decorative Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-accent-red/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Inline Breadcrumb */}
              <nav className="flex items-center flex-wrap gap-2 text-sm font-medium text-gray-400 mb-8">
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  Home
                </Link>
                <ChevronRight size={14} />
                <Link to="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
                <ChevronRight size={14} />
                <span className="text-primary font-semibold">{cat.name}</span>
              </nav>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-dark mb-6 leading-[1.15] tracking-tight">
                {cat.name}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
                {cat.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#sub-products" 
                  onClick={(e) => { e.preventDefault(); window.scrollBy({ top: 600, behavior: 'smooth' }); }}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_20px_rgba(6,64,140,0.2)] hover:shadow-[0_12px_25px_rgba(6,64,140,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  View Product Lines
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link 
                  to="/contact" 
                  className="bg-white text-primary border border-primary/20 px-8 py-4 rounded-full font-bold hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 flex items-center gap-2"
                >
                  Request Sample
                </Link>
              </div>
            </motion.div>

            {/* Right: Clean Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Editorial Style Overview & Benefits Section */}
      <section className="py-8 md:py-14 bg-white border-b border-primary/10 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            
            {/* Left: Sticky Overview */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-accent-red" />
                    <span className="text-accent-red font-bold tracking-widest uppercase text-sm">Product Intelligence</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-8 leading-[1.15] tracking-tight">
                    Why Choose Our {cat.name}?
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 font-light">
                    Manufactured using premium raw materials and advanced synthesis, our <strong className="font-semibold text-primary-dark">{cat.name}</strong> offer unparalleled color consistency and strictly exceed global industry standards.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right: Elegant Features List */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex flex-col">
                {[
                  { title: 'Exceptional Fastness', desc: 'Superior resistance to washing, light, and rubbing for long-lasting color.' },
                  { title: 'High Purity Levels', desc: 'Strictly filtered and free from unwanted impurities for clean, bright results.' },
                  { title: 'Batch Consistency', desc: 'Advanced spectrophotometer matching guarantees the exact shade every time.' },
                  { title: 'Wide Application', desc: 'Highly versatile formulations suitable for a multitude of material types.' },
                  { title: 'Eco-friendly Options', desc: 'Compliant with stringent international environmental and safety standards, ensuring sustainable manufacturing.' },
                  { title: 'Competitive Pricing', desc: 'Cost-effective manufacturing provides premium quality dyes at an exceptional value for your business.' }
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group border-b border-primary/10 last:border-0 py-8 first:pt-0"
                  >
                    <div className="flex items-start gap-6 md:gap-8">
                      <div className="text-4xl md:text-5xl font-extrabold text-primary/15 group-hover:text-primary transition-colors duration-500 font-serif">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary-dark text-xl md:text-2xl mb-3 group-hover:translate-x-2 transition-transform duration-300">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">{benefit.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Simple & Clean Sub Products Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5" id="sub-products">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-4">
              Available {cat.name} Lines
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Select a specific product line below to view detailed specifications, color swatches, and technical data.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {cat.subProducts.map((sub) => (
              <Link
                key={sub.slug}
                to={`/products/${cat.slug}/${sub.slug}`}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 hover:border-primary/40 hover:shadow-[0_4px_15px_rgba(6,64,140,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="font-semibold text-primary-dark group-hover:text-primary transition-colors text-sm md:text-base">
                  {sub.name}
                </span>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
          
          {/* Colorful CTA Banner */}
          <div className="mt-20 bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-xl relative overflow-hidden">
            {/* Decorative background for CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-40 h-40 bg-accent-gold/20 blur-[40px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-accent-gold font-bold text-sm tracking-wider uppercase mb-2">Custom Formulation</div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Need Specialized Dye Solutions?</h3>
              <p className="text-white/80 text-base md:text-lg max-w-2xl">
                Our technical team can help you find the exact dye formulation for your specific industrial needs. We offer tailored matching, technical support, and prompt global delivery.
              </p>
            </div>
            
            <Link
              to="/contact"
              className="relative z-10 shrink-0 bg-white text-primary-dark font-bold px-8 py-4 rounded-full hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 group"
            >
              Contact Our Experts
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
