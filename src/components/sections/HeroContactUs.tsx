import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.jpg";

export default function HeroContactUs() {
  return (
    <section className="relative min-h-40 w-full overflow-hidden ">
      <div
        className="absolute inset-0 -z-20 bg-cover blur-[3px] bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-white/80 via-white/60 to-white/5 " />

      <div className="w-full">
        <div className="overflow-hidden py-10 lg:py-12 px-8">
          {/* <div className="absolute -right-20 -top-20 h-100 w-100 rounded-full bg-accent-red/10 blur-2xl" />
          <div className="absolute -bottom-15 -left-10  h-80 w-80 rounded-full bg-accent-red/10 blur-2xl" /> */}

          <div className="relative flex flex-col items-center  text-center mt-6 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-accent-red mb-4 font-bold uppercase  text-xs inline-flex items-center tracking-widest gap-1.5">
                <span className="w-8 h-0.5 bg-accent-red" /> Contact Us <span className="w-8 h-0.5 bg-accent-red" />
              </div>
              <h1 className="mb-6 max-w-3xl text-4xl font-black tracking-tight text-accent-red sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                Let’s Build the Future Together
              </h1>
 
                
                <a href="#contact-form"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent-red px-7 py-2.5 text-base font-bold text-white shadow-lg shadow-accent-red/30 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-red-dark"
                >
                  <span>Get In Touch</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}