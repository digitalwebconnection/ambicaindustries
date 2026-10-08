import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_STORAGE_KEY = 'ambica_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Delay showing banner slightly to avoid jarring page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked by private browsing mode
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          choice: 'all',
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // fallback
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          choice: 'essential',
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // fallback
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          choice: 'dismissed',
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // fallback
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-50 sm:max-w-md w-auto"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,40,85,0.18)] text-slate-700">
            {/* Top Row: Icon + Title + Close Button */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-accent-red/10 text-accent-red flex items-center justify-center shrink-0">
                  <Cookie size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary-dark">
                    Cookie &amp; Privacy Choices
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck size={12} className="text-emerald-600" />
                    <span>Secure &amp; GDPR Compliant</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Dismiss cookie notice"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We use essential cookies to maintain site security, optimize performance, and understand how you interact with our catalog. Read our{' '}
              <Link
                to="/privacy-policy"
                onClick={() => setIsVisible(false)}
                className="text-accent-red underline hover:text-accent-red-dark font-medium transition-colors"
              >
                Privacy Policy
              </Link>{' '}
              for details.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2 bg-accent-red hover:bg-accent-red-dark text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer text-center"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-95 cursor-pointer text-center"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
