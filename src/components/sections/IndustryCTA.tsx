
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function IndustryCTA() {
  return (
    <section className="w-full -mt-10 mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className=" relative overflow-hidden max-w-full mx-auto mt-20 md:mt-22  bg-primary-dark py-14 md:py-14 " >

        <div className="absolute inset-0 bg-linear-to-br  from-primary-dark  via-primary-dark to-primary/30 "  />
        <div className="absolute -top-32 -right-20  w-80 h-80 rounded-full  bg-primary/20 blur-[100px] "  />
        <div className="absolute -bottom-32 -left-20  w-72 h-72  rounded-full  bg-primary-dark  blur-[100px]  " />

        {/* <div className="absolute -top-35 left-15 w-60 h-60 border border-white/80 rounded-full"/>
        <div className="absolute -top-30 left-20 w-50 h-50 border border-white/50 rounded-full"/>
       
        <div className="absolute -bottom-35 right-15 w-60 h-60 border border-white/80 rounded-full"/>
        <div className="absolute -bottom-30 right-20 w-50 h-50 border border-white/50 rounded-full"/> */}

        <motion.div initial={{opacity:0 , x:-30}}
        whileInView={{opacity:1 , x:0}}
        viewport={{once:true}}
        transition={{duration:1}} className="absolute -top-35 -left-95 w-120 h-120 border -rotate-45 z-0 border-white/50 "/>

        <motion.div initial={{opacity:0 , x:-30}}
        whileInView={{opacity:1 , x:0}}
        viewport={{once:true}}
        transition={{duration:1.30}} className="absolute -top-35 -left-80 w-120 h-120 border -rotate-45 z-0 border-white/70 "/>

        <motion.div initial={{opacity:0 , x:30}}
        whileInView={{opacity:1 , x:0}}
        viewport={{once:true}}
        transition={{duration:1}} className="absolute -bottom-35 -right-95 w-120 h-120 border -rotate-45 z-0 border-white/50 "/>
        
        <motion.div initial={{opacity:0 , x:30}}
        whileInView={{opacity:1 , x:0}}
        viewport={{once:true}}
        transition={{duration:1.30}}className="absolute -bottom-35 -right-80 w-120 h-120 border -rotate-45 z-0 border-white/70  "/>
        

        <div className="relative z-10 max-w-3xl mx-auto  text-center">

          <h3 className=" text-2xl md:text-3xl lg:text-4xl font-extrabold  text-white mb-4 leading-tight  ">
            Tell us your sample.
            <span className="block text-white/75">We'll tell you the right chemistry.</span>
          </h3>

          <p className="  max-w-2xl mx-auto  text-white/70 text-base mb-7 leading-7 ">
            From first sample to full production run, our team works with
            you directly to match the shade, fix the problem, and get the
            formulation right — not just ship product.
          </p>

          <Link to="/#quote" className="  group  inline-flex items-center gap-3  px-8 py-2.5  bg-white  text-primary-dark  rounded-full font-bold text-[15px] shadow-xl  hover:bg-accent-red  hover:text-white hover:-translate-y-1 transition-all duration-300  " >Talk to an expert now
            <ArrowRight className="w-5 h-5  group-hover:translate-x-1  transition-transform duration-300 "  />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

