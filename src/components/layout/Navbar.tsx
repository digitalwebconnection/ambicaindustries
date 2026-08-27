import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { quickNavItems } from '../../data/navigation';

const LOGO = '/logo2.png';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const rafRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);

  const checkIsActive = useCallback((href: string) => {
    if (href === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1);
    }
    return location.pathname.startsWith(href);
  }, [location]);

  const handleLinkClick = (href: string) => {
    if (href === '/#quote') {
      window.dispatchEvent(new Event('openQuoteModal'));
      setMobileOpen(false);
      return;
    }

    if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (location.pathname === '/' && location.hash === `#${id}`) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (href === '/') {
      if (location.pathname === '/' && !location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Throttled scroll handler using RAF — fires at most once per frame
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return; // Already scheduled
      rafRef.current = requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 40;
        if (isScrolled !== scrolledRef.current) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div 
        className={`w-full z-40 ${
          scrolled 
            ? 'fixed top-0 sm:top-4 left-0 right-0' 
            : 'relative bg-white border-t-[1px] border-accent-red shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]'
        }`}
      >
        <nav
          className={`mx-auto transition-all duration-500 ease-out ${
            scrolled 
              ? 'w-[98%] max-w-7xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl sm:rounded-full px-6 md:px-8 py-2 sm:py-3' 
              : 'max-w-7xl border border-transparent px-4 lg:px-8 py-3 lg:py-4'
          }`}
          style={{ willChange: scrolled ? 'auto' : 'transform' }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/#home" onClick={() => handleLinkClick('/#home')} className="shrink-0 flex items-center group relative z-10">
              <img 
                src={LOGO} 
                alt="Ambica Industry" 
                className={`w-auto relative z-10 transition-all duration-300 ${scrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-16'}`} 
              />
            </Link>

            {/* Desktop Nav */}
            <div className={`hidden lg:flex items-center transition-all duration-300 ${
              scrolled ? 'gap-1' : 'gap-2'
            }`}>
              {quickNavItems.map((item) => {
                if (item.label === 'Get a Free Sample') {
                  return (
                    <span key={item.href} className="ml-4">
                      <Link
                        to={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-2.5 font-medium text-white shadow-lg shadow-accent-red/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent-red/40 active:scale-95 bg-accent-red hover:bg-accent-red-dark"
                      >
                        <span className="relative flex items-center gap-2 text-[15px] font-semibold tracking-wide">
                          {item.label}
                          <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </span>
                  );
                }

                const isActive = checkIsActive(item.href);

                if (scrolled) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`relative px-4 py-2 text-[15px] font-semibold transition-colors duration-300 group ${
                        isActive ? 'text-accent-red' : 'text-slate-700 hover:text-accent-red'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span 
                        className={`absolute inset-0 bg-accent-red/5 rounded-full scale-50 opacity-0 transition-all duration-300 ease-out
                          ${isActive ? 'scale-100 opacity-100' : 'group-hover:scale-100 group-hover:opacity-100'}
                        `} 
                      />
                    </Link>
                  );
                }

                // UN-SCROLLED STATE (MODERN INDUSTRIAL)
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`relative px-4 py-2 text-[15px] font-semibold transition-colors duration-300 group ${
                      isActive ? 'text-accent-red' : 'text-slate-700 hover:text-accent-red'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span 
                      className={`absolute bottom-0 left-4 right-4 h-[2px] bg-accent-red origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `} 
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 p-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Spacer when navbar is fixed */}
      {scrolled && <div className="h-[70px] lg:h-[95px]" />}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-900/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-white overflow-y-auto shadow-2xl rounded-l-3xl border-l border-white/20"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-slate-100/50">
                  <Link to="/#home" onClick={() => handleLinkClick('/#home')}>
                    <img src={LOGO} alt="Ambica Industry" className="h-12" />
                  </Link>
                  <button 
                    onClick={() => setMobileOpen(false)} 
                    className="p-2.5 bg-slate-50 text-slate-500 hover:text-accent-red hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 py-6 px-4 flex flex-col gap-2">
                  {quickNavItems.map((item) => {
                    if (item.label === 'Get a Free Sample') return null;
                    const isActive = checkIsActive(item.href);
                    
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => handleLinkClick(item.href)}
                        className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[16px] font-semibold transition-all duration-300 ${
                          isActive 
                            ? 'bg-accent-red/10 text-accent-red' 
                            : 'text-slate-700 hover:bg-slate-50 hover:text-accent-red'
                        }`}
                      >
                        {item.label}
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />}
                      </Link>
                    );
                  })}
                </div>

                <div className="p-6 mt-auto border-t border-slate-100/50">
                  <Link
                    to="/#quote"
                    onClick={() => handleLinkClick('/#quote')}
                    className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-accent-red hover:bg-accent-red-dark text-white font-semibold text-lg shadow-lg shadow-accent-red/30 active:scale-95 transition-all"
                  >
                    Get a Free Sample <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
