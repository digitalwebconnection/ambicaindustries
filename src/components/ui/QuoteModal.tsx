import { useState, type FormEvent } from 'react';
import { X, ArrowRight, User, Mail, MapPin, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO = '/logo2.png';

interface QuoteModalProps {
  onClose: () => void;
}

export default function QuoteModal({ onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left - Branding / Visual */}
          <div className="lg:w-2/5 relative p-8 lg:p-12 flex flex-col justify-between overflow-hidden min-h-[250px] lg:min-h-[500px]">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-slate-200/90 z-0 backdrop-blur-[4px]" />
            
            <div className="relative z-10">
              <img src={LOGO} alt="Ambica Industry" className="h-16 lg:h-20 mb-8" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight tracking-wide">
                Let's build something brilliant together.
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                Get the best quotes for premium dyes and colors. Our expert team will review your requirements and respond within 24 hours.
              </p>
            </div>

            <div className="relative z-10 hidden lg:block">
              <div className="flex items-center gap-4 text-slate-600 text-sm font-medium">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                </div>
                <span>Trusted by 500+ clients</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 bg-white relative">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Request Received!</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Thank you for reaching out. We've received your request and will get back to you with a detailed quote shortly.
                </p>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-800">Request A Quote</h3>
                  <p className="text-slate-500 text-sm mt-1">Fill out the form below and we'll get right back to you.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <MapPin size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden rounded-xl bg-primary text-white font-medium py-3.5 text-sm transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
