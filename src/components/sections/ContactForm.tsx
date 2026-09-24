import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

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

const fieldClasses =
  "w-full rounded-lg border border-slate-200 bg-primary/4 px-3.5 py-2.5 text-sm text-slate-700  transition-all placeholder:text-slate-400 focus:border-primary outline-none";

const labelClasses =
  "block text-xs font-semibold capitalize tracking-wider text-slate-700";

export default function Contactform() {
  return (
    <section id="contact-form" className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-10">
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

              <div className="flex items-center gap-3  p-2.5">
                <div className="ml-1 text-accent-red">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-slate-500">Email</p>
                  <p className="mt-1 text-sm font-semibold text-primary-dark">{siteConfig.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl  p-2.5">
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
            className="mx-10 w-full  shadow-2xl shadow-primary/60 p-4 md:p-6"
          >
            <h3 className="mt-2 mb-5 text-2xl font-extrabold text-primary">Tell us what you need</h3>
            <form action="" onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="name" className={labelClasses}>
                    Full Name
                  </label>
                  <input id="name" type="text" placeholder="Your name" required className={fieldClasses} />
                </div>

                <div className="space-y-1">
                  <label htmlFor="company" className={labelClasses}>
                    Company Name
                  </label>
                  <input id="company" type="text" placeholder="Business name" required className={fieldClasses} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input id="email" type="email" placeholder="you@example.com" required className={fieldClasses} />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className={labelClasses}>
                    Phone / WhatsApp
                  </label>
                  <input id="phone" type="tel" placeholder="+91 xxxxx xxxxx" required className={fieldClasses} />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="service" className={labelClasses}>
                  Product / Service
                </label>
                <select id="service" required className={fieldClasses}>
                  <option value="">Select requirement</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className={labelClasses}>
                  Requirement Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Tell us about your product, quantity, application, or custom requirement..."
                  className={`${fieldClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary-dark to-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Send Enquiry
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}