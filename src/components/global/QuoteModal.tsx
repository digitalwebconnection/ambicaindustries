import { useState, useEffect, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from 'react';
import { X, ArrowRight, User, Mail, MapPin, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FieldError from '@/components/ui/FieldError';
import { siteConfig } from '@/data/siteConfig';
import { validateStandardField } from '@/utils/validation';
import quoteBg from '@/assets/images/quote/quote-bg.webp';
import avatar1 from '@/assets/images/avatars/avatar-1.webp';
import avatar2 from '@/assets/images/avatars/avatar-2.webp';
import avatar3 from '@/assets/images/avatars/avatar-3.webp';

const LOGO = '/logo2.png';

interface QuoteModalProps {
  onClose: () => void;
}

export default function QuoteModal({ onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  // Prevent background scroll when modal is open on mobile
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const validateField = (name: string, value: string): string | null => {
    return validateStandardField(name, value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name] || errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) next[name] = err;
        else delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[name] = err;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ARCHITECTURE NOTE:
    // Client-side validation is strictly for immediate user experience (UX) and accessibility.
    // Authoritative validation, honeypot verification, rate limiting, and spam filtering
    // MUST be executed on the backend server endpoint (e.g., POST /api/quote).
    // See server_validation_and_spam_protection_plan.md for the complete multi-layer plan.

    // Honeypot bot protection: if filled, drop silently (fake success to mislead automated scrapers)
    if (honeypot.trim() !== '') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(onClose, 1200);
      }, 500);
      return;
    }

    const fieldsToValidate = ['name', 'email', 'city', 'phone', 'message'] as const;
    const nextErrors: Record<string, string> = {};

    fieldsToValidate.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) nextErrors[f] = err;
    });

    setTouched({
      name: true,
      email: true,
      city: true,
      phone: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = fieldsToValidate.find((f) => nextErrors[f]);
      if (firstInvalid && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
        el?.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = new FormData();
      payload.append('access_key', siteConfig.web3FormsAccessKey);
      payload.append(
        'subject',
        `New Instant Quote Request from ${formData.name} - Ambica Industry`
      );
      payload.append('from_name', 'Ambica Industry Website');
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('city', formData.city || 'Not specified');
      payload.append('phone', formData.phone);
      payload.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          city: '',
          phone: '',
          message: '',
        });
        setHoneypot('');
        setTouched({});
        setTimeout(onClose, 2500);
      } else {
        setIsSubmitting(false);
        setSubmitError(data.message || 'Failed to submit quote request. Please try again.');
      }
    } catch (err) {
      console.error('Quote modal submission error:', err);
      setIsSubmitting(false);
      setSubmitError('Failed to send request. Please check your network connection.');
    }
  };

  const getInputClass = (fieldName: string) =>
    `w-full pl-9 pr-3.5 py-2.5 sm:py-3 rounded-xl outline-none transition-all text-[16px] sm:text-sm ${
      errors[fieldName]
        ? 'border border-red-500 bg-red-50/40 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-red-200'
        : 'bg-slate-100 border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red'
    }`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
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
          className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 my-auto"
          data-lenis-prevent
        >
          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-500 hover:text-slate-800 items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Left - Branding / Visual */}
          <div className="hidden md:flex md:w-2/5 relative p-6 lg:p-10 flex-col justify-between overflow-hidden min-h-110 lg:min-h-125">
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: `url(${quoteBg})` }}
            />
            <div className="absolute inset-0 bg-slate-200/90 z-0 backdrop-blur-xs" />
            
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
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src={avatar1} alt="Avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src={avatar2} alt="Avatar" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src={avatar3} alt="Avatar" />
                </div>
                <span>Trusted by 500+ clients</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-3/5 p-4 sm:p-7 lg:p-10 bg-white relative overflow-y-auto overscroll-contain max-h-[90vh] md:max-h-none flex flex-col justify-start md:justify-center">
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
              <div className="h-full flex flex-col justify-start md:justify-center pb-2 sm:pb-0">
                {/* Header (with mobile close button inline) */}
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-5 pb-2.5 sm:pb-0 border-b sm:border-b-0 border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1 md:hidden">
                      <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center p-1 shrink-0">
                        <img src={LOGO} alt="Ambica Industry" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Ambica Industry</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-800 leading-tight">Request A Quote</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                      Get a custom quote within 24 hours.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="md:hidden w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-4">
                  {/* Honeypot field for bot/spam protection (hidden from humans) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your Name *"
                          aria-invalid={!!errors.name}
                          className={getInputClass('name')}
                        />
                      </div>
                      <FieldError error={errors.name} />
                    </div>

                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                          <Mail size={15} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Email Address *"
                          aria-invalid={!!errors.email}
                          className={getInputClass('email')}
                        />
                      </div>
                      <FieldError error={errors.email} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                          <MapPin size={15} />
                        </div>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="City"
                          aria-invalid={!!errors.city}
                          className={getInputClass('city')}
                        />
                      </div>
                      <FieldError error={errors.city} />
                    </div>

                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                          <Phone size={15} />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Phone Number *"
                          aria-invalid={!!errors.phone}
                          className={getInputClass('phone')}
                        />
                      </div>
                      <FieldError error={errors.phone} />
                    </div>
                  </div>

                  <div>
                    <div className="relative group">
                      <div className="absolute top-2.5 sm:top-3 left-0 pl-3 flex items-start pointer-events-none text-slate-400 group-focus-within:text-accent-red transition-colors">
                        <MessageSquare size={15} />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about your requirements... *"
                        rows={2}
                        aria-invalid={!!errors.message}
                        className={`${getInputClass('message')} resize-none min-h-14.5 sm:min-h-18.75`}
                      />
                    </div>
                    <FieldError error={errors.message} />
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
                      <span className="leading-relaxed">{submitError}</span>
                    </div>
                  )}

                  <div className="pt-0.5 sm:pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden rounded-xl bg-accent-red hover:bg-accent-red-dark text-white font-semibold py-2.5 sm:py-3.5 text-sm transition-all hover:shadow-[0_4px_20px_rgba(211,2,2,0.35)] active:scale-[0.99] disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
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
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

