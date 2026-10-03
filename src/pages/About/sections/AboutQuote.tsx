import { Quote } from "lucide-react";

export default function AboutQuote() {
  return (
    <section className="bg-[#021f42] text-white py-12 lg:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Layout Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Top Quote Icon */}
          <div className="absolute -top-10 right-0 md:right-12 opacity-80">
            <Quote
              size={80}
              className="text-accent-red/20"
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
        
          <div className="pt-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight mb-6 text-white tracking-tight">
              <span className="bg-white text-primary px-3 py-1 rounded-md inline-block transform -rotate-1 shadow-sm mb-2">
                Good color
              </span>{" "}
              turns heads.
              <br />
              <span className="text-accent-red">Great chemistry</span> turns
              minds.
            </h2>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed font-medium mb-10">
              The dyes we formulate aren't just meant to pass a quality check.
              They're meant to shape how people{" "}
              <span className="text-white font-semibold">perceive</span>,{" "}
              <span className="text-white font-semibold">choose</span>, and{" "}
              <span className="text-accent-red font-semibold">come back</span>{" "}
              to your brand. This isn't a sprint. It's a strategy. And we treat
              every batch like it's going to matter for years.
            </p>

            <div className="border-l-4 border-accent-red pl-5 py-1">
              <h3 className="text-xl font-bold bg-white text-primary inline-block px-3 py-1 rounded-sm mb-3 shadow-sm">
                Ambica Industry
              </h3>
              <div className="flex items-center gap-3">
                <p className="text-sm text-white/90 font-semibold tracking-wider uppercase">
                  Founders & Management
                </p>
                <a
                  href="#"
                  className="text-white/40 hover:text-accent-red transition-colors inline-flex items-center justify-center p-1"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
