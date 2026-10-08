import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../../../assets/images/hero/close-up-row-paint-cans-with-different-colors.webp";
import img2 from "../../../assets/images/hero/close-up-white-paper.webp";
import img3 from "../../../assets/images/hero/closeup-colorful-paint-cans-conveyor-belt.webp";
import img4 from "../../../assets/images/hero/colorful-curtain-is-hanging-room-with-other-colors.webp";
import img5 from "../../../assets/images/hero/colorful-yarn-bins-textile-factory.webp";
import img6 from "../../../assets/images/hero/dyeing-fabrics-colorful-vats.webp";
import img7 from "../../../assets/images/hero/dyeing-textiles-factory-colorful-process.webp";
import img8 from "../../../assets/images/hero/full-frame-shot-multi-colored-paper.webp";
import img9 from "../../../assets/images/hero/generative-ai-huge-paper-rolls-placed-warehouse-waiting-use.webp";
import img10 from "../../../assets/images/hero/industrial-paint-mixing-process-with-colorful-paint-buckets.webp";
import img11 from "../../../assets/images/hero/rows-colorful-dye-vats-industrial-factory.webp";
import img12 from "../../../assets/images/hero/top-view-different-kind-chips-texture-horizontal.webp";
import img13 from "../../../assets/images/hero/vibrant-dyeing-bleaching-linen-fabric-factory (1).webp";
import img14 from "../../../assets/images/hero/vibrant-dyeing-bleaching-linen-fabric-factory.webp";
import img15 from "../../../assets/images/hero/vibrant-silk-textiles-colorful-heap-generated-by-ai.webp";

const images = [
  img2, img3, img4, img1, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0, 1]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload next image before transition
  const preloadImage = useCallback((idx: number) => {
    if (loadedImages.has(idx)) return;
    const img = new Image();
    img.src = images[idx];
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(idx));
    };
  }, [loadedImages]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        // Preload the image after next for smooth transition
        const afterNext = (next + 1) % images.length;
        preloadImage(afterNext);
        return next;
      });
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [preloadImage]);

  // Preload first 3 images on mount
  useEffect(() => {
    [0, 1, 2].forEach(i => preloadImage(i));
  }, [preloadImage]);

  return (
    <section id="hero-banner" className="relative w-full bg-slate-900 overflow-hidden">
      <div className="relative h-[48vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh] w-full">
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: 'opacity' }}
            alt="Ambica Industry Hero"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </AnimatePresence>
        
        {/* Dark overlay to ensure text/nav visibility if it overlaps */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-slate-900/40 pointer-events-none" />
      </div>
    </section>
  );
}
