import { motion } from "framer-motion";
import {
  Target,
  RefreshCcw,
  Microscope,
  Beaker,
  ShieldCheck,
  Factory
} from "lucide-react";

const focusPoints = [
  {
    title: "Shade Accuracy",
    icon: Target,
    color: "text-accent-red",
    bg: "bg-accent-red/20",
  },
  {
    title: "Color Consistency",
    icon: RefreshCcw,
    color: "text-accent-red",
    bg: "bg-accent-red/10",
  },
  {
    title: "Product Reproducibility",
    icon: Microscope,
    color: "text-accent-red",
    bg: "bg-accent-red/10",
  },
  {
    title: "Application Suitability",
    icon: Beaker,
    color: "text-accent-red",
    bg: "bg-accent-red/10",
  },
  {
    title: "Performance Requirements",
    icon: ShieldCheck,
    color: "text-accent-red",
    bg: "bg-accent-red/10",
  },
  {
    title: "Manufacturing Feasibility",
    icon: Factory,
    color: "text-accent-red",
    bg: "bg-accent-red/10",
  },
  
];

export default function RnDQuality() {
  return (
    <section className="relative overflow-hidden bg-white py-6 lg:py-8">
     
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[2.5px] text-accent-red">
            Quality in Every Development
          </span>

          <h2 className="text-3xl font-black leading-tight text-primary-dark sm:text-4xl lg:text-5xl">
            Research.
            <span className="text-accent-red">Testing.</span>Consistency.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Our R&D combines research and testing to develop reliable formulations with consistent production performance.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">

    
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="">
              <span className="mb-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-red">
                <span className="h-0.5 w-12 bg-accent-red" />We Focus On
              </span>

              <h3 className="text-3xl font-extrabold leading-tight text-primary-dark">
                From laboratory research to{" "}
                <span className="text-accent-red">
                  industrial reliability.
                </span>
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                Every formulation is evaluated with practical application and
                manufacturing requirements in mind. This helps us develop dye
                solutions that deliver reliable and repeatable performance.
              </p>
        
              <div className="mt-8 border-l-4 border-accent-red bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Our Objective
                </p>

                <p className="mt-2 font-semibold leading-6 text-primary-dark">
                  Transform promising laboratory formulations into dependable
                  industrial dye solutions.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 mt-5">
            <div className="grid gap-9 sm:grid-cols-2">
              {focusPoints.map((point, index) => {
                const Icon = point.icon;

                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                    }}
                    className="group flex items-center gap-4 rounded-xl border border-accent-red/20 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-md"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${point.bg}`}
                    >
                      <Icon className={`h-5 w-5 ${point.color}`} />
                    </div>

                    <span className="font-semibold leading-5 text-slate-700">
                      {point.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}