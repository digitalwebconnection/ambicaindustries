import { motion } from "framer-motion";
import AboutHero from "../components/sections/AboutHero";
import AboutQuote from "../components/sections/AboutQuote";
import AboutBentoStats from "../components/sections/AboutBentoStats";
import AboutCTA from "../components/sections/AboutCTA";
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  HeadphonesIcon,
  Microscope,
} from "lucide-react";

const teamExpertise = [
  {
    icon: FlaskConical,
    title: "Textile Chemistry Experts",
    description:
      "Our team of textile chemistry experts ensures that every dye formulation meets the highest standards of quality and performance.",
  },
  {
    icon: ShieldCheck,
    title: "Production & Quality Control",
    description:
      "Rigorous quality control processes at every stage of production ensure consistent and reliable results.",
  },
  {
    icon: Microscope,
    title: "R&D Innovation",
    description:
      "Our dedicated R&D team continuously develops new formulations to meet evolving industry demands.",
  },
  {
    icon: Truck,
    title: "Supply Chain Management",
    description:
      "Efficient supply chain operations ensure timely delivery to clients worldwide.",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Care",
    description:
      "Our customer care team provides personalized support and guidance for all your dye requirements.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <AboutHero />

      {/* Quote Section */}
      <AboutQuote />


      {/* Impact Numbers Bento Section */}
      <AboutBentoStats />

      {/* Company History */}
      <section id="our-story" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl px-4 sm:px-6 md:px-8 mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-xl overflow-hidden shadow-card">
                <img
                  src="/about-us.jpg"
                  alt="About Ambica Industry"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative border-l-4 border-accent-red pl-8 py-6"
            >
              <h2 className="text-3xl font-bold text-primary-dark mb-6">
                Our Story
              </h2>
              <p className="text-gray-text leading-relaxed mb-4">
                Since 1986, Ambica Industry has been a trusted name in the textile
                industry, delivering high-quality, reliable, and innovative dye solutions for
                fabrics and garments. It is a legacy that we carry towards Color dyes for varies
                industries.

              </p>
              <p className="text-gray-text leading-relaxed mb-4">
                Our Father started this industries and we are there second
                generation in this industries serving dyes market all over
                world. We are specialize in creating vibrant, lasting colors
                that meet the evolving demands of fashion, home textiles, and
                industrial fabrics World wide.
              </p>
              <p className="text-gray-text leading-relaxed">
                Over the years, we have expanded our product range to include
                acid dyes, direct dyes, reactive dyes, leather dyes, wood dyes,
                food & lake colors, pigment powder dyes, and metal complex dyes
                — catering to diverse industries worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AboutCTA />

      {/* Team Expertise */}
      <section className="py-12 md:py-14 relative overflow-hidden bg-gray-50">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-accent-pink/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-6">
              Meet Our <span className="bg-linear-to-r from-accent-red to-accent-red-dark text-transparent bg-clip-text">Team Expertise</span>
            </h2>
            <p className="text-gray-text max-w-2xl mx-auto text-lg leading-relaxed">
              Dedicated professionals committed to delivering excellence, innovation, and unwavering quality in every drop of color we produce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamExpertise.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative bg-white rounded-lg p-8 shadow-md shadow-black/40 hover:shadow-2xl  transition-all duration-500 hover:-translate-y-2 group overflow-hidden hover:border-primary/20"
              >
                {/* Decorative Hover Blob */}
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-gradient-to-br from-primary/5 to-accent-pink/5 blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-gray-100 group-hover:border-primary">
                    <item.icon size={26} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent-pink group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
