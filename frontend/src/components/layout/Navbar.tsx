import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { quickNavItems } from '@/data/navigation';
import { productCategories } from '@/data/products';
import { siteConfig } from '@/data/siteConfig';

const LOGO = '/logo2.png';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const rafRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const productsTimeoutRef = useRef<number | null>(null);

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current !== null) {
      clearTimeout(productsTimeoutRef.current);
      productsTimeoutRef.current = null;
    }
    setDesktopProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = window.setTimeout(() => {
      setDesktopProductsOpen(false);
    }, 200);
  };

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

  // Close mobile drawer and desktop dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setDesktopProductsOpen(false);
  }, [location]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false);
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileOpen]);

  // Throttled scroll handler using RAF — fires at most once per frame
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
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
        className={`w-full z-40 transition-all duration-300 ${scrolled
          ? 'fixed top-0 left-0 right-0 sm:top-4'
          : 'relative bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]'
          }`}
      >
        {/* Modern Designed 50/50 Dual-Accent Line when scrolled on mobile */}
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-0.75 flex items-center z-20 overflow-hidden sm:hidden shadow-xs pointer-events-none">
            <div className="w-1/2 h-full bg-linear-to-r from-red-600 via-accent-red to-accent-red-dark" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 bg-linear-to-r from-red-400 via-white to-sky-300 -skew-x-25 shadow-sm z-30" />
            <div className="w-1/2 h-full bg-linear-to-r from-primary-dark via-primary to-sky-500" />
          </div>
        )}

        <nav
          className={`mx-auto transition-all duration-300 ease-out ${scrolled
            ? 'w-full sm:w-[98%] max-w-7xl bg-white/95 backdrop-blur-md border-b sm:border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-none sm:rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3'
            : 'max-w-7xl border border-transparent px-4 sm:px-6 lg:px-8 py-3 lg:py-4'
            }`}
          style={{ willChange: scrolled ? 'auto' : 'transform' }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={() => handleLinkClick('/#home')} className="shrink-0 flex items-center group relative z-10">
              <img
                src={LOGO}
                alt="Ambica Industry"
                className={`w-auto relative z-10 transition-all duration-300 ${scrolled ? 'h-9 sm:h-10 lg:h-12' : 'h-10 sm:h-12 lg:h-16'}`}
              />
            </Link>

            {/* Desktop Nav */}
            <div className={`hidden lg:flex items-center transition-all duration-300 ${scrolled ? 'gap-1' : 'gap-2'}`}>
              {quickNavItems.map((item) => {
                if (item.label === 'Contact Us') {
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

                // Products Dropdown Mega Menu for Desktop
                if (item.label === 'Products') {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={handleProductsEnter}
                      onMouseLeave={handleProductsLeave}
                    >
                      <Link
                        to="/products"
                        onClick={() => {
                          handleLinkClick('/products');
                          setDesktopProductsOpen(false);
                        }}
                        className={`relative inline-flex items-center gap-1.5 px-4 py-2 text-[15px] font-semibold transition-colors duration-300 group ${isActive ? 'text-accent-red' : 'text-slate-700 hover:text-accent-red'
                          }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${desktopProductsOpen ? 'rotate-180 text-accent-red' : 'text-slate-400 group-hover:text-accent-red'
                            }`}
                        />
                        {scrolled ? (
                          <span
                            className={`absolute inset-0 bg-accent-red/5 rounded-full scale-50 opacity-0 transition-all duration-300 ease-out ${isActive ? 'scale-100 opacity-100' : 'group-hover:scale-100 group-hover:opacity-100'
                              }`}
                          />
                        ) : (
                          <span
                            className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent-red origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                              }`}
                          />
                        )}
                      </Link>

                      {/* Desktop Product Grid Mega Menu */}
                      <AnimatePresence>
                        {desktopProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto w-190"
                          >
                            <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(6,64,140,0.18)] border border-slate-200/90 p-5 overflow-hidden">
                              {/* Header inside dropdown */}
                              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-accent-red" />
                                  <span className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                    Product Categories & Formulations
                                  </span>
                                </div>
                                <Link
                                  to="/products"
                                  onClick={() => setDesktopProductsOpen(false)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-red hover:text-accent-red-dark transition-colors"
                                >
                                  <span>View All Categories</span>
                                  <ChevronRight size={13} />
                                </Link>
                              </div>

                              {/* Product Grid: 5 Categories */}
                              <div className="grid grid-cols-5 gap-3">
                                {productCategories.map((cat) => (
                                  <Link
                                    key={cat.slug}
                                    to={`/products/${cat.slug}`}
                                    onClick={() => setDesktopProductsOpen(false)}
                                    className="group/item flex flex-col rounded-xl overflow-hidden p-2 hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200/80 hover:shadow-md"
                                  >
                                    <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-slate-100 mb-2">
                                      <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500 ease-out"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-primary/10 group-hover/item:opacity-0 transition-opacity" />
                                    </div>
                                    <h4 className="font-bold text-[13px] text-primary-dark group-hover/item:text-accent-red transition-colors line-clamp-1 mb-0.5">
                                      {cat.name}
                                    </h4>
                                    <p className="text-[11px] text-slate-400 font-medium">
                                      {cat.subProducts.length} types
                                    </p>
                                  </Link>
                                ))}
                              </div>

                              {/* Footer */}
                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/80 -mx-5 -mb-5 px-5 py-3">
                                <span className="text-slate-500 font-medium">
                                  Looking for custom color formulation or technical specs?
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDesktopProductsOpen(false);
                                    window.dispatchEvent(new Event('openQuoteModal'));
                                  }}
                                  className="font-bold text-accent-red hover:text-accent-red-dark transition-colors cursor-pointer"
                                >
                                  Get a Free Sample →
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (scrolled) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`relative px-4 py-2 text-[15px] font-semibold transition-colors duration-300 group ${isActive ? 'text-accent-red' : 'text-slate-700 hover:text-accent-red'
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
                    className={`relative px-4 py-2 text-[15px] font-semibold transition-colors duration-300 group ${isActive ? 'text-accent-red' : 'text-slate-700 hover:text-accent-red'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent-red origin-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions: Sample CTA + Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event('openQuoteModal'));
                }}
                className="inline-flex items-center justify-center text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-accent-red text-white shadow-md shadow-accent-red/25 hover:bg-accent-red-dark active:scale-95 transition-all"
              >
                Free Sample
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-10 p-2 sm:p-2.5 rounded-xl bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-accent-red active:scale-95 transition-all duration-200"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer when navbar is fixed to prevent layout jump */}
      <div className={`${scrolled ? 'block' : 'hidden'} h-15 sm:h-20 lg:h-24`} />

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-100 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 bottom-0 w-[86%] sm:w-96 max-w-full bg-white shadow-2xl flex flex-col overflow-hidden border-l border-slate-200/60"
            >
              {/* Modern Designed Dual-Accent Line */}
              <div className="h-0.75 w-full flex items-center relative overflow-hidden shrink-0 shadow-xs">
                <div className="w-1/2 h-full bg-linear-to-r from-red-600 via-accent-red to-accent-red-dark" />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 bg-linear-to-r from-red-400 via-white to-sky-300 -skew-x-25 shadow-sm z-20" />
                <div className="w-1/2 h-full bg-linear-to-r from-primary-dark via-primary to-sky-500" />
              </div>

              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-slate-50/50">
                <Link to="/" onClick={() => handleLinkClick('/#home')} className="flex items-center gap-2">
                  <img src={LOGO} alt="Ambica Industry" className="h-9 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-400 hover:text-accent-red hover:bg-red-50 rounded-full transition-colors active:scale-95"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-1">
                {quickNavItems.map((item) => {
                  const isActive = checkIsActive(item.href);

                  // Expandable Products Accordion for Mobile
                  if (item.label === 'Products') {
                    return (
                      <div key={item.href} className="rounded-xl overflow-hidden bg-slate-50/70 border border-slate-100">
                        <div className="flex items-center justify-between">
                          <Link
                            to="/products"
                            onClick={() => handleLinkClick('/products')}
                            className={`flex-1 px-4 py-3 text-[15px] font-semibold transition-colors ${isActive ? 'text-accent-red' : 'text-slate-800 hover:text-accent-red'
                              }`}
                          >
                            Products
                          </Link>
                          <button
                            type="button"
                            onClick={() => setProductsOpen((prev) => !prev)}
                            className="p-3 text-slate-500 hover:text-accent-red transition-transform duration-200"
                            aria-label="Toggle products categories"
                            aria-expanded={productsOpen}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${productsOpen ? 'rotate-180 text-accent-red' : ''}`}
                            />
                          </button>
                        </div>

                        {/* Collapsible Subcategories */}
                        <AnimatePresence initial={false}>
                          {productsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden border-t border-slate-200/60 bg-white"
                            >
                              <div className="py-1.5 px-3 space-y-0.5">
                                <Link
                                  to="/products"
                                  onClick={() => handleLinkClick('/products')}
                                  className="flex items-center justify-between px-3 py-2 text-xs font-bold text-accent-red rounded-lg hover:bg-red-50/60 transition-colors"
                                >
                                  View All Categories
                                  <ChevronRight size={14} />
                                </Link>
                                {productCategories.map((cat) => (
                                  <Link
                                    key={cat.slug}
                                    to={`/products/${cat.slug}`}
                                    onClick={() => handleLinkClick(`/products/${cat.slug}`)}
                                    className="flex items-center justify-between px-3 py-2 text-[13.5px] font-medium text-slate-600 hover:text-accent-red hover:bg-slate-50 rounded-lg transition-colors"
                                  >
                                    <span>{cat.name}</span>
                                    <span className="text-[11px] text-slate-400 font-normal">
                                      {cat.subProducts.length} types
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => handleLinkClick(item.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${isActive
                        ? 'bg-accent-red/10 text-accent-red'
                        : 'text-slate-800 hover:bg-slate-50 hover:text-accent-red'
                        }`}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                      ) : (
                        <ChevronRight size={16} className="text-slate-300" />
                      )}
                    </Link>
                  );
                })}

                {/* Direct Contact Card inside Mobile Menu */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-1">
                    Direct Contact
                  </div>

                  <div className="space-y-1.5">
                    <a
                      href={`tel:${siteConfig.phone.shailesh.tel}`}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-red-50/50 text-slate-700 hover:text-accent-red text-[13px] font-medium transition-colors"
                    >
                      <Phone size={15} className="text-accent-red shrink-0" />
                      <span className="truncate">{siteConfig.phone.shailesh.fullNumber}</span>
                    </a>

                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-red-50/50 text-slate-700 hover:text-accent-red text-[13px] font-medium transition-colors"
                    >
                      <Mail size={15} className="text-accent-red shrink-0" />
                      <span className="truncate">{siteConfig.email}</span>
                    </a>

                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[13px] font-semibold transition-colors"
                    >
                      <MessageCircle size={15} className="text-emerald-600 shrink-0" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer Sticky Footer with CTA */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0">
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#quote')}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-accent-red hover:bg-accent-red-dark text-white font-semibold text-[15px] shadow-lg shadow-accent-red/25 active:scale-98 transition-all"
                >
                  <span>Get a Free Sample</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

