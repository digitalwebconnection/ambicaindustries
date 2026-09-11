import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export default function TopBar() {
  return (
    <div className="w-full bg-white relative z-50">
      {/* Container is edge-to-edge but content is constrained to max-w */}
      <div className="max-w-full mx-auto flex flex-col sm:flex-row items-stretch h-auto sm:h-[42px] text-[12px] font-bold tracking-wider uppercase shadow-sm">
        
        {/* Left Accent Block: Phone (Action oriented) */}
        <a 
          href={`tel:${siteConfig.phone.india}`}
          className="bg-accent-red text-white flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-0 gap-2 shrink-0 hover:bg-red-700 transition-colors group relative overflow-hidden flex-1 sm:flex-none"
        >
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          <Phone size={14} className="group-hover:scale-110 transition-transform" />
          <span className="whitespace-nowrap">Call Us : {siteConfig.phone.india}</span>
        </a>
        
        {/* Main Bar: Address and Email */}
        <div className="flex-1 bg-[#003A7C] text-white flex items-center justify-center sm:justify-between px-4 sm:px-8 py-2.5 sm:py-0">
          
          {/* Address (Hidden on mobile to save space) */}
          <a 
            href={siteConfig.addresses.office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2.5 group opacity-90 hover:opacity-100 transition-opacity"
            title="Open in Google Maps"
          >
            <MapPin size={14} className="text-accent-red group-hover:-translate-y-0.5 transition-transform" />
            <span className="truncate max-w-[500px] xl:max-w-[700px] normal-case text-[13px] font-medium tracking-wide group-hover:underline underline-offset-2">
              {siteConfig.addresses.office.text}
            </span>
          </a>

          <div className="flex-1 lg:hidden" />

          {/* Email */}
          <a 
            href={`mailto:${siteConfig.email}`} 
            className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity group"
          >
            <Mail size={14} className="text-accent-red group-hover:scale-110 transition-transform" />
            <span className="normal-case text-[13px] font-medium tracking-wide">{siteConfig.email}</span>
          </a>
          
        </div>

      </div>
    </div>
  );
}
