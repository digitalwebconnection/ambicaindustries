import { useState, useEffect, type FormEvent } from 'react';
import { X, ArrowRight, User, Mail, MapPin, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO = '/logo2.png';

interface QuoteModalProps {
  onClose: () => void;
}

export default function QuoteModal({ onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background scroll when modal is open on mobile
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Left - Branding / Visual (Hidden on mobile to keep form compact and immediately accessible) */}
          <div className="hidden md:flex md:w-2/5 relative p-6 lg:p-10 flex-col justify-between overflow-hidden min-h-[440px] lg:min-h-[500px]">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-slate-200/90 z-0 backdrop-blur-[4px]" />
            
            <div className="relative z-10">
              <img src={LOGO} alt="Ambica Industry" className="h-14 lg:h-16 mb-6 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 mb-3 leading-tight tracking-wide">
                Let's build something brilliant together.
              </h2>
              <p className="text-slate-700 text-xs lg:text-sm leading-relaxed">
                Get the best quotes for premium dyes and colors. Our expert team will review your requirements and respond within 24 hours.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 text-slate-700 text-xs font-semibold">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                </div>
                <span>Trusted by 500+ clients</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-3/5 p-5 sm:p-7 lg:p-10 bg-white relative overflow-y-auto max-h-[92vh] md:max-h-none flex flex-col justify-center">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Request Received!</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Thank you for reaching out. We've received your request and will get back to you with a detailed quote shortly.
                </p>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col justify-center">
                <div className="mb-4 sm:mb-6 pr-8">
                  {/* Mobile Logo */}
                  <div className="mb-2 md:hidden">
                    <img src={LOGO} alt="Ambica Industry" className="h-9 object-contain" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Request A Quote</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    Fill out the form below and we'll get right back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                        <MapPin size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                      <MessageSquare size={16} />
                    </div>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      rows={3}
                      className="w-full pl-9 pr-3.5 py-2.5 sm:py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden rounded-xl bg-accent-red hover:bg-accent-red-dark text-white font-semibold py-3 sm:py-3.5 text-sm transition-all hover:shadow-[0_4px_20px_rgba(211,2,2,0.35)] active:scale-[0.99] disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Request
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
