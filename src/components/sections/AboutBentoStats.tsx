import bentoImg from "../../assets/images/hero/rows-colorful-dye-vats-industrial-factory.jpg";

interface BentoCardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
}

function BentoCard({
  number,
  title,
  description,
  className = "",
}: BentoCardProps) {
  return (
    <div
      className={`group relative overflow-hidden bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] transition-all duration-500 ease-out hover:shadow-[0_20px_45px_-10px_rgba(4,40,84,0.4)] hover:-translate-y-1.5 cursor-pointer ${className}`}
    >
      {/* ===== Designed Rich Background on Hover (Smooth 500ms Fade) ===== */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none bg-primary z-0">
        {/* Solid Corporate Navy Background */}
        <div className="absolute inset-0 bg-primary" />

        {/* Decorative Grid Mesh */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Radiant Ambient Light Orbs */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-accent-red/20 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#D30202]/20 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out" />

        {/* Geometric Contour Watermark Rings in Corner */}
        <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full border border-white/10 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-14 -right-14 w-52 h-52 rounded-full border border-white/[0.06] pointer-events-none" />

        {/* Top Edge Specular Border */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Content: Number & Title */}
      <div className="relative z-10">
        <span className="block text-3xl sm:text-4xl lg:text-[46px] font-black text-[#06408c] tracking-tight leading-none transition-colors duration-400 group-hover:!text-accent-red">
          {number}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 leading-snug transition-colors duration-400 group-hover:!text-white">
          {title}
        </h3>
      </div>

      {/* Content: Description */}
      <div className="relative z-10 mt-3">
        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed transition-colors duration-400 group-hover:!text-slate-200">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AboutBentoStats() {
  return (
    <section className="bg-[#eae5df] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Left (2 cards + 1 wide card) & Right (Tall Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Left Column: 2 Cards + 1 Wide Card (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 justify-between">
            {/* Top 2 Cards Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <BentoCard
                number="300+"
                title="Standardized Dye Formulations"
                description="Precision-calibrated shade solutions engineered for high color yield, fastness, and consistency."
              />

              <BentoCard
                number="25+"
                title="Years of Chemical Mastery"
                description="Two generations of manufacturing expertise delivering trusted color performance since 1998."
              />
            </div>

            {/* Bottom Wide Card */}
            <BentoCard
              number="50.4M+"
              title="Meters of Fabric Dyed Annually"
              description="Across apparel, home furnishings, denim, and technical textiles colored with our reactive and direct dyes."
            />
          </div>

          {/* Right Column: Tall Photo Card (Col 8-12) */}
          <div className="lg:col-span-5 h-full min-h-[340px] sm:min-h-[400px] lg:min-h-full">
            <div className="group relative h-full w-full rounded-md sm:rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-black/[0.03] cursor-pointer">
              <img
                src={bentoImg}
                alt="Ambica Industry Production Facility & Dye Vats"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01142b]/85 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-accent-red text-xs font-bold uppercase tracking-widest block mb-1">
                  Global Manufacturing
                </span>
                <p className="text-sm font-semibold text-white/90">
                  Industrial dye batch processing &amp; color standardization
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Cards Side-by-Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <BentoCard
            number="40+"
            title="Countries Exported"
            description="Reliable supply network supporting global textile mills, paper manufacturers, and chemical distributors."
          />

          <BentoCard
            number="23"
            title="Application Sectors Served"
            description="From organic cotton and paper pulp to automotive textiles, leather goods, and specialized inks."
          />

          <BentoCard
            number="80%"
            title="Clients Reordering Regularly"
            description="Built on dependable shade consistency, punctual dispatch, and hands-on technical color matching."
          />
        </div>
      </div>
    </section>
  );
}
