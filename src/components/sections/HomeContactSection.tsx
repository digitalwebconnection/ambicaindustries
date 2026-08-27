import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-8 md:py-14 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(211, 2, 2, 0.03) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 58, 124, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <span className="h-[2px] w-8 bg-[#003A7C] rounded-full" />
              <span className="text-[#003A7C] font-bold text-xs uppercase tracking-widest">
                Get In Touch
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#003A7C] leading-[1.15] mb-5">
              Let's Discuss Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">
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
                <div>
                  <h4 className="text-base font-bold text-[#003A7C] mb-1">Call Us Directly</h4>
                  <p className="text-slate-600 text-sm mb-0.5">India: {siteConfig.phone.india}</p>
                  <p className="text-slate-600 text-sm">Canada: {siteConfig.phone.canada}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#003A7C]/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#003A7C]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#003A7C] mb-1">Email Us</h4>
                  <p className="text-slate-600 text-sm">{siteConfig.email}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#003A7C]/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#003A7C]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#003A7C] mb-1">Head Office</h4>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                    {siteConfig.addresses.office.text}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div variants={fadeUp} className="relative">
            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,58,124,0.08)] border border-slate-300 p-6 md:p-8 relative z-20">
              <h3 className="text-xl font-bold text-[#003A7C] mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">First Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#003A7C] focus:ring-1 focus:ring-[#003A7C] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#003A7C] focus:ring-1 focus:ring-[#003A7C] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#003A7C] focus:ring-1 focus:ring-[#003A7C] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+91 90000 00000" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#003A7C] focus:ring-1 focus:ring-[#003A7C] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Your Message</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Tell us about your requirements..." 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#003A7C] focus:ring-1 focus:ring-[#003A7C] transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus !== "idle"}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 bg-[#003A7C] hover:bg-[#002855] text-white rounded-lg font-bold text-sm transition-all duration-300 disabled:opacity-70"
                >
                  {formStatus === "idle" && (
                    <>Send Message <Send size={16} /></>
                  )}
                  {formStatus === "submitting" && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {formStatus === "success" && (
                    <>Message Sent Successfully!</>
                  )}
                </button>
              </form>
            </div>

            {/* Decorative Offset Block */}
            <div className="absolute top-6 -right-4 w-full h-full bg-accent-red rounded-[1.5rem] z-10 opacity-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#003A7C] rounded-full z-10 opacity-5 blur-xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
