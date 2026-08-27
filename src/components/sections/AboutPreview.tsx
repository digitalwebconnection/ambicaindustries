import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Gem, Factory } from 'lucide-react';

import mainImg from '../../assets/images/hero/rows-colorful-dye-vats-industrial-factory.jpg';
import secondaryImg from '../../assets/images/hero/vibrant-dyeing-bleaching-linen-fabric-factory (1).jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function AboutPreview() {
  return (
    <section className="py-8 lg:py-14 relative overflow-hidden bg-slate-50">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217, 23, 156, 0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253, 195, 1, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left Content Section */}
          <motion.div variants={fadeUp} className="max-w-2xl">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-[2px] w-10 bg-primary rounded-full" />
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                WELCOME TO AMBICA INDUSTRY
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-primary-dark mb-8 leading-[1.1]">
              Textile & Paper Dyes <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
                Manufacturer
              </span>
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Since 1998, Ambica Industry has been a trusted leader in manufacturing high-quality, reliable, and innovative dye solutions specifically tailored for the textile and paper sectors. Founded by our father, we proudly carry forward a second-generation legacy of excellence. Today, we specialize in developing vibrant, deep-penetrating, and long-lasting colors that meet the strict performance demands of fashion, home textiles, industrial fabrics, and diverse paper manufacturing processes worldwide.
            </p>

            <Link
              to="/#about"
              className="group inline-flex items-center gap-3 px-8 py-2.5 bg-primary text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-accent-red/30"
            >
              About Read More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Image & Glass Stats Section */}
          <motion.div variants={fadeUp} className="relative mt-12 lg:mt-0">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[200/190] w-full max-w-[500px] ml-auto">
              <img 
                src={mainImg} 
                alt="Industrial Colors" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute -left-6 lg:-left-12 top-12 w-40 h-40 sm:w-50 sm:h-50 rounded-xl overflow-hidden border-white shadow-xl z-20 hidden sm:block">
              <img 
                src={secondaryImg} 
                alt="Textile Fabrics" 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 lg:-bottom-12 -left-4 sm:left-4 lg:-left-12 right-0 sm:right-auto bg-white p-4 sm:py-5 sm:px-6 rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-30 border border-slate-50">
              <div className="flex items-center justify-between gap-3 sm:gap-5 divide-x divide-slate-100">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-2.5">
                    <Award className="w-5 h-5 text-amber-500" strokeWidth={2} />
                  </div>
                  <span className="font-extrabold text-[24px] sm:text-[28px] text-primary-dark leading-none mb-1">25+</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">Years<br/>Exp.</span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center flex-1 px-3 sm:px-6">
                  <div className="w-12 h-12 rounded-full bg-[#fce8f4] flex items-center justify-center mb-2.5">
                    <Factory className="w-5 h-5 text-[#dd0595]" strokeWidth={2} />
                  </div>
                  <span className="font-extrabold text-[24px] sm:text-[28px] text-primary-dark leading-none mb-1">2</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">Mfg Units</span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center flex-1 px-3 sm:px-6">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2.5">
                    <Gem className="w-5 h-5 text-[#ff3333]" strokeWidth={2} />
                  </div>
                  <span className="font-extrabold text-[24px] sm:text-[28px] text-primary-dark leading-none mb-1">100%</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">Quality</span>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
