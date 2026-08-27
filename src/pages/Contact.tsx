import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import { siteConfig } from '../data/siteConfig';
import { Phone, Mail, Building2 } from 'lucide-react';

const contactCards = [
  {
    icon: Building2,
    title: 'Office Address',
    content: siteConfig.addresses.office.text,
    gradient: 'from-primary to-blue-600',
  },

  {
    icon: Phone,
    title: 'Phone',
    content: `${siteConfig.phone.canada}\n${siteConfig.phone.india}`,
    gradient: 'from-accent-orange to-red-500',
  },
  {
    icon: Mail,
    title: 'Email',
    content: siteConfig.email,
    gradient: 'from-accent-gold to-accent-orange',
  },
];

export default function Contact() {
  return (
    <>
      <Breadcrumb title="Contact Us" items={[{ label: 'Contact Us' }]} />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1210px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden shadow-card h-[400px] lg:h-full min-h-[400px]"
            >
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d${siteConfig.geo.lng}!3d${siteConfig.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzQwLjUiTiA3MsKwMzEnMDIuNCJF!5e0!3m2!1sen!2sin!4v1600000000000`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ambica Industry Location"
              />
            </motion.div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <card.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-primary-dark mb-2">{card.title}</h3>
                  <p className="text-gray-text text-sm whitespace-pre-line">{card.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
