import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { productCategories } from '@/data/products';

export default function ProductsHero() {
  // Mobile slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Filter 4 featured categories for the hero showcases
  const heroItems = [
    {
      category: productCategories[0],
      title: productCategories[0]?.name || 'Dye Colors',
      image: productCategories[0]?.image,
      overlay: 'bg-primary/20',
    },
    {
      category: productCategories[1],
      title: productCategories[1]?.name || 'Direct Dyes',
      image: productCategories[1]?.image,
      overlay: 'bg-accent-red/20',
    },
    {
      category: productCategories[2],
      title: productCategories[2]?.name || 'Reactive Dyes',
      image: productCategories[2]?.image,
      overlay: 'bg-accent-gold/20',
    },
    {
      category: productCategories[4] || productCategories[3],
      title: productCategories[4]?.name || productCategories[3]?.name || 'Color Formulations',
      image: productCategories[4]?.image || productCategories[3]?.image,
      overlay: 'bg-primary-dark/20',
    },
  ];

  // Auto slide with pause/stop on mobile ("one uper one sliding and stop")
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroItems.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, heroItems.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      // Swiped left
      setCurrentSlide((prev) => (prev + 1) % heroItems.length);
    } else if (diff < -45) {
      // Swiped right
      setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length);
    }
    touchStartX.current = null;
  };

  const scrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 550, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-14 md:pb-12 overflow-hidden bg-white border-b border-gray-100">
      {/* Professional Background Pattern & Elements */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2306408c\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} 
      />
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[10%] w-72 sm:w-120 h-72 sm:h-120 rounded-full bg-primary/5 blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-60 sm:w-[20rem] h-60 sm:h-80 rounded-full bg-accent-red/5 blur-[60px] sm:blur-[80px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          
          {/* Content (Bottom on mobile order-2, Left on desktop lg:order-1) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start text-left order-2 lg:order-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-primary-dark mb-3 sm:mb-4 leading-[1.15] tracking-tight">
              Discover Our Premium <br className="hidden sm:block lg:block" />
              <span className="text-accent-red relative inline-block mt-1">
                Dye Collections
                {/* Decorative underline */}
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/80 rounded-full transform -rotate-1" />
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-justify text-gray-text leading-relaxed max-w-lg mt-2 sm:mt-4">
              Explore our comprehensive range of high-performance colorants, carefully formulated for exceptional brilliance, fastness, and reliability across all industrial applications.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <a 
                href="#catalog" 
                onClick={scrollToCatalog} 
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-[0_8px_20px_rgba(6,64,140,0.25)] hover:shadow-[0_12px_25px_rgba(6,64,140,0.35)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
              >
                <span>Browse Catalog</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Mobile View: "One uper one sliding and stop" Interactive Slider (Shown only on mobile < lg) */}
          <div className="block lg:hidden order-1 w-full max-w-85 xs:max-w-[360px] mx-auto">
            <div 
              className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group select-none touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Stacked Images Animation */}
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={heroItems[currentSlide].image}
                    alt={heroItems[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle color grading tint */}
                  <div className={`absolute inset-0 ${heroItems[currentSlide].overlay} mix-blend-multiply pointer-events-none`} />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Slide Floating Title Badge */}
              <div className="absolute top-3 left-3 z-20">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary-dark font-bold text-xs shadow-md">
                  {heroItems[currentSlide].title}
                </span>
              </div>

              {/* Prev / Next Slide Touch Buttons */}
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm text-white flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroItems.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm text-white flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>

              {/* Pagination Dots (Sliding Indicator) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
                {heroItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide
                        ? 'w-5 h-1.5 bg-accent-red'
                        : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop View: Masonry Style Grid (Exactly unchanged on lg: and above) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block order-2 w-full max-w-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-linear-to-tr from-primary/10 to-accent-red/5 rounded-full blur-[60px] -z-10" />
            
            <div className="grid grid-cols-2 gap-4 h-95">
              {/* Column 1 */}
              <div className="flex flex-col gap-6 pt-8 h-full">
                <div className="w-full flex-[1.35] min-h-0 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                   <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                   <img 
                     src={productCategories[0]?.image} 
                     alt="Dye Colors" 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                   />
                </div>
                <div className="w-full flex-1 min-h-0 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                   <div className="absolute inset-0 bg-accent-red/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                   <img 
                     src={productCategories[1]?.image} 
                     alt="Industrial Dyes" 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                   />
                </div>
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col gap-6 pb-8 h-full">
                <div className="w-full flex-1 min-h-0 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                   <div className="absolute inset-0 bg-accent-gold/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                   <img 
                     src={productCategories[2]?.image} 
                     alt="Fabric Dyeing" 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                   />
                </div>
                <div className="w-full flex-[1.35] min-h-0 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white group relative">
                   <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                   <img 
                     src={productCategories[4]?.image || productCategories[3]?.image} 
                     alt="Color Mix" 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                   />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
