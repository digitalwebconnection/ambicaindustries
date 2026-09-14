
import { ArrowRight, FileText } from 'lucide-react';

import heroImg from '../../assets/images/hero/dyeing-fabrics-colorful-vats.jpg';

export default function AboutHero() {
  const handleScrollToStory = () => {
    const el = document.getElementById('our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = () => {
    window.dispatchEvent(new Event('openQuoteModal'));
  };

  return (
    <section className="relative flex items-center py-12 lg:py-20 overflow-hidden bg-white">
      {/* Subtle Background Elements for depth */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="max-w-xl flex flex-col justify-center">
            {/* Tag/Kicker */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[3px] bg-accent-red rounded-full"></span>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Since 1998</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-dark tracking-tight leading-[1.12] mb-6">
              Excellence in <br className="hidden sm:block" />
              <span className="text-accent-red relative inline-block mt-1 sm:mt-2">
                Color Chemistry
                {/* Decorative underline */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-red/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="transparent"/>
                </svg>
              </span>
            </h1>

            {/* Narrative Description */}
            <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium max-w-[480px]">
              Ambica Industry is a premier global exporter of high-performance textile dyes. We blend rigorous formulation with sustainable practices to deliver vibrant, reliable colors to over 30 nations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <button
                type="button"
                onClick={handleScrollToStory}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Our Story</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                type="button"
                onClick={handleOpenQuote}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-accent-red border-2 border-accent-red/20 hover:border-accent-red text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <FileText size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Request Quote</span>
              </button>
            </div>
          </div>

          {/* Right Side: Irregular Polygonal Shape Image */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            {/* The Image Container */}
            <div className="relative w-full max-w-[420px] lg:max-w-[500px] aspect-square">
              
              {/* Decorative Backdrop (Primary Navy Polygon) */}
              <div 
                className="absolute inset-0 bg-primary/10 transition-transform duration-1000 ease-in-out scale-105"
                style={{
                  clipPath: 'polygon(0% 20%, 85% 0%, 100% 60%, 80% 100%, 15% 90%, 0% 50%)',
                  transform: 'translate(-10px, 10px)'
                }}
              />
              
              {/* Decorative Backdrop (Accent Red Polygon) */}
              <div 
                className="absolute inset-0 bg-accent-red/10 transition-transform duration-1000 ease-in-out scale-105"
                style={{
                  clipPath: 'polygon(15% 10%, 95% 5%, 100% 90%, 70% 95%, 5% 100%, 0% 40%)',
                  transform: 'translate(15px, -5px)'
                }}
              />
              
              {/* The Actual Image with an Irregular Polygon Shape */}
              <img
                src={heroImg}
                alt="Colorful Dye Vats"
                className="relative w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                style={{
                  clipPath: 'polygon(20% 0%, 100% 15%, 90% 80%, 60% 100%, 0% 85%, 10% 30%)',
                }}
                loading="eager"
              />
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
