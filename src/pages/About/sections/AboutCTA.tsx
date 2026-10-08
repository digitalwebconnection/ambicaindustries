import { Plus } from "lucide-react";
import avatar11 from '@/assets/images/avatars/avatar-11.webp';
import avatar33 from '@/assets/images/avatars/avatar-33.webp';
import avatar14 from '@/assets/images/avatars/avatar-14.webp';
import avatar53 from '@/assets/images/avatars/avatar-53.webp';
import avatar32 from '@/assets/images/avatars/avatar-32.webp';
import avatar44 from '@/assets/images/avatars/avatar-44.webp';

export default function AboutCTA() {
  const teamAvatars = [
    avatar11,
    avatar33,
    avatar14,
    avatar53,
    avatar32,
    avatar44,
  ];

  return (
    <section className="py-16 md:py-20 bg-[#eae5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner Container */}
        <div className="bg-[#021f42] rounded-2xl p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Pattern inside Banner */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }} 
          />

          {/* Left Side: Main Copy and Button */}
          <div className="relative z-10 w-full lg:w-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] mb-6 sm:mb-8 tracking-tight">
              <span className="text-white">Let's formulate the</span><br />
              <span className="text-accent-red">colors they'll copy.</span>
            </h2>
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-accent-red text-white px-7 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-accent-red active:scale-95 transition-all duration-300 shadow-[0_4px_14px_rgba(211,2,2,0.3)] hover:shadow-lg hover:-translate-y-0.5 text-center"
            >
              Talk to an expert now
            </a>
          </div>

          {/* Right Side: Team Avatars and Sub-copy */}
          <div className="relative z-10 flex flex-col items-start lg:items-end text-left lg:text-right">
            
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2.5 sm:-space-x-4 mb-4 sm:mb-6 overflow-x-auto max-w-full py-1">
              {teamAvatars.map((src, idx) => (
                <div 
                  key={idx} 
                  className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full border-[3px] border-[#021f42] bg-slate-200 overflow-hidden relative shadow-xs"
                >
                  <img src={src} alt="Team member" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full border-2 border-white/20 bg-[#021f42] flex items-center justify-center text-white relative z-10">
                <Plus size={18} className="text-white/70" />
              </div>
            </div>
            
            {/* Sub-copy */}
            <p className="text-base sm:text-lg lg:text-xl text-white/90 text-left lg:text-right max-w-sm leading-snug">
              Work with a <span className="font-bold text-accent-red">25+ year</span> team of the industry's top <span className="font-bold text-accent-red">chemical formulation</span> talent.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
