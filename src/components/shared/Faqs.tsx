import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from '@/data/faq';

export default function Faqs({ faqs }: { faqs: FAQ[] }) {

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-primary-dark capitalize leading-[1.15] md:leading-[1.1] mb-2">
          Frequently Asked{" "}
          <span className="text-accent-red">
            Questions
          </span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-2.5 sm:gap-3 bg-white px-0 sm:px-4 md:px-6 py-2 sm:py-4 md:py-5 rounded-xl max-w-3xl mx-auto mt-6 sm:mt-8">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className={`border rounded-xl transition-all duration-300 
                ${isOpen ? "border-accent-red/50 bg-accent-red/1 shadow-lg shadow-accent-red/10"
                  : "border-slate-200 sm:border-slate-300 shadow-xs sm:shadow-sm"
                }`}
            >
              <button
                type="button"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                className="w-full cursor-pointer flex items-center justify-between gap-3 sm:gap-4 px-4 py-3.5 sm:px-5 sm:py-5 text-left group"
              >
                <span
                  className={`font-semibold transition-colors tracking-tight text-[15px] sm:text-base ${isOpen ? "text-accent-red-dark" : "text-slate-800"
                    }`}
                >
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown
                    size={18}
                    className={`sm:w-5 sm:h-5 transition-colors duration-300 group-hover:text-accent-red-dark ${isOpen ? "text-accent-red-dark" : "text-slate-500"
                      }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.25, delay: isOpen ? 0.05 : 0 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-slate-600 text-xs sm:text-sm tracking-normal sm:tracking-wide leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
