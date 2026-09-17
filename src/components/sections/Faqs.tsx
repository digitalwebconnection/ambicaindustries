import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/faq";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 md:py-14 max-w-7xl px-8 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark capitalize leading-[1.1] mb-2">
          Frequently Asked{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-red to-accent-red-dark">
            Questions
          </span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-3 bg-white px-6 py-5 rounded-xl max-w-3xl mx-auto mt-8">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className={`border rounded-xl  transition-all duration-300 ${
                isOpen
                  ? "border-accent-red/50 bg-accent-red/1  shadow-lg shadow-accent-red/10"
                  : "border-slate-300 shadow-sm"
              }`}
            >
              <motion.button onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left group"
              >
                <span
                  className={`font-semibold transition-colors tracking-tight text-md  ${
                    isOpen ? "text-accent-red-dark" : "text-slate-800"
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
                    size={20}
                    className={`transition-colors duration-300 group-hover:text-accent-red-dark ${
                      isOpen ? "text-accent-red-dark" : "text-slate-500"
                    }`}
                  />
                </motion.div>
              </motion.button>

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
                    <p className="px-5 pb-5 text-slate-600 text-sm tracking-wide leading-relaxed">
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