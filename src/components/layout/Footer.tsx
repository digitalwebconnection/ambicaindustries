import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { FiFacebook, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
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
          <div className="lg:col-span-4 pr-0 lg:pr-8">
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
            <div className="flex items-center gap-4">
              {[
                { icon: FiFacebook, link: siteConfig.social.facebook, label: 'Facebook' },
                { icon: FiTwitter, link: siteConfig.social.twitter, label: 'Twitter' },
                { icon: FiLinkedin, link: siteConfig.social.linkedin, label: 'LinkedIn' },
                { icon: FiInstagram, link: siteConfig.social.instagram, label: 'Instagram' },
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-red hover:bg-accent-red hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-md"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links Column */}
          <div className="lg:col-span-2 lg:ml-8">
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
          <div className="lg:col-span-3">
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

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-accent-red flex items-center justify-center shrink-0 text-white shadow-md group-hover:bg-accent-red group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <div className="text-base mt-0.5">
                  <span className="block text-white font-semibold mb-1">{siteConfig.addresses.office.label}</span>
                  <span className="text-white/60 block leading-relaxed">{siteConfig.addresses.office.text}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-accent-red flex items-center justify-center shrink-0 text-white shadow-md group-hover:bg-accent-red group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col text-base gap-1 mt-1">
                  <a href={`tel:${siteConfig.phone.india}`} className="text-white/60 hover:text-white transition-colors font-medium">{siteConfig.phone.india}</a>
                  <a href={`tel:${siteConfig.phone.canada}`} className="text-white/60 hover:text-white transition-colors font-medium">{siteConfig.phone.canada}</a>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-accent-red flex items-center justify-center shrink-0 text-white shadow-md group-hover:bg-accent-red group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <a href={`mailto:${siteConfig.email}`} className="text-base text-white/60 hover:text-white transition-colors mt-0.5 font-medium">{siteConfig.email}</a>
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
