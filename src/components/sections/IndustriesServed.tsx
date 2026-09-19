import { motion, type Variants } from 'framer-motion';
import { industries } from '../../data/industries';
import { Shirt, Home, Hexagon, Package, Printer, Droplet, Layers, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'apparel & fashion':
      return <Shirt className="w-7 h-7" />;
    case 'home textiles':
      return <Home className="w-7 h-7" />;
    case 'technical textiles':
      return <Hexagon className="w-7 h-7" />;
    case 'paper packaging':
      return <Package className="w-7 h-7" />;
    case 'printing paper':
      return <Printer className="w-7 h-7" />;
    case 'tissue & towel':
      return <Droplet className="w-7 h-7" />;
    case 'non-woven fabrics':
      return <Layers className="w-7 h-7" />;
    case 'specialty paper':
      return <Sparkles className="w-7 h-7" />;
    default:
      return <Droplet className="w-7 h-7" />;
  }
};

export default function IndustriesServed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        // Find the width of a single card + the gap (approx 24px)
        const firstCard = container.children[0] as HTMLElement;
        const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 400;
        
        let nextScroll = container.scrollLeft + cardWidth;
        
        // If we reach the end of the scroll area, rewind smoothly to the start
        if (nextScroll >= container.scrollWidth - container.clientWidth - 10) {
          nextScroll = 0;
        }
        
        container.scrollTo({
          left: nextScroll,
          behavior: 'smooth'
        });
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-14 bg-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253, 195, 1, 0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217, 23, 156, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-4 mb-5">
            <span className="h-[2px] w-10 bg-primary rounded-full" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest">
              Global Reach
            </span>
          </motion.div>
          <motion.h2 
            variants={fadeUp} 
            className="text-3xl md:text-5xl font-extrabold text-primary-dark leading-[1.1] mb-2"
          >
            Industries We {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
               Empower
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className="mt-4 text-slate-600 max-w-7xl mx-auto text-lg"
          >
            Delivering precision, performance, and unparalleled color consistency across a diverse range of global sectors.
          </motion.p>
        </motion.div>

        {/* Stepping Carousel Slider */}
        <div className="relative w-full ">
          {/* Gradient Edges for smooth fade-in/out effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
          
          <div 
            ref={scrollRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pt-2 pb-6 -mt-5 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...industries, ...industries].map((industry, idx) => (
              <div
                key={`${industry.name}-${idx}`}
                className="snap-start group relative h-97 w-[90%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 rounded-xl overflow-hidden  bg-white shadow-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Background Image */}
                <img
                  src={industry.image}
                  alt={industry.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110  "
                />

                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="flex items-center gap-4 mb-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-accent-red group-hover:border-accent-red transition-colors duration-500 shadow-lg shrink-0">
                      {getIcon(industry.name)}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors duration-500 leading-tight">
                      {industry.name}
                    </h3>
                  </div>
                  
                  {/* Hover Reveal Text */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pb-2">
                        Tailored color solutions meeting the highest global standards for {industry.name.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Hover Frame Effect */}
                <div className="absolute inset-4 rounded-xl border border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none z-20 scale-95 group-hover:scale-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
