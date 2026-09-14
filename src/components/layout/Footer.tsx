import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../data/siteConfig';
import { productCategories } from '../../data/products';

const LOGO = '/logo2.png';

export default function Footer() {
  return (
    <footer className="bg-black/95 relative text-white font-sans border-t border-white/20">
      
      {/* --- Main Footer Content --- */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Column */}
<<<<<<< Updated upstream
          <div className="lg:col-span-4 pr-0 lg:pr-6">
=======
          <div className="lg:col-span-3 pr-0 lg:pr-4">
>>>>>>> Stashed changes
            <Link to="/" className="inline-block mb-8 group">
               <div className="flex items-center">
                 <div className="w-48 bg-white rounded-lg p-3 shadow-sm group-hover:shadow-md transition-all">
                   <img src={LOGO} alt="Ambica Industry" className="w-full h-full object-contain" loading="lazy" />
                 </div>
               </div>
            </Link>
            <p className="text-base leading-relaxed mb-8 text-white/80">
              {siteConfig.footerDescription}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FiFacebook, link: siteConfig.social.facebook, label: 'Facebook' },
                { icon: FiInstagram, link: siteConfig.social.instagram, label: 'Instagram' },
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-1 bg-white text-accent-red hover:bg-accent-red hover:text-white"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links Column */}
          <div className="lg:col-span-2 lg:ml-4">

            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/#about' },
                { name: 'R & D', path: '/#r-and-d' },
                { name: 'Industries', path: '/#industries' },
                { name: 'Why Choose Us', path: '/#why-choose-us' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.path} className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent-red" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">
              Our Products
            </h4>
            <ul className="space-y-4">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <span
                    className="text-white/60 hover:text-white transition-colors flex items-center group cursor-default"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent-red" />
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Pages Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">
              Other
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'About', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Contact', path: '/contact' },
                { name: 'Enquiry', path: '/enquiry' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent-red" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-5">
              {/* Address */}
              <li className="flex items-start gap-3.5 group">
                <a
                  href={siteConfig.addresses.office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent-red flex items-center justify-center shrink-0 text-white shadow-md group-hover:bg-red-700 hover:scale-105 transition-all mt-0.5"
                  title="View on Google Maps"
                  aria-label="View address on Google Maps"
                >
                  <MapPin size={18} />
                </a>
                <div className="text-sm">
                  <span className="block text-white font-semibold mb-1">
                    {siteConfig.addresses.office.label}
                  </span>
                  <a
                    href={siteConfig.addresses.office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors block leading-relaxed"
                    title="Open in Google Maps"
                  >
                    {siteConfig.addresses.office.text}
                   
                  </a>
                </div>
              </li>

              {/* Phone Numbers & WhatsApp */}
              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-accent-red flex items-center justify-center shrink-0 text-white shadow-md mt-0.5">
                  <Phone size={18} />
                </div>
                <div className="flex-1 space-y-2 text-sm">
                  <span className="block text-white font-semibold">Phone & WhatsApp</span>

                  {/* Landline */}
                  <div className="flex items-center gap-2 text-white/70">
                    <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Office:</span>
                    <a
                      href={`tel:${siteConfig.phone.landline}`}
                      className="hover:text-white transition-colors font-medium hover:underline underline-offset-2"
                      title="Call Office Landline"
                    >
                      {siteConfig.phone.landline}
                    </a>
                  </div>

                  {/* Shailesh Shah */}
                  <div className="flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                    <a
                      href={`tel:${siteConfig.phone.shailesh.tel}`}
                      className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center gap-1.5"
                      title="Call Shailesh Shah"
                    >
                      <span className="text-white/60 text-xs">Shailesh Shah:</span>
                      <span className="text-white font-semibold">{siteConfig.phone.shailesh.number}</span>
                    </a>
                    <a
                      href={siteConfig.phone.shailesh.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shrink-0 shadow transition-transform hover:scale-110"
                      title="Chat with Shailesh Shah on WhatsApp"
                      aria-label="WhatsApp Shailesh Shah"
                    >
                      <FaWhatsapp size={15} />
                    </a>
                  </div>

                  {/* Samir Shah */}
                  <div className="flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                    <a
                      href={`tel:${siteConfig.phone.samir.tel}`}
                      className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center gap-1.5"
                      title="Call Samir Shah"
                    >
                      <span className="text-white/60 text-xs">Samir Shah:</span>
                      <span className="text-white font-semibold">{siteConfig.phone.samir.number}</span>
                    </a>
                    <a
                      href={siteConfig.phone.samir.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shrink-0 shadow transition-transform hover:scale-110"
                      title="Chat with Samir Shah on WhatsApp"
                      aria-label="WhatsApp Samir Shah"
                    >
                      <FaWhatsapp size={15} />
                    </a>
                  </div>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3.5 group">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="w-10 h-10 rounded-full bg-accent-red flex items-center justify-center shrink-0 text-white shadow-md group-hover:bg-red-700 hover:scale-105 transition-all mt-0.5"
                  title="Send Email"
                  aria-label="Send Email"
                >
                  <Mail size={18} />
                </a>
                <div className="text-sm">
                  <span className="block text-white font-semibold mb-1">Email Us</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-white/70 hover:text-white transition-colors font-medium break-all text-sm block hover:underline underline-offset-2"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/80 font-medium">
          <p>© {new Date().getFullYear()} Ambica Industry. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
