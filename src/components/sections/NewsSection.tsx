import { motion, type Variants } from 'framer-motion';
import { newsItems } from '../../data/news';
import { ArrowRight } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function NewsSection() {
  return (
    <section className="py-8 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              <span className="h-[2px] w-10 bg-[#003A7C] rounded-full" />
              <span className="text-[#003A7C] font-bold text-sm uppercase tracking-widest">
                News & Insights
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-[#003A7C] leading-[1.1] mb-2">
              Latest Updates & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
                Industry Perspectives
              </span>
            </motion.h2>
          </div>
          
          <motion.div variants={fadeUp} className="hidden md:block pb-2">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-2.5 bg-[#003A7C] text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-[#003A7C]/20 hover:shadow-accent-red/30"
            >
              View All News
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Minimalist Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsItems.map((item, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="group  flex flex-col border border-slate-200 rounded-xl overflow-hidden shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-[#003A7C]/10 transition-all duration-300 bg-white"
            >
              {/* Flat Image Container without shadows */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden shrink-0 border-b border-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
              </div>

              {/* Clean Typography Content */}
              <div className="flex flex-col flex-1 p-6 lg:p-8">
                {/* Meta Information (Date & Author) */}
                <div className="flex items-center gap-3 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="text-[#003A7C]">{item.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>By {item.author}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-extrabold text-[#003A7C] mb-4 leading-tight group-hover:text-accent-red transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-2 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mt-12 flex justify-center md:hidden"
        >
          <a
            href="#"
            className="group flex items-center justify-center gap-2 w-full py-4 bg-[#003A7C] text-white rounded-full font-semibold text-[15px] hover:bg-accent-red transition-all duration-300 shadow-xl shadow-[#003A7C]/20 hover:shadow-accent-red/30"
          >
            View All News
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
