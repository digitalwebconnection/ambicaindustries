import { motion } from "framer-motion";
import { Search, FlaskConical, TestTube2, SlidersHorizontal, Factory, Lightbulb } from "lucide-react";
import dyeProcessImage from "../../assets/images/hero/dyeing-textiles-factory-colorful-process.jpg";

export default function RnDProcess() {
  const processSteps = [
    {
      number: "01",
      title: "Understand",
      description: "We study the material, application, shade requirements, production, and performance needs.",
      icon: Search,
    },
    {
      number: "02",
      title: "Formulate",
      description: "Our technical team develops formulations based on the specific application requirements.",
      icon: FlaskConical,
    },
    {
      number: "03",
      title: "Test",
      description: "The formulation is tested for shade, color strength, consistency, and performance.",
      icon: TestTube2,
    },
    {
      number: "04",
      title: "Optimize",
      description: "Test results help us refine the formulation for better performance and efficiency.",
      icon: SlidersHorizontal,
    },
    {
      number: "05",
      title: "Scale",
      description: "Approved formulations are prepared for controlled production and consistent batches.",
      icon: Factory,
    },
    {
      number: "06",
      title: "Improve",
      description: "Customer feedback helps us refine products and develop new solutions continuously.",
      icon: Lightbulb,
    },
  ];

  return (
    <section className="py-14 md:py-12 bg-primary-dark overflow-hidden relative">

      <div className="absolute inset-0 h-full  overflow-hidden z-0">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${dyeProcessImage})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center ",
            backgroundSize: "cover",
          }}
        />
        {/* <div className="absolute inset-0 bg-linear-to-br from-accent-red/20 via-accent-red/5 to-primary-dark/50" />
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/78 via-transparent to-accent-red/10" /> */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-black/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="text-sm font-semibold uppercase flex gap-2 items-center justify-center tracking-wider text-white">
            <span className="w-8  bg-white h-0.5" />
            Process
            <span className="w-8  bg-white h-0.5" />
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-wide text-white">
            From Requirement to <span className="text-accent-red">Reliable Formulation</span>
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-white ">
            Our development process brings together research, testing, application evaluation, and continuous improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 lg:gap-x-12 lg:gap-y-12 place-items-center -mt-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="group relative flex flex-col items-center justify-center text-center w-70 h-70 rounded-full border border-slate-200 bg-white/95 backdrop-blur-sm px-6 shadow-sm transition-all duration-500 hover:border-accent-red hover:bg-white/85 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-2">
                  <span className="absolute top-6 text-sm font-bold tracking-widest text-accent-red">
                    {step.number}
                  </span>

                  <div className="mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 transition-all duration-500 group-hover:scale-105 group-hover:bg-accent-red/80">
                    <Icon className="h-7 w-7 text-accent-red transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 group-hover:text-slate-900 transition-colors">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}