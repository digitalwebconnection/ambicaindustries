import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

export default function HeroWhyUs() {


    return (
        <section className="relative overflow-hidden bg-white py-12 lg:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }} className="">
                        <h1 className="text-4xl sm:text-4xl lg:text-5xl font-black text-primary-dark tracking-tight leading-15 mb-6 relative">
                            Color Chemistry Built Around <span className="text-accent-red relative inline-block mt-1">
                                Your Business.
                                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-red/90 rounded-full transform -rotate-[1.5deg]" />
                            </span>

                        </h1>
                        <p className="text-base tracking-wide mt-4 text-slate-600 leading-relaxed mb-4 font-medium">
                            Choosing the right dye supplier is about more than finding the right shade. It is about getting dependable products, responsive service, consistent quality, and a partner who understands your production requirements.
                        </p>
                        <p className="text-base tracking-wide mt-2 text-slate-600 leading-relaxed mb-10 font-medium">
At Ambica Industry, we bring together manufacturing knowledge, product expertise, and customer-focused service to help industries achieve reliable coloration at every stage.                        </p>

                        <button type="button" className="group inline-flex items-center justify-center gap-3 px-8 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <span>Talk to an expert</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                        className="relative h-130">
                        <div className="w-100  h-100  bg-accent-red/15 absolute  top-10 rounded-l-full"></div>


                    </motion.div> */}
                </div>
            </div>
        </section>
    );
}