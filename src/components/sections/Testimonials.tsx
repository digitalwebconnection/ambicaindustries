import { useCallback } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-12 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-sm font-semibold uppercase flex items-center tracking-wider text-accent-red">
            <span className="w-10 mr-2 bg-accent-red h-0.5" />
            What Our Customers Say
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-primary-dark leading-14">
            We love what we do, <br /><span className="text-accent-red">they love the results</span>
          </h2>
        </motion.div>

  
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 -ml-6">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-nowrap pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index  * 0.06 }}
                    className="flex flex-col w-100 h-80 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent-red/40"
                  >
                    <Quote className="w-8 h-8 text-accent-red/30 mb-3" strokeWidth={2} />
                    <h3 className="text-lg font-bold text-primary-dark mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-2 flex-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                      <p className="text-sm font-semibold text-primary-dark">{item.name}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-accent-red hover:text-white hover:border-accent-red transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-accent-red hover:text-white hover:border-accent-red transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}