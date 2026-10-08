import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import imgTeamFounder from '@/assets/images/about/team-founder.webp';
import imgTeamShailesh from '@/assets/images/about/team-shailesh.webp';
import imgTeamSamir from '@/assets/images/about/team-samir.webp';

interface Partner {
  number: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

const partners: Partner[] = [
  {
    number: "01",
    name: "Founder & Chairman",
    role: "Founding Partner (1986 Heritage)",
    description:
      "Founded Ambica Industry in 1986 with a commitment to pure dye chemistry, uncompromising production ethics, and enduring relationships with leading fabric mills.",
    image: imgTeamFounder,
  },
  {
    number: "02",
    name: "Shailesh Shah",
    role: "Managing Partner — Commercial & Global Trade",
    description:
      "Directs international business expansion, institutional client relationships, and worldwide container dispatches across 20+ countries with direct accountability.",
    image: imgTeamShailesh,
  },
  {
    number: "03",
    name: "Samir Shah",
    role: "Partner — Technical Operations & R&D",
    description:
      "Directs laboratory formulation, spectrophotometer shade matching, and eco-friendly dye synthesis to ensure strict batch-to-batch consistency for all industrial buyers.",
    image: imgTeamSamir,
  },
];

export default function AboutTeamExpertise() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-slate-50/70 border-t border-slate-200/80">
      {/* Ambient background dots */}
      <div
        className="absolute inset-0 opacity-30 mask-[radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#06408c 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient gradient lights */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-accent-red/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-red/10 border border-accent-red/20 mb-4">
            <Users2 size={14} className="text-accent-red" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent-red">
              Leadership & Ownership
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-4">
            Meet Our{" "}
            <span className="bg-linear-to-r from-accent-red to-accent-red-dark text-transparent bg-clip-text">
              Partners
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Two generations of family leadership guiding Ambica Industry with chemical excellence, direct ownership accountability, and lasting trust.
          </p>
        </motion.div>

        {/* 3 Partners Grid - Clean Editorial Flow (No Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group flex flex-col transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Image Frame - Open Portrait without Card Box */}
              <div className="relative w-full aspect-4/5  overflow-hidden  bg-slate-200/80 shadow-md transition-all duration-500 group-hover:shadow-xl">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-50 transition-opacity duration-300" />

                {/* Number Badge */}
                <div className="absolute top-4 left-4">
                  <span className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-primary-dark font-extrabold text-xs flex items-center justify-center shadow-sm">
                    {partner.number}
                  </span>
                </div>
              </div>

              {/* Text Info with Full-Box Animated Border on Hover */}
              <div className="relative p-6  overflow-hidden transition-all duration-500">
                {/* 1. Main Background Panel Sliding Up Smoothly from Bottom */}
                <div className="absolute inset-0 bg-white/95 rounded-2xl shadow-[0_20px_40px_-12px_rgba(6,64,140,0.18)] border border-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />

                {/* 2. Full-Box 4-Sided Animated Border (Clockwise Sequence) */}
                {/* Top Border (Slides in from Left) */}
                <span className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-accent-red to-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out pointer-events-none z-10" />

                {/* Right Border (Slides down from Top) */}
                <span className="absolute top-0 right-0 w-0.75 h-full bg-linear-to-b from-primary to-accent-red -translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out delay-100 pointer-events-none z-10" />

                {/* Bottom Border (Slides in from Right) */}
                <span className="absolute bottom-0 right-0 w-full h-0.75 bg-linear-to-l from-accent-red to-primary translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out delay-200 pointer-events-none z-10" />

                {/* Left Border (Slides up from Bottom) */}
                <span className="absolute bottom-0 left-0 w-0.75 h-full bg-linear-to-t from-primary to-accent-red translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out delay-300 pointer-events-none z-10" />

               

                {/* 4. Ambient Soft Light Glow in Background Corner */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* 5. Diagonal Shimmer Ray on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out delay-200 pointer-events-none" />

                {/* Role */}
                <span className="text-xs font-bold  uppercase tracking-wider text-accent-red block mb-1.5 transition-transform duration-300 group-hover:translate-x-1">
                  {partner.role}
                </span>

                {/* Name */}
                <h3 className="text-2xl font-serif font-bold text-primary-dark tracking-tight mb-2.5 transition-colors duration-300 group-hover:text-primary">
                  {partner.name}
                </h3>

                {/* Normal Description */}
                <p className="text-slate-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-900">
                  {partner.description}
                </p>

             
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
