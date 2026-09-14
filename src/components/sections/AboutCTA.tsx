import { Plus } from "lucide-react";

export default function AboutCTA() {
  // Placeholder realistic avatars for the team representation
  const teamAvatars = [
    "https://i.pravatar.cc/100?img=11",
    "https://i.pravatar.cc/100?img=33",
    "https://i.pravatar.cc/100?img=14",
    "https://i.pravatar.cc/100?img=53",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=44",
  ];

  return (
    <section className="py-16 md:py-20 bg-[#eae5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner Container */}
        <div className="bg-[#021f42] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Pattern inside Banner */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }} 
          />

          {/* Left Side: Main Copy and Button */}
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] mb-8 tracking-tight">
              <span className="text-white">Let's formulate the</span><br />
              <span className="text-accent-red">colors they'll copy.</span>
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-accent-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-accent-red transition-all duration-300 shadow-[0_4px_14px_rgba(211,2,2,0.3)] hover:shadow-lg hover:-translate-y-0.5"
            >
              Talk to an expert now
            </a>
          </div>

          {/* Right Side: Team Avatars and Sub-copy */}
          <div className="relative z-10 flex flex-col items-start lg:items-end text-left lg:text-right">
            
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3 sm:-space-x-4 mb-6">
              {teamAvatars.map((src, idx) => (
                <div 
                  key={idx} 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-[#021f42] bg-slate-200 overflow-hidden relative"
                >
                  <img src={src} alt="Team member" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[2px] border-white/20 bg-[#021f42] flex items-center justify-center text-white relative z-10">
                <Plus size={20} className="text-white/70" />
              </div>
            </div>
            
            {/* Sub-copy */}
            <p className="text-lg sm:text-xl text-white/90 max-w-sm leading-snug">
              Work with a <span className="font-bold text-accent-red">25+ year</span> team of the industry's top <span className="font-bold text-accent-red">chemical formulation</span> talent.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
