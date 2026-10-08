import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export default function TopBar() {
  return (
    <div className="w-full relative z-30 bg-[#002855] select-none">
      {/* Container is edge-to-edge with 50% / 50% split on mobile and flexible on desktop */}
      <div className="max-w-full mx-auto flex flex-row items-stretch h-9 sm:h-10.5 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase relative">
        
        {/* Left Accent Block: Phone (50% on mobile with angled cut, auto on desktop) */}
        <a 
          href={`tel:${siteConfig.phone.india}`}
          className="relative z-10 w-[51%] sm:w-auto bg-linear-to-r from-accent-red-dark via-accent-red to-red-600 text-white flex items-center justify-center px-2 sm:px-8 py-1.5 sm:py-0 gap-1.5 sm:gap-2.5 shrink-0 hover:brightness-110 transition-all group overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
          }}
        >
          {/* Subtle shine sweep on hover */}
          <div className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          
          {/* Angled separator highlight edge */}
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/30 pointer-events-none" />

          {/* Micro Icon Badge */}
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-xs">
            <Phone size={11} className="sm:size-3 text-white group-hover:scale-110 transition-transform" />
          </div>
          <span className="truncate whitespace-nowrap text-[10px] sm:text-[12px] tracking-wide font-extrabold pr-2">
            <span className="hidden sm:inline">Call Us : </span>{siteConfig.phone.india}
          </span>
        </a>
        
        {/* Main Bar: Address and Email (flexible remaining width) */}
        <div className="flex-1 bg-linear-to-r from-primary-dark via-primary-dark to-[#002855] text-white flex items-center justify-center sm:justify-between px-2 sm:px-8 py-1.5 sm:py-0 overflow-hidden -ml-2.5 sm:ml-0">
          
          {/* Address (Hidden on mobile to save space) */}
          <a 
            href={siteConfig.addresses.office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2.5 group opacity-90 hover:opacity-100 transition-opacity"
            title="Open in Google Maps"
          >
            <div className="w-5.5 h-5.5 rounded-full bg-accent-red/20 flex items-center justify-center">
              <MapPin size={12} className="text-accent-red group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="truncate max-w-125 xl:max-w-175 normal-case text-[13px] font-medium tracking-wide group-hover:underline underline-offset-2">
              {siteConfig.addresses.office.text}
            </span>
          </a>

          <div className="hidden sm:block lg:hidden" />

          {/* Email */}
          <a 
            href={`mailto:${siteConfig.email}`} 
            className="flex items-center justify-center gap-1.5 sm:gap-2.5 opacity-90 hover:opacity-100 transition-opacity group max-w-full overflow-hidden pl-1 sm:pl-0"
          >
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Mail size={11} className="sm:size-3 text-accent-red group-hover:scale-110 transition-transform" />
            </div>
            <span className="truncate normal-case text-[10px] sm:text-[13px] font-medium tracking-normal sm:tracking-wide">
              {siteConfig.email}
            </span>
          </a>
          
        </div>

      </div>

      {/* Modern Designed 50/50 Dual-Accent Line */}
      <div className="h-0.75 w-full flex items-center relative overflow-hidden shadow-xs">
        {/* Left Half: Red Gradient */}
        <div className="w-1/2 h-full bg-linear-to-r from-red-600 via-accent-red to-accent-red-dark relative" />

        {/* Center Diagonal Badge Accent */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 bg-linear-to-r from-red-400 via-white to-sky-300 -skew-x-25 shadow-sm z-20" />

        {/* Right Half: Blue Gradient */}
        <div className="w-1/2 h-full bg-linear-to-r from-primary-dark via-primary to-sky-500" />
      </div>
    </div>
  );
}

