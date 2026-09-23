import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import heroBg from "../../assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.jpg";

export default function HeroContactUs() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden ">

      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 -z-10 bg-white/75" />

      <div className="w-full">
        <div className="overflow-hidden py-10 lg:py-12 px-8">
          <div className="absolute -right-20 -top-20 h-100 w-100 rounded-full bg-accent-red/10 blur-2xl" />
          <div className="absolute -bottom-15 -left-10  h-100 w-100 rounded-full bg-accent-red/10 blur-2xl" />

          <div className="relative grid items-center gap-14 lg:grid-cols-[1.50fr_0.85fr] lg:gap-16 mt-9">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <div className="text-accent-red mb-4 font-semibold uppercase  text-xs inline-flex items-center tracking-widest gap-1.5"><span className="w-8 h-[0.7px] bg-accent-red"/> Contact Us</div>
              <h1 className="mb-6 max-w-3xl text-4xl font-black tracking-tight text-accent-red sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                Let’s Build the Future Together
              </h1>
              <p className="mb-4 max-w-xl text-base font-medium leading-relaxed tracking-wide text-slate-700">
                At Ambica Industries, we believe every successful project
                begins with a strong connection. Whether you have a product
                enquiry, custom requirement, or business opportunity, our team
                is ready to understand your needs and provide the right
                support.
              </p>
              <p className="mb-4 max-w-xl text-base font-medium leading-relaxed tracking-wide text-slate-700">
                Speak with our team about your requirements and receive the
                support you need.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent-red px-7 py-2.5 text-base font-bold text-white shadow-lg shadow-accent-red/30 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-red-dark"
                >
                  <span>Get In Touch</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href=""
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-accent-red bg-white/ px-7 py-2.5 text-base font-bold text-accent-red transition-all duration-300 hover:border-accent-red hover:bg-accent-red/15"
                >
                  <Phone size={18} />
                  Call us now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="hidden lg:block mt-7 -ml-35"
            >
              <motion.div
                animate={{ y: [0, -12, 0 ] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative mx-auto flex h-65 w-65 items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full bg-accent-red/40" />
                <div className="absolute inset-8 rounded-full bg-accent-red/40" />
                <div className="absolute inset-16 rounded-full bg-white shadow-xl" />
                <Phone
                  size={48}
                  className="relative text-accent-red"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}