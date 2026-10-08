import { motion, type Variants } from 'framer-motion';
import { industries } from '../../data/industries';
import { Shirt, Home, Hexagon, Package, Printer, Droplet, Layers, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const pausedRef = useRef(false);


  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !pausedRef.current) {
        const container = scrollRef.current;

        // Find the width of a single card + the gap
        const firstCard = container.children[0] as HTMLElement;
        const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 400;

        // Calculate the next scroll position
        let nextScroll = container.scrollLeft + cardWidth;

        // If we reach the end, go back to the beginning  
        if (
          nextScroll >=
          container.scrollWidth - container.clientWidth - 10
        ) {
          nextScroll = 0;
        }

        // Smoothly scroll to the next card
        container.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 3000);

    // Clear the interval when component is removed
    return () => clearInterval(interval);
  }, []);

  const scrollByCard = (direction: 'left' | 'right') => { 
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.children[0] as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 400;

    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    })

    pausedRef.current = true;
    setTimeout(() => {
      pausedRef.current = false;
    }, 4000)
  }

  return (
    <section className="py-8 md:py-8 bg-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-150 h-150 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253, 195, 1, 0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-150 h-150 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217, 23, 156, 0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
          className="text-center mb-8 sm:mb-14 md:mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
            <span className="h-0.5 w-8 sm:w-10 bg-primary rounded-full" />
            <span className="text-primary font-bold text-xs sm:text-sm uppercase tracking-widest">
              Global Reach
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold text-primary-dark leading-[1.15] md:leading-[1.1] mb-2"
          >
            Industries We {""}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-red to-accent-red-dark">
              Empower
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-2 sm:mt-4 text-slate-600 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg"
          >
            Delivering precision, performance, and unparalleled color consistency across a diverse range of global sectors.
          </motion.p>
        </motion.div>

        {/* Stepping Carousel Slider */}
        <div className="relative w-full ">
          {/* Gradient Edges for smooth fade-in/out effect */}
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-12 bg-linear-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 md:w-12 bg-linear-to-l from-white to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pt-2 pb-6 -mt-2 sm:-mt-5 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...industries, ...industries].map((industry, idx) => (
              <div
                key={`${industry.name}-${idx}`}
                className="snap-start group relative h-80 sm:h-97 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Background Image */}
                <img
                  src={industry.image}
                  alt={industry.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary-dark/95 via-primary-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content Container */}
                <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end z-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-accent-red group-hover:border-accent-red transition-colors duration-500 shadow-lg shrink-0">
                      {getIcon(industry.name)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                      {industry.name}
                    </h3>
                  </div>

                  {/* Hover Reveal Text */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/80 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pb-2">
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

          <div className='flex justify-center gap-2 mt-2'>
            <button
              onClick={() => scrollByCard('left')}
              aria-label='Previous Industry'
              className='w-9 h-9 sm:w-8 sm:h-8 text-slate-700 rounded-full bg-white border border-slate-300 shadow-sm flex justify-center items-center cursor-pointer hover:bg-accent-red hover:text-white hover:border-accent-red active:scale-90 duration-200 transition-all'
            >
              <ChevronLeft className='w-4 h-4' />
            </button>
            <button
              onClick={() => scrollByCard('right')}
              aria-label='Next Industry'
              className='w-9 h-9 sm:w-8 sm:h-8 text-slate-700 rounded-full bg-white border border-slate-300 shadow-sm flex justify-center items-center cursor-pointer hover:bg-accent-red hover:text-white hover:border-accent-red active:scale-90 duration-200 transition-all'
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
