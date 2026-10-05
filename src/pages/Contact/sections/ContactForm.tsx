import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, CheckCircle2, RotateCcw } from "lucide-react";
import { siteConfig } from "../../../data/siteConfig";
import FieldError from "../../../components/ui/FieldError";
import { validateStandardField } from "../../../utils/validation";

const serviceOptions = [
  "Food Colors",
  "Textile Dyes",
  "Acid Dyes",
  "Direct Dyes",
  "Lake Colors",
  "Bulk Supply / Export",
  "Custom Colour Matching",
  "Technical Support",
];

const labelClasses =
  "block text-xs font-semibold capitalize tracking-wider text-slate-700";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | null => {
    return validateStandardField(name, value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToValidate = ["name", "company", "email", "phone", "service", "message"] as const;
    const nextErrors: Record<string, string> = {};

    fieldsToValidate.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) nextErrors[f] = err;
    });

    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      service: true,
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
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const getFieldClasses = (fieldName: string) =>
    `w-full rounded-lg border px-3.5 py-2.5 text-sm transition-all outline-none ${
      errors[fieldName]
        ? "border-red-500 bg-red-50/40 text-slate-800 placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-slate-200 bg-primary/4 text-slate-700 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  return (
    <section id="contact-form" className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.65fr_1fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-2 md:p-3 lg:mt-16"
          >
            <h3 className="mb-2 text-2xl font-extrabold tracking-wide text-accent-red md:text-3xl">
              {siteConfig.name}
            </h3>
            <p className="mb-5 text-sm font-medium text-slate-600">
              {siteConfig.tagline}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2.5">
                <div className="ml-1 text-accent-red">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-slate-500">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-primary-dark">{siteConfig.phone.landline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5">
                <div className="ml-1 text-accent-red">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-slate-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-primary-dark">{siteConfig.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl p-2.5">
                <div className="ml-1 text-accent-red">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-slate-500">Location</p>
                  <p className="mt-1 text-sm font-semibold text-primary-dark">{siteConfig.addresses.office.text}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-primary/20 p-6 md:p-8"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-primary-dark mb-2">Enquiry Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for contacting Ambica Industry. Our technical and sales experts will review your request and get in touch with you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-dark text-white text-sm font-semibold rounded-lg hover:bg-[#002855] transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  <RotateCcw size={16} /> Send Another Enquiry
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="mt-1 mb-1 text-2xl font-extrabold text-primary">Tell us what you need</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fill in the details below and our team will get back to you with custom pricing and technical specifications.
                </p>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className={labelClasses}>
                        Full Name <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        className={getFieldClasses("name")}
                      />
                      <FieldError error={errors.name} />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-company" className={labelClasses}>
                        Company Name
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Business name"
                        aria-invalid={!!errors.company}
                        className={getFieldClasses("company")}
                      />
                      <FieldError error={errors.company} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="contact-email" className={labelClasses}>
                        Email Address <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        className={getFieldClasses("email")}
                      />
                      <FieldError error={errors.email} />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className={labelClasses}>
                        Phone / WhatsApp <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+91 90000 00000"
                        aria-invalid={!!errors.phone}
                        className={getFieldClasses("phone")}
                      />
                      <FieldError error={errors.phone} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-service" className={labelClasses}>
                      Product / Service <span className="text-accent-red">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.service}
                      className={getFieldClasses("service")}
                    >
                      <option value="">Select requirement</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <FieldError error={errors.service} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className={labelClasses}>
                        Requirement Details <span className="text-accent-red">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {formData.message.length} chars (min 10)
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your product, quantity, application, or custom requirement..."
                      aria-invalid={!!errors.message}
                      className={`${getFieldClasses("message")} resize-none`}
                    />
                    <FieldError error={errors.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary-dark to-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === "submitting" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Enquiry...</span>
                      </div>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

