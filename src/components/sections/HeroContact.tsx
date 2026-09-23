import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function HeroContact() {
  return (
    <section className="relative min-h-150 flex items-center overflow-hidden bg-primary-dark">

      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/contact-hero-bg.jpg')",
        }}
      /> */}

      {/* <div className="absolute inset-0 bg-linear-to-r from-primary-dark via-primary-dark/85 to-primary-dark/40" /> */}
      {/* <div className="absolute inset-0 bg-linear-to-t from-primary-dark via-transparent to-primary-dark/60" /> */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-accent-red/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent-red" />
              <span className="text-accent-red text-xs font-bold uppercase tracking-[0.25em]">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-5">
              Let's connect with {" "}
              <span className=" text-accent-red ">
                Ambica Industries
              </span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
              Have a question about our products, services, or industrial solutions? Our team is here to help. Get in touch with Ambica Industries for product enquiries, business opportunities, technical assistance, or any other information you may need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-white font-bold text-lg mb-6">
                Reach Us Directly
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-red/20 border border-accent-red/40 flex items-center justify-center text-accent-red shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Phone</p>
                    <p className="text-white font-semibold">+91-079-22810801</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-red/20 border border-accent-red/40 flex items-center justify-center text-accent-red shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Email</p>
                    <p className="text-white font-semibold">ambicaindustries331@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent-red/20 border border-accent-red/40 flex items-center justify-center text-accent-red shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Location</p>
                    <p className="text-white font-semibold">Naroda , Ahmedabad - 382330</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
    </section>
  );
}