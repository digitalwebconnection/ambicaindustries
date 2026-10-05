import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../../data/siteConfig";
import { useState, useRef } from "react";
import FieldError from "../../../components/ui/FieldError";
import { validateStandardField } from "../../../utils/validation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | null => {
    return validateStandardField(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Re-validate if field was touched or has an active error
    if (touched[name] || errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) {
          next[name] = err;
        } else {
          delete next[name];
        }
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) {
        next[name] = err;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nextErrors: Record<string, string> = {};
    const fieldsToValidate = ["firstName", "lastName", "email", "phone", "message"] as const;

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        nextErrors[field] = err;
      }
    });

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Focus first error field
      const firstErrorField = fieldsToValidate.find((f) => nextErrors[f]);
      if (firstErrorField && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
        el?.focus();
      }
      return;
    }

    setErrors({});
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setTouched({});
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-8 md:py-14 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-125 h-125 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(211, 2, 2, 0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 58, 124, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
        >
          {/* Left Side: Contact Info */}
          <motion.div variants={fadeUp} className="max-w-lg">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-primary-dark rounded-full" />
              <span className="text-primary-dark font-bold text-xs uppercase tracking-widest">
                Get In Touch
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-dark leading-[1.15] mb-5">
              Let's Discuss Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-red to-accent-red-dark">
                Dyeing Requirements
              </span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
              Whether you need custom dye matching, bulk orders, or technical support, our team of experts is here to help you find the perfect solution.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent-red" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-primary-dark mb-1.5">Call & WhatsApp</h4>
                  <p className="text-slate-600 text-sm mb-1">
                    <span className="font-semibold text-slate-700">Office:</span>{' '}
                    <a href={`tel:${siteConfig.phone.landline}`} className="hover:text-accent-red transition-colors">
                      {siteConfig.phone.landline}
                    </a>
                  </p>
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <span>
                      <span className="font-semibold text-slate-700">Shailesh Shah:</span>{' '}
                      <a href={`tel:${siteConfig.phone.shailesh.tel}`} className="hover:text-accent-red transition-colors">
                        {siteConfig.phone.shailesh.number}
                      </a>
                    </span>
                    <a
                      href={siteConfig.phone.shailesh.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:scale-110 transition-transform"
                      title="WhatsApp Shailesh Shah"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <span>
                      <span className="font-semibold text-slate-700">Samir Shah:</span>{' '}
                      <a href={`tel:${siteConfig.phone.samir.tel}`} className="hover:text-accent-red transition-colors">
                        {siteConfig.phone.samir.number}
                      </a>
                    </span>
                    <a
                      href={siteConfig.phone.samir.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:scale-110 transition-transform"
                      title="WhatsApp Samir Shah"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-dark/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-dark" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-primary-dark mb-1">Email Us</h4>
                  <a href={`mailto:${siteConfig.email}`} className="text-slate-600 text-sm hover:text-accent-red transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-dark/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-dark" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-primary-dark mb-1">Head Office</h4>
                  <a
                    href={siteConfig.addresses.office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 text-sm leading-relaxed max-w-sm block hover:text-accent-red transition-colors"
                  >
                    {siteConfig.addresses.office.text}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div variants={fadeUp} className="relative">
            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,58,124,0.08)] border border-slate-300 p-6 md:p-8 relative z-20">
              <h3 className="text-xl font-bold text-primary-dark mb-6">Send a Message</h3>
              
              {formStatus === "success" && (
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Message Sent Successfully!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Thank you for contacting us. Our team will review your inquiry and get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="home-firstName" className="text-xs font-semibold text-slate-700">
                      First Name <span className="text-accent-red">*</span>
                    </label>
                    <input 
                      id="home-firstName"
                      name="firstName"
                      type="text" 
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John" 
                      aria-invalid={!!errors.firstName}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none ${
                        errors.firstName
                          ? "bg-red-50/40 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "bg-slate-50 border border-slate-200 focus:border-primary-dark focus:ring-1 focus:ring-[#003A7C]"
                      }`}
                    />
                    <FieldError error={errors.firstName} />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="home-lastName" className="text-xs font-semibold text-slate-700">Last Name</label>
                    <input 
                      id="home-lastName"
                      name="lastName"
                      type="text" 
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Doe" 
                      aria-invalid={!!errors.lastName}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none ${
                        errors.lastName
                          ? "bg-red-50/40 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "bg-slate-50 border border-slate-200 focus:border-primary-dark focus:ring-1 focus:ring-[#003A7C]"
                      }`}
                    />
                    <FieldError error={errors.lastName} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="home-email" className="text-xs font-semibold text-slate-700">
                    Email Address <span className="text-accent-red">*</span>
                  </label>
                  <input 
                    id="home-email"
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com" 
                    aria-invalid={!!errors.email}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none ${
                      errors.email
                        ? "bg-red-50/40 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "bg-slate-50 border border-slate-200 focus:border-primary-dark focus:ring-1 focus:ring-[#003A7C]"
                    }`}
                  />
                  <FieldError error={errors.email} />
                </div>

                <div className="space-y-1">
                  <label htmlFor="home-phone" className="text-xs font-semibold text-slate-700">
                    Phone Number <span className="text-accent-red">*</span>
                  </label>
                  <input 
                    id="home-phone"
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+91 90000 00000" 
                    aria-invalid={!!errors.phone}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none ${
                      errors.phone
                        ? "bg-red-50/40 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "bg-slate-50 border border-slate-200 focus:border-primary-dark focus:ring-1 focus:ring-[#003A7C]"
                    }`}
                  />
                  <FieldError error={errors.phone} />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="home-message" className="text-xs font-semibold text-slate-700">
                      Your Message <span className="text-accent-red">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {formData.message.length} chars (min 10)
                    </span>
                  </div>
                  <textarea 
                    id="home-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your dyeing or product requirements..." 
                    aria-invalid={!!errors.message}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm transition-all outline-none resize-none ${
                      errors.message
                        ? "bg-red-50/40 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "bg-slate-50 border border-slate-200 focus:border-primary-dark focus:ring-1 focus:ring-[#003A7C]"
                    }`}
                  ></textarea>
                  <FieldError error={errors.message} />
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 bg-primary-dark hover:bg-[#002855] text-white rounded-lg font-bold text-sm transition-all duration-300 disabled:opacity-70 cursor-pointer shadow-md hover:shadow-lg"
                >
                  {formStatus === "submitting" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </div>
                  ) : formStatus === "success" ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={16} /> Sent Successfully!
                    </span>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            </div>

            {/* Decorative Offset Block */}
            <div className="absolute top-6 -right-4 w-full h-full bg-accent-red rounded-3xl z-10 opacity-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-dark rounded-full z-10 opacity-5 blur-xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
