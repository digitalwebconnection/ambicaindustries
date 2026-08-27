import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import { FlaskConical, ShieldCheck, Truck, HeadphonesIcon, Microscope } from 'lucide-react';

const IMG = 'https://www.ambicaindustry.com/images';

const teamExpertise = [
  {
    icon: FlaskConical,
    title: 'Textile Chemistry Experts',
    description:
      'Our team of textile chemistry experts ensures that every dye formulation meets the highest standards of quality and performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Production & Quality Control',
    description:
      'Rigorous quality control processes at every stage of production ensure consistent and reliable results.',
  },
  {
    icon: Microscope,
    title: 'R&D Innovation',
    description:
      'Our dedicated R&D team continuously develops new formulations to meet evolving industry demands.',
  },
  {
    icon: Truck,
    title: 'Supply Chain Management',
    description:
      'Efficient supply chain operations ensure timely delivery to clients worldwide.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Care',
    description:
      'Our customer care team provides personalized support and guidance for all your dye requirements.',
  },
];

export default function About() {
  return (
    <>
      <Breadcrumb title="About Us" items={[{ label: 'About Us' }]} />

      {/* Company History */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1210px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img
                  src={`${IMG}/about-us.webp`}
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
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Our Story</h2>
              <p className="text-gray-text leading-relaxed mb-4">
                Since 1998, Ambica Industry has been a trusted name in the textile
                industry, delivering high-quality, reliable, and innovative dye solutions for
                fabrics and garments. It is a legacy that we carry towards Color dyes for varies
                industries.
              </p>
              <p className="text-gray-text leading-relaxed mb-4">
                Our Father started this industries and we are there second generation in this
                industries serving dyes market all over world. We are specialize in creating vibrant,
                lasting colors that meet the evolving demands of fashion, home textiles, and
                industrial fabrics World wide.
              </p>
              <p className="text-gray-text leading-relaxed">
                Over the years, we have expanded our product range to include acid dyes, direct dyes,
                reactive dyes, leather dyes, wood dyes, food & lake colors, pigment powder dyes,
                and metal complex dyes — catering to diverse industries worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environment Management */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(6,64,140,0.95), rgba(217,23,156,0.85))',
          }}
        />
        <div className="relative z-10 max-w-[1210px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Environment Management</h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto mb-8" />
            <p className="text-white/85 text-lg max-w-3xl mx-auto leading-relaxed">
              We are committed to environmentally responsible manufacturing practices. Our
              production facilities implement advanced waste treatment systems, and we continuously
              develop eco-friendly dye formulations to reduce environmental impact while maintaining
              superior quality standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1210px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Meet Our Team Expertise
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-gold to-accent-pink mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamExpertise.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary-dark mb-3">{item.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
